<template>
  <div
      id="PFrame"
      :class="className"
      :data-polaris-layer="true"
      :data-has-navigation="(this.$slots.hasOwnProperty('navigation') || Object.keys(navigation).length > 0) ?
          true : {}"
  >
    <div :class="skipClassName">
      <a
          ref="skipToContentTarget"
          href="javascript.void(0)"
          @focus="this.handleFocus"
          @blur="this.handleBlur"
          @click="this.handleClick"
      >
        Skip to content
      </a>
    </div>
    <div
        v-if="this.$slots.hasOwnProperty('topBar') || Object.keys(topBar).length > 0"
        class="Polaris-Frame__TopBar"
        :data-polaris-layer="true"
        :data-polaris-top-bar="true"
        :id="APP_FRAME_TOP_BAR"
    >
      <slot name="topBar">
        <PTopBar
            v-bind="topBar"
        />
      </slot>
    </div>
    <div
        v-if="$slots.hasOwnProperty('navigation') || Object.keys(navigation).length > 0"
    >
      <transition
          enter-class="Polaris-Frame__Navigation--enter"
          enter-active-class="Polaris-Frame__Navigation--enterActive"
          enter-to-class="Polaris-Frame__Navigation--enterActive"
          leave-class="Polaris-Frame__Navigation--exit"
          leave-active-class="Polaris-Frame__Navigation--exitActive"
          @enter="enter"
      >
        <div
            ref="navigationNode"
            v-show="showMobileNavigation || !toggleMobileNavigation"
            :class="`Polaris-Frame__Navigation ${showMobileNavigation ? navClassName: ''}`"
            :aria-modal="ariaModal"
            :role="role"
            aria-label="Navigation"
            @keydown="handleNavKeydown"
            :id="APP_FRAME_NAV"
            key="NavContent"
            :hidden="mobileNavHidden"
        >
          <slot name="navigation">
            <PNavigation
                v-bind="navigation"
            />
          </slot>
          <button
              v-if="showMobileNavigation"
              type="button"
              class="Polaris-Frame__NavigationDismiss"
              @click="handleNavigationDismiss"
              :aria-hidden="mobileNavHidden || (!useMediaQuery && !toggleMobileNavigation)"
              aria-label="Close navigation"
              :tabindex="mobileNavShowing ? 0 : -1"
          >
            <PIcon source="MobileCancelMajor"/>
          </button>
        </div>
      </transition>
    </div>
    <div
        :class="contextualSaveBarClassName"
    >
      <PContextualSaveBar
          v-if="contextualSaveBar.active"
          :alignContentFlush="contextualSaveBar.alignContentFlush"
          :message="contextualSaveBar.message"
          :saveAction="contextualSaveBar.saveAction"
          :discardAction="contextualSaveBar.discardAction"
          :fullWidth="contextualSaveBar.fullWidth"
          :logo="logo"
      >
        <template slot="contextControl">
          <slot name="contextControl"/>
        </template>
      </PContextualSaveBar>
    </div>
    <PBackdrop
        v-if="showMobileNavigation && useMediaQuery()"
        belowNavigation
        @click="this.handleNavigationDismiss"
        @touchStart="this.handleNavigationDismiss"
    />
    <main
        class="Polaris-Frame__Main"
        :id="APP_FRAME_MAIN"
        :data-has-global-ribbon="Boolean($slots.hasOwnProperty('globalRibbon'))"
    >
      <div
          class="Polaris-Frame__Content"
      >
        <slot/>
      </div>
    </main>
    <div
        v-if="$slots.hasOwnProperty('globalRibbon')"
        class="Polaris-Frame__GlobalRibbonContainer"
        :ref="this.setGlobalRibbonContainer"
    >
      <slot name="globalRibbon"/>
    </div>
    <PEventListener event="resize" :handler="this.handleResize"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { ContextualSaveBarProps, ToastProps } from '../../context';
import { ThemeLogo } from '@/types/logo';
import { PContextualSaveBar } from '@/components/PFrame/components/PContextualSaveBar';
import { PEventListener } from './../../../../components/PEventListener/index.js';
import { PIcon } from './../../../../components/PIcon/index.js';
import { PBackdrop } from './../../../../components/PBackdrop/index.js';
import { PTopBar } from '@/components/PTopBar';
import { PNavigation } from '@/components/PNavigation';

interface State {
  skipFocused?: boolean;
  globalRibbonHeight: number;
  loadingStack: number;
  toastMessages: ToastProps[];
  showContextualSaveBar: boolean;
}

@Component({
  components: {
    PContextualSaveBar, PEventListener, PIcon, PBackdrop, PTopBar, PNavigation,
  },
})
export default class PFrameInner extends Vue {
  @Prop({type: Boolean, default: false}) public showMobileNavigation!: boolean;

  @Prop({type: Function}) public onNavigationDismiss!: any;

  @Prop({type: Object, default: () => ({})}) public contextualSaveBar!: ContextualSaveBarProps;

  @Prop({type: Boolean, default: false}) public toggleContextualSaveBar!: boolean;

  /**
   * ContextualSaveBar Logo
   */
  @Prop({type: Object, default: () => ({})}) public logo!: ThemeLogo;

  /**
   * TopBar props
   */
  @Prop({type: Object, default: () => ({})}) public topBar!: object;

  /**
   * Navigation props
   */
  @Prop({type: Object, default: () => ({})}) public navigation!: object;

  /**
   * Frame offset value
   */
  @Prop({type: String, default: '0px'}) public frameOffset!: string;

  public APP_FRAME_MAIN = 'AppFrameMain';
  public APP_FRAME_NAV = 'AppFrameNav';
  public APP_FRAME_TOP_BAR = 'AppFrameTopBar';

  public toggleMobileNavigation = this.showMobileNavigation;
  public mobileNavHidden = this.useMediaQuery() && !this.toggleMobileNavigation;
  public mobileNavShowing = this.useMediaQuery() && this.toggleMobileNavigation;

  public state: State = {
    skipFocused: false,
    globalRibbonHeight: 0,
    loadingStack: 0,
    toastMessages: [],
    showContextualSaveBar: false,
  };

  private globalRibbonContainer: HTMLDivElement | null = null;
  @Ref() private navigationNode!: HTMLDivElement;

  public mounted() {
    document.getElementById('PFrame')!.style.setProperty('--p-frame-offset', this.frameOffset);
    this.handleResize();
    if (this.$slots.hasOwnProperty('globalRibbon')) {
      return;
    }
    this.setGlobalRibbonRootProperty();
  }

  public updated() {
    this.setGlobalRibbonHeight();
  }

  public created() {
    window.addEventListener('resize', this.useMediaQuery);
    this.useMediaQuery();
  }

  public destroyed() {
    window.removeEventListener('resize', this.useMediaQuery);
  }

  public get className() {
    return classNames(
        'Polaris-Frame',
        (this.$slots.hasOwnProperty('navigation') || Object.keys(this.navigation).length > 0)
        && 'Polaris-Frame--hasNav',
        (this.$slots.hasOwnProperty('topBar') || Object.keys(this.topBar).length > 0) && 'Polaris-Frame--hasTopBar',
    );
  }

  public get contextualSaveBarClassName() {
    return classNames(
        'Polaris-Frame__ContextualSaveBar Polaris-Frame-CSSAnimation--startFade',
        this.contextualSaveBar.active && ' Polaris-Frame-CSSAnimation--endFade',
    );
  }

  public get skipClassName() {
    return classNames(
        'Polaris-Frame__Skip',
        this.state.skipFocused && 'Polaris-Frame--focused',
    );
  }

  public get navClassName() {
    return classNames(
        this.toggleMobileNavigation && 'Polaris-Frame__Navigation--visible',
    );
  }

  public get ariaModal() {
    if (this.toggleMobileNavigation) {
      return true;
    }
  }

  public get role() {
    if (this.toggleMobileNavigation) {
      return 'dialog';
    }
  }

  public setGlobalRibbonContainer = (node: HTMLDivElement) => {
    this.globalRibbonContainer = node;
  }

  public handleResize() {
    if (this.$slots.hasOwnProperty('globalRibbon')) {
      this.setGlobalRibbonHeight();
    }
  }

  public setGlobalRibbonRootProperty() {
    const {globalRibbonHeight} = this.state;
    this.setRootProperty(
        '--global-ribbon-height',
        `${globalRibbonHeight}px`,
        null,
    );
  }

  public setGlobalRibbonHeight() {
    const {globalRibbonContainer} = this;
    if (globalRibbonContainer) {
      this.state.globalRibbonHeight = globalRibbonContainer.offsetHeight;
      this.setGlobalRibbonRootProperty();
    }
  }

  public setRootProperty(
      name: string,
      value: string,
      node: Element | null,
  ) {
    if (document == null) {
      return;
    }

    const styleNode = node && node instanceof HTMLElement ? node : document.documentElement;
    /* tslint:disable-next-line */
    styleNode && styleNode.style.setProperty(name, value);
  }

  public useMediaQuery() {
    if (window.innerWidth <= 768) {
      this.toggleMobileNavigation = true;
      return true;
    }
    this.toggleMobileNavigation = false;
    return false;
  }

  public handleNavKeydown(event: KeyboardEvent) {
    const {key} = event;
    const mobileNavShowing = this.useMediaQuery() && this.toggleMobileNavigation;
    if (mobileNavShowing && key === 'Escape') {
      this.handleNavigationDismiss();
    }
  }

  public handleNavigationDismiss() {
    if (this.onNavigationDismiss) {
      return this.onNavigationDismiss();
    }
  }

  public enter(el, done) {
    done();
  }

  private handleFocus() {
    this.state.skipFocused = true;
  }

  private handleBlur() {
    this.state.skipFocused = false;
  }

  private handleClick(event: MouseEvent) {
    if (this.$refs.skipToContentTarget) {
      (this.$refs.skipToContentTarget as HTMLInputElement).focus();
      event.preventDefault();
    }
  }
}
</script>

<style scoped>

</style>
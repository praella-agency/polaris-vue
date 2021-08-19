<template>
  <div
      :class="className"
      :data-polaris-layer="true"
      :data-has-navigation="this.$slots.hasOwnProperty('navigation') ? true : {}"
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
        v-if="this.$slots.hasOwnProperty('topBar')"
        class="Polaris-Frame__TopBar"
        :data-polaris-layer="true"
        :data-polaris-top-bar="true"
        :id="APP_FRAME_TOP_BAR"
    >
      <slot name="topBar"/>
    </div>
    <div v-if="$slots.hasOwnProperty('navigation')">
      <transition
          ref="navigationNode"
          :appear="useMediaQuery()"
          :exit="!useMediaQuery()"
          :in="toggleMobileNavigation"
          timeout="300"
          appear-class="Polaris-Frame__Navigation--enter"
          appear-active-class="Polaris-Frame__Navigation--enterActive"
          appear-to-class="Polaris-Frame__Navigation--enterActive"
          leave-active-class="Polaris-Frame__Navigation--exitActive"
      >
        <div
            :aria-modal="ariaModal"
            :role="role"
            aria-label="Navigation"
            ref="navigationMode"
            :class="navClassName"
            @keydown="handleNavKeydown"
            :id="APP_FRAME_NAV"
            key="NavContent"
            :hidden="!mobileNavHidden"
        >
          <slot name="navigation"/>
          <button
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
      >
        <template slot="contextControl">
          <slot name="contextControl"/>
        </template>
      </PContextualSaveBar>
    </div>
    <div
        v-if="state.loadingStack > 0"
        class="Polaris-Frame__LoadingBar"
        :id="APP_FRAME_LOADING_BAR"
    >
      <PLoading/>
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
  import { ContextualSaveBarProps, ToastProps } from '../context';
  import { classNames } from '@/utilities/css';
  import { PTrapFocus } from '@/components/PTrapFocus';
  import PContextualSaveBar from '@/components/PFrame/components/PContextualSaveBar.vue';
  import { PLoading } from '@/components/PLoading';
  import { PEventListener } from '@/components/PEventListener';
  import { PIcon } from '@/components/PIcon';
  import { PBackdrop } from '@/components/PBackdrop';

  interface ContextualSaveBarAction {
    /** A destination to link to */
    url?: string;
    /** Content the action displays */
    content?: string;
    /** Should a spinner be displayed */
    loading?: boolean;
    /** Should the action be disabled */
    disabled?: boolean;

    /** Callback when an action takes place */
    onAction?(): void;
  }

  interface ContextualSaveBarDiscardActionProps {
    /** Whether to show a modal confirming the discard action */
    discardConfirmationModal?: boolean;
  }

  type ContextualSaveBarCombinedActionProps = ContextualSaveBarDiscardActionProps &
    ContextualSaveBarAction;

  interface State {
    skipFocused?: boolean;
    globalRibbonHeight: number;
    loadingStack: number;
    toastMessages: ToastProps[];
    showContextualSaveBar: boolean;
  }

  @Component({
    components: {
      PTrapFocus, PContextualSaveBar, PLoading, PEventListener, PIcon, PBackdrop,
    }
  })
  export default class PFrameInner extends Vue {
    @Prop({type: Boolean, default: false}) showMobileNavigation!: boolean;

    @Prop({type: Function}) public onNavigationDismiss!: any;

    @Prop({type: Object, default: () => ({})}) public contextualSaveBar!: ContextualSaveBarProps;

    @Prop({type: Boolean, default: false}) public toggleContextualSaveBar!: boolean;

    public APP_FRAME_MAIN = 'AppFrameMain';
    public APP_FRAME_NAV = 'AppFrameNav';
    public APP_FRAME_TOP_BAR = 'AppFrameTopBar';
    public APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

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
        this.$slots.hasOwnProperty('navigation') && 'Polaris-Frame--hasNav',
        this.$slots.hasOwnProperty('topBar') && 'Polaris-Frame--hasTopBar',
      );
    }

    public get contextualSaveBarClassName() {
      return classNames(
        'Polaris-Frame__ContextualSaveBar Polaris-Frame-CSSAnimation--startFade',
        this.contextualSaveBar.active && ' Polaris-Frame-CSSAnimation--endFade',
      )
    }

    public get skipClassName() {
      return classNames(
        'Polaris-Frame__Skip',
        this.state.skipFocused && 'Polaris-Frame--focused'
      );
    }

    public get navClassName() {
      return classNames(
        'Polaris-Frame__Navigation',
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
    };

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
        null
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
      styleNode && styleNode.style.setProperty(name, value);
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
      if (!this.onNavigationDismiss) {
        this.onNavigationDismiss();
      }
    }
  }
</script>

<style scoped>

</style>
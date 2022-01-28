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

<script>
import { classNames } from '../../../../utilities/css';
import { ToastProps } from '../../context';
import { PContextualSaveBar } from '../../../../components/PFrame/components/PContextualSaveBar';
import { PEventListener } from '../../../../components/PEventListener';
import { PIcon } from '../../../../components/PIcon';
import { PBackdrop } from '../../../../components/PBackdrop';
import { PTopBar } from '../../../../components/PTopBar/';
import { PNavigation } from '../../../../components/PNavigation';

const State = {
  skipFocused: Boolean, //not required
  globalRibbonHeight: Number,
  loadingStack: Number,
  toastMessages: [ToastProps],
  showContextualSaveBar: Boolean,
}

export default {
    name: 'PFrameInner',
    components: {
        PContextualSaveBar, PEventListener, PIcon, PBackdrop, PTopBar, PNavigation,
    },
    props: {
        showMobileNavigation: {
            type: Boolean,
            default: false,
        },
        onNavigationDismiss: {
            type: Function,
        },
        contextualSaveBar: {
            type: Object,
            default: () => ({}),
        },
        toggleContextualSaveBar: {
            type: Boolean,
            default: false,
        },
        /**
         * ContextualSaveBar Logo
         */
        logo: {
            type: Object,
            default: () => ({}),
        },
        /**
         * TopBar props
         */
        topBar: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Navigation props
         */
        navigation: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Frame offset value
         */
        frameOffset: {
            type: String,
            default: '0px',
        },
        /**
         * Set the frame position with it's internal components
         */
        positioning: {
          type: String,
          default: 'fixed',
        },
    },
    data() {
        return {
            APP_FRAME_MAIN: 'AppFrameMain',
            APP_FRAME_NAV: 'AppFrameNav',
            APP_FRAME_TOP_BAR: 'AppFrameTopBar',
            toggleMobileNavigation: this.showMobileNavigation,
            mobileNavHidden: this.useMediaQuery() && !this.toggleMobileNavigation,
            mobileNavShowing: this.useMediaQuery() && this.toggleMobileNavigation,
            state: {
                skipFocused: false,
                globalRibbonHeight: 0,
                loadingStack: 0,
                toastMessages: [],
                showContextualSaveBar: false,
            },
            globalRibbonContainer: HTMLDivElement,
        };
    },
    computed: {
        className() {
            return classNames(
                'Polaris-Frame',
                (this.$slots.hasOwnProperty('navigation') || Object.keys(this.navigation).length > 0)
                && 'Polaris-Frame--hasNav',
                (this.$slots.hasOwnProperty('topBar') || Object.keys(this.topBar).length > 0) && 'Polaris-Frame--hasTopBar',
            );
        },
        contextualSaveBarClassName() {
            return classNames(
                'Polaris-Frame__ContextualSaveBar Polaris-Frame-CSSAnimation--startFade',
                this.contextualSaveBar.active && ' Polaris-Frame-CSSAnimation--endFade',
            );
        },
        skipClassName() {
            return classNames(
                'Polaris-Frame__Skip',
                this.state.skipFocused && 'Polaris-Frame--focused',
            );
        },
        navClassName() {
            return classNames(
                this.toggleMobileNavigation && 'Polaris-Frame__Navigation--visible',
            );
        },
        ariaModal() {
            if (this.toggleMobileNavigation) {
                return true;
            }
        },
        role() {
            if (this.toggleMobileNavigation) {
                return 'dialog';
            }
        },
    },
    methods: {
        setGlobalRibbonContainer(node) {
            this.globalRibbonContainer = node;
        },
        handleResize() {
            if (this.$slots.hasOwnProperty('globalRibbon')) {
                this.setGlobalRibbonHeight();
            }
        },
        setGlobalRibbonRootProperty() {
            const {globalRibbonHeight} = this.state;
            this.setRootProperty(
                '--global-ribbon-height',
                `${globalRibbonHeight}px`,
                null,
            );
        },
        setGlobalRibbonHeight() {
            const {globalRibbonContainer} = this;
            if (globalRibbonContainer) {
                this.state.globalRibbonHeight = globalRibbonContainer.offsetHeight;
                this.setGlobalRibbonRootProperty();
            }
        },
        setRootProperty(name, value, node) {
            if (document == null) {
                return;
            }

            const styleNode = node && node instanceof HTMLElement ? node : document.documentElement;
            /* tslint:disable-next-line */
            styleNode && styleNode.style.setProperty(name, value);
        },
        useMediaQuery() {
            if (window.innerWidth <= 768) {
                this.toggleMobileNavigation = true;
                return true;
            }
            this.toggleMobileNavigation = false;
            return false;
        },
        handleNavKeydown(event) {
            const {key} = event;
            const mobileNavShowing = this.useMediaQuery() && this.toggleMobileNavigation;
            if (mobileNavShowing && key === 'Escape') {
                this.handleNavigationDismiss();
            }
        },
        handleNavigationDismiss() {
            if (this.onNavigationDismiss) {
                return this.onNavigationDismiss();
            }
        },
        handleFocus() {
            this.state.skipFocused = true;
        },
        handleBlur() {
            this.state.skipFocused = false;
        },
        handleClick(event) {
            if (this.$refs.skipToContentTarget) {
                (this.$refs.skipToContentTarget).focus();
                event.preventDefault();
            }
        },
        enter(el, done) {
            done();
        },
    },
    mounted() {
        document.getElementById('PFrame').style.setProperty('--p-frame-offset', this.frameOffset);
        document.getElementById('PFrame').style.setProperty('--frame-position', this.positioning);
        this.handleResize();
        if (this.$slots.hasOwnProperty('globalRibbon')) {
            return;
        }
        this.setGlobalRibbonRootProperty();
    },
    created() {
        window.addEventListener('resize', this.useMediaQuery);
        this.useMediaQuery();
    },
    updated() {
        this.setGlobalRibbonHeight();
    },
    destroyed() {
        window.removeEventListener('resize', this.useMediaQuery);
    },
}
</script>

<style scoped>

</style>
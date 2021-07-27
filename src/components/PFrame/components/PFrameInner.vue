<template>
  <div
      class="Polaris-Frame"
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
      <slot name="topBar" />
    </div>

  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
  import { ContextualSaveBarProps, ToastProps } from '../context';
  import { classNames } from '@/utilities/css';

  interface State {
    skipFocused?: boolean;
    globalRibbonHeight: number;
    loadingStack: number;
    toastMessages: ToastProps[];
    showContextualSaveBar: boolean;
  }

  @Component({
    components: {}
  })
  export default class PFrameInner extends Vue {
    @Prop({type: Boolean, default: false}) showMobileNavigation!: boolean;

    public APP_FRAME_MAIN = 'AppFrameMain';
    public APP_FRAME_NAV = 'AppFrameNav';
    public APP_FRAME_TOP_BAR = 'AppFrameTopBar';
    public APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

    public state: State = {
      skipFocused: false,
      globalRibbonHeight: 0,
      loadingStack: 0,
      toastMessages: [],
      showContextualSaveBar: false,
    };

    private contextualSaveBar: ContextualSaveBarProps | null = null;
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

    public get skipClassName() {
      return classNames(
        'Polaris-Frame__Skip',
        this.state.skipFocused && 'Polaris-Frame--focused'
      );
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
  }
</script>

<style scoped>

</style>
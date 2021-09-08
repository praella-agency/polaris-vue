<template>
  <div ref="container">
    <!-- @slot Filter Activator content -->
    <slot name="activator" :activate="onActivate"/>

    <PTooltipOverlay
        :id="realId+'Overlay'"
        :active="toggleActive"
        :activatorId="activatorId"
        :preferredPosition="preferredPosition"
        :preferredAlignment="preferredAlignment"
        :fullWidth="fullWidth"
    >
      <template v-slot:overlay="props">
        <div :class="className" :ref="`content-${activatorRectId}`">
          <div v-if="!props.data.measuring"
               :style="{ left: props.data.tipPosition+'px' }"
               class="Polaris-Popover__Tip">
          </div>
          <div class="Polaris-Popover__Content">
            <div class="Polaris-Popover__Pane Polaris-Scrollable Polaris-Scrollable--vertical
                          Polaris-Scrollable--hasBottomShadow Polaris-Scrollable--verticalHasScrolling"
                 data-polaris-scrollable="true">
              <div class="Polaris-Tooltip-TooltipOverlay">
                <div class="Polaris-Tooltip-TooltipOverlay__Content" style="min-height: 28px;">
                  <slot name="tooltipContent"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </PTooltipOverlay>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
  import PTooltipOverlay from './components/PTooltipOverlay.vue';
  import { classNames } from '@/utilities/css';

  @Component({
    components: {
      PTooltipOverlay,
    }
  })
  export default class PTooltip extends Vue {
    /**
     * Id for the PPopover.
     */
    @Prop({
      type: String,
      default: `PolarisPopover${new Date().getUTCMilliseconds()}${Math.floor(Math.random() * 1000)}`,
      required: true,
    }) public id!: string;

    /**
     * Show or hide the PPopover.
     * @values true | false
     */
    @Prop({type: Boolean, required: true}) public active!: boolean;

    /**
     * Preferred Position.
     * @values below | above | mostSpace
     */
    @Prop({type: String, default: 'above'}) public preferredPosition!: string;

    /**
     * Preferred Alignment
     * @values center | left | right
     */
    @Prop({type: String, default: 'center'}) public preferredAlignment!: string;

    /**
     * The element type to wrap the activator with.
     */
    @Prop({type: String, default: null}) public activatorWrapper!: string;

    /**
     * Prevent auto focus on the activator
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public preventAutofocus!: boolean;

    /**
     * Automatically add wrap content in section.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public sectioned!: boolean;

    /**
     * Allow PPopover to stretch to the full width of its activator.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

    /**
     * Enable measure
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public measuring!: boolean;

    /**
     * Enable positioning
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public positioning!: boolean;

    public get activatorRectId() {
      return this.id.replace(/_/g, '');
    }

    public get realId() {
      return 'PolarisPopover' + this.activatorRectId;
    }

    public get activatorId() {
      return this.realId + 'Activator';
    }

    @Ref('container') public readonly container!: HTMLElement;

    public isAppended: boolean = false;
    public toggleActive = this.active;

    @Watch('active')
    public onValueChanged(value) {
      if (value) {
        const popoverOverlay = document.getElementById(this.realId + 'Overlay') as HTMLElement;
        if (popoverOverlay) {
          const rootElement = document.body as HTMLElement;
          rootElement.append(popoverOverlay);
        }
      } else {
        const popoverOverlay = document.getElementById(this.realId + 'Overlay') as HTMLElement;
        if (popoverOverlay) {
          const rootElement = this.$refs.container as HTMLElement;
          rootElement.append(popoverOverlay);
        }
      }
    }

    public get className() {
      return classNames(
        'Polaris-Popover',
        this.fullWidth && 'Polaris-Popover--fullWidth',
        this.measuring && 'Polaris-Popover--measuring',
      );
    }

    public get findActivator() {
      return document.getElementById(this.activatorId);
    }

    public mounted() {
      if (this.container.firstElementChild !== null) {
        this.container.firstElementChild.id = this.activatorId;
      }

      window.addEventListener('click', this.handlePageClick);
      window.addEventListener('touchstart', this.handlePageClick);
    }

    public beforeDestroy() {
      if (this.isAppended) {
        const popoverOverlay = document.getElementById(this.realId + 'Overlay') as HTMLElement;
        if (popoverOverlay) {
          popoverOverlay.remove();
        }
      }
    }

    public destroyed() {
      window.removeEventListener('click', this.handlePageClick);
      window.removeEventListener('touchstart', this.handlePageClick);
    }

    public handlePageClick(e) {
      const target = e.target;
      const contentNode = this.$refs['content-' + this.activatorRectId];
      if ((contentNode != null && this.nodeContainsDescendant(contentNode, target)) ||
        this.nodeContainsDescendant(this.findActivator, target) || !this.toggleActive) {
        return;
      }
      /**
       * Close filter menu when page is clicked
       * @property {Event} click
       */
      this.$emit('close', 'Click');
    }

    public nodeContainsDescendant(haystack, needle) {
      if (haystack === needle) {
        return true;
      }
      let parent = needle.parentNode;
      while (parent != null) {
        if (parent === haystack) {
          return true;
        }
        parent = parent.parentNode;
      }
      return false;
    }

    public onActivate() {
      /**
       * Activate method
       */
      this.$emit('activate');
    }
  }
</script>

<style scoped>

</style>
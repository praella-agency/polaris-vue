<template>
    <PPositionedOverlay
        :active="active"
        :activator="activator"
        :preferredPosition="preferredPosition"
        :preventInteraction="preventInteraction"
    >
        <div className="containerClassName...layer.props">
            <div
                    :id="id"
                    role="tooltip"
                    className="{styles.Content}"
                    style="contentStyles: 0"
                    :aria-label="accessibilityLabel ? accessibilityLabel : undefined"
            >
                <slot />
            </div>
        </div>
    </PPositionedOverlay>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import {classNames} from '@/utilities/css';

  import PPositionedOverlay from '@/components/PPopover/components/PPositionedOverlay.vue';

  type PreferredPosition = 'above' | 'below' | 'mostSpace';
  type Positioning = 'above' | 'below';

  interface OverlayDetails {
    left?: number;
    right?: number;
    desiredHeight: number;
    positioning: Positioning;
    measuring: boolean;
    // activatorRect: Rect;
  }

  @Component({
    components: {
      PPositionedOverlay,
    },
  })
  export default class PTooltipOverlay extends Vue {

    @Prop({type: String, default: null}) public id!: string;

    @Prop({type: Boolean, default: false}) public active!: boolean;

    @Prop({type: Boolean, default: false}) public preventInteraction!: boolean;

    @Prop({type: String, default: 'below'}) public preferredPosition!: PreferredPosition;

    @Prop() public activator!: any;

    @Prop({type: String, default: null}) public accessibilityLabel!: string;

    @Prop({type: Function}) public onClose!: void;

    // const containerClassName = classNames(
    //   styles.TooltipOverlay,
    //   measuring && styles.measuring,
    //   positioning === 'above' && styles.positionedAbove,
    // );

    public className() {
      const overlayDetails = OverlayDetails;
      return classNames('Polaris-Tooltip',

      )
    }

  }
</script>

<style scoped>

</style>
<template>
  <div>
    <div
        ref="node"
        v-if="visible"
        :class="searchDismissOverlayClass"
        @click="handleDismiss"
    />
    <div :class="className">
      <div class="Polaris-TopBar-Search__SearchContent">
        <div class="Polaris-TopBar-Search__Results">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

@Component({
  components: {},
})
export default class PSearch extends Vue {

  @Prop({type: Boolean, default: false}) public visible!: boolean;
  @Prop({type: Boolean, default: false}) public overlayVisible!: boolean;
  @Prop({type: Function}) public onDismiss!: void;

  public get className() {
    return classNames(
        'Polaris-TopBar-Search',
        this.visible && 'Polaris-TopBar-Search--visible'
    );
  }

  public get searchDismissOverlayClass() {
    return classNames(
      'Polaris-TopBar-SearchDismissOverlay',
      this.overlayVisible && 'Polaris-TopBar-SearchDismissOverlay--visible',
    );
  }

  public handleDismiss(event) {
    if(event === (this.$refs.node as HTMLDivElement) && this.onDismiss) {
      return this.onDismiss;
    }
  }
}
</script>

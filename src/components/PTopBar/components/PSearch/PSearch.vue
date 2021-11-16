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
  import { classNames } from '@/utilities/css';

  @Component
  export default class PSearch extends Vue {

    @Prop({type: Boolean, default: false}) public visible!: boolean;
    @Prop({type: Boolean, default: false}) public overlayVisible!: boolean;

    public get className() {
      return classNames(
        'Polaris-TopBar-Search',
        this.visible && 'Polaris-TopBar-Search--visible',
      );
    }

    public get searchDismissOverlayClass() {
      return classNames(
        'Polaris-TopBar-SearchDismissOverlay',
        this.overlayVisible && 'Polaris-TopBar-SearchDismissOverlay--visible',
      );
    }

    public handleDismiss() {
        this.$emit('dismiss');
    }
  }
</script>

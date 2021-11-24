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

<script>
  import { classNames } from '../../../../utilities/css';

  export default {
      name: 'PSearch',
      props: {
          visible: {
              type: Boolean,
              default: false,
          },
          overlayVisible: {
              type: Boolean,
              default: false,
          },
      },
      computed: {
          className() {
              return classNames(
                  'Polaris-TopBar-Search',
                  this.visible && 'Polaris-TopBar-Search--visible',
              );
          },
          searchDismissOverlayClass() {
              return classNames(
                  'Polaris-TopBar-SearchDismissOverlay',
                  this.overlayVisible && 'Polaris-TopBar-SearchDismissOverlay--visible',
              );
          },
      },
      methods: {
          handleDismiss() {
              this.$emit('dismiss');
          },
      },
  }
</script>

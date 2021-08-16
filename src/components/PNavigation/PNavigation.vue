<template>
  <nav class="Polaris-Navigation" :aria-labelledby="ariaLabelledBy">
    <template v-if="$slots.hasOwnProperty('contextControl')">
      <div class="Polaris-Navigation__ContextControl">
        <slot name="contextControl"/>
      </div>
    </template>
    <template v-else>
      <div class="Polaris-Navigation__LogoContainer">
        <PUnstyledLink
            class="Polaris-Navigation__LogoLink"
            :url="logo.url"
            :style="width"
        >
          <PImage
              class="Polaris-Navigation__Logo"
              :source="logo.topBarSource"
              :alt="logo.accessibilityLabel"
              :style="width"
          />
        </PUnstyledLink>
      </div>
    </template>
    <div class="Polaris-Navigation__PrimaryNavigation">
      <slot />
    </div>
  </nav>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PUnstyledLink } from '../PUnstyledLink';
  import { PImage } from '../PImage';
  import { getWidth, ThemeLogo } from '@/types/logo';

  @Component({
    components: {
      PUnstyledLink, PImage,
    },
  })
  export default class PNavigation extends Vue {
    @Prop({type: String, default: null}) public location!: string;

    @Prop({type: Function}) public onDismiss!: void;

    /**
     * id of the element used as aria-labelledby
     */
    @Prop({type: String}) public ariaLabelledBy!: string;

    /**
     * Customize logo
     */
    @Prop({type: Object, default: () => ({})}) public logo!: ThemeLogo;

    public context = {
      location: this.location,
      onNavigationDismiss: this.onDismiss,
    };

    public get width() {
      return {
        width: getWidth(this.logo, 104)
      };
    }
  }
</script>

<style scoped>

</style>
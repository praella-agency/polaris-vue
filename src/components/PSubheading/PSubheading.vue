<template>
  <component :is="element" :class="className">
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

@Component
export default class PSubheading extends Vue {
  /**
   * Element for heading - Can be 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
   */
  @Prop({ type: String, default: 'h3' }) public element!: HeadingTagName;

  public get className() {
    return 'Polaris-Subheading';
  }
}
</script>

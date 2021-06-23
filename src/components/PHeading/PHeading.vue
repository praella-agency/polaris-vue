<template>
  <component :is="element" class="Polaris-Heading">
    <!-- @slot Heading content -->
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

@Component
export default class PHeading extends Vue {

  /**
   * The element name to use for the heading
   * @values h1, h2, h3, h4, h5, h6, p
   */
  @Prop({ type: String, default: 'h2' }) public element!: HeadingTagName;
}
</script>

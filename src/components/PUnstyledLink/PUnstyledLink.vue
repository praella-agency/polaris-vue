<template>
  <component
      :is="(to ? 'router-link' : 'a')" :href="url" :to="to" :target="target" :rel="rel" v-bind="$attrs"
      v-on="$listeners">
    <!-- @slot Field prefix -->
    <slot/>
  </component>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class PUnstyledLink extends Vue {
  /**
   * Set to for router link
   * @values Internal route link
   */
  @Prop(String) public to!: string;
  /**
   * Set url for URL
   * @values Any exterenal URL
   */
  @Prop(String) public url!: string;
  /**
   * Set true for open URL in new tab
   * @values true | false
   */
  @Prop(Boolean) public external!: boolean;

  public get target() {
    return this.external ? '_blank' : undefined;
  }

  public get rel() {
    return this.external ? 'noopener noreferrer' : undefined;
  }
}
</script>

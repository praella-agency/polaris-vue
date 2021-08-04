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
  @Prop({type: [String, Object], default: null}) public to!: string | object;
  /**
   * Set url for URL
   * @values Any external URL
   */
  @Prop({type: String, default: null}) public url!: string;
  /**
   * Set true for open URL in new tab
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public external!: boolean;

  public get target() {
    return this.external ? '_blank' : undefined;
  }

  public get rel() {
    return this.external ? 'noopener noreferrer' : undefined;
  }
}
</script>

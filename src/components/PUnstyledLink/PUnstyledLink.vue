<template>
  <component
      :is="(to ? 'router-link' : 'a')" :href="url" :to="to" :target="target" :rel="rel" v-bind="$attrs"
      v-on="$listeners">
    <slot/>
  </component>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class PUnstyledLink extends Vue {

  @Prop(String) public to!: string;
  @Prop(String) public url!: string;
  @Prop(Boolean) public external!: boolean;

  public get target() {
    return this.external ? '_blank' : undefined;
  }

  public get rel() {
    return this.external ? 'noopener noreferrer' : undefined;
  }
}
</script>

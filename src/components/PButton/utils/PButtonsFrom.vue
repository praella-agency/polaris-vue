<template>
  <div>
    <PButton
      v-for="(prop, i) in props" :key="i"
      @click="prop.onAction"
      v-bind="prop.rest">
      {{ prop.content }}
    </PButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ComplexAction } from '@/types';

import PButton from '../PButton.vue';

@Component({
  components: { PButton },
})
export default class PButtonsFrom extends Vue {
  /**
   * Action or Array of actions
   */
  @Prop() public actions!: ComplexAction | ComplexAction[];
  @Prop({ type: Object, default: () => ({}) }) public overrides!: any;

  public get props() {
    const actions: any[] = !Array.isArray(this.actions) ? [this.actions] : [...this.actions];

    return actions.map(({ content, onAction, ...action }: any) => ({
      content,
      onAction: onAction || (() => undefined),
      rest: {...action, ...this.overrides},
    }));
  }
}
</script>

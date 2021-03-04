<template>
  <div class="Polaris-Connected">
    <PConnectedItem
      v-if="$slots.left || left"
      position="Left">
      <slot name="left">{{ left }}</slot>
    </PConnectedItem>

    <PConnectedItem position="Primary">
      <slot v-if="!$slots.children">
        {{ children }}
      </slot>
      <slot name="children"></slot>
    </PConnectedItem>

    <PConnectedItem
      v-if="$slots.right || right"
      position="Right">
      <slot name="right">{{ right }}</slot>
    </PConnectedItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import PConnectedItem from './PConnectedItem.vue';

@Component({
  components: { PConnectedItem },
})
export default class PConnected extends Vue {
  @Prop(String) public left!: string;
  @Prop(String) public right!: string;
  @Prop(String) public children!: string;
}
</script>

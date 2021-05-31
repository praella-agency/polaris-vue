<template>
  <div class="Polaris-SkeletonBodyText__SkeletonBodyTextContainer">
    <div v-for="(line, i) in lines" :key="i" class="Polaris-SkeletonBodyText"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

@Component
export default class PSkeletonBodyText extends Vue {
  /**
   * Number of line of skeleton
   * @values Any number
   */
  @Prop({ type: Number, default: 3 }) public lines!: number;
}
</script>

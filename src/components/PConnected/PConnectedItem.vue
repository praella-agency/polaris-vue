<template>
  <div @blur="focused = false"
       @focus="focused = true"
       :class="className">
    <slot v-if="!$slots.children">{{ children }}</slot>
    <slot name="children"></slot>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';

  type Position = 'Left' | 'Primary' | 'Right';

  @Component
  export default class PConnectedItem extends Vue {
    @Prop(String) public position!: Position;
    @Prop(String) public children!: string;
    @Prop(Boolean) public focused!: boolean;

    public get className() {
      return classNames(
        'Polaris-Connected__Item',
        this.focused && 'Polaris-Connected__Item--focused',
        this.position === 'Primary' && 'Polaris-Connected__Item--primary',
        this.position !== 'Primary' && 'Polaris-Connected__Item--connection',
      );
    }
  }
</script>

<template>
  <div
    :class="className"
    :id="id"
    :tabIndex="-1"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import {classNames} from '@/utilities/css';

  @Component
  export default class PPanel extends Vue {

    @Prop([String, Number]) public id!: string | number;
    @Prop(Boolean) public hidden!: boolean;

    public get className() {
      return classNames(
        'Polaris-Tabs__Panel',
        this.hidden && `Polaris-Tabs__Panel--hidden`,
      );
    }
  }
</script>

<template>
    <td
        :class="cellClassName"
    >
        <slot/>
    </td>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';

  @Component
  export default class PIndexTableCell extends Vue {
    @Prop({type: Boolean, default: false}) public flush!: boolean;
    @Prop({type: Boolean, default: false}) public lastChild!: boolean;

    public get cellClassName() {
      return classNames(
        'Polaris-IndexTable__TableCell',
        this.flush && 'Polaris-IndexTable__TableCell--flush',
        this.lastChild && 'Polaris-IndexTable__TableCell--last-child',
      )
    }
  };
</script>

<style scoped>

</style>
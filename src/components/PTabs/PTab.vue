<template>
  <li :class="tabContainerClassNames">
    <button
      :id="id"
      type="button"
      :tabIndex="tabIndex"
      :class="className"
      @click="$emit('click', id, $event)"
    >
      <span :class="tabTitleClassNames"><slot/></span>
    </button>
  </li>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';

  @Component

  export default class PTab extends Vue {

    @Prop(String) public id!: string;
    @Prop(Boolean) public focused!: boolean;
    @Prop(Boolean) public selected!: boolean;

    public tabIndex: number = -1;
    public mounted() {
      this.tabIndex = this.focused ? 0 : -1;
    }

    public get tabContainerClassNames() {
      return classNames(
        'Polaris-Tabs__TabContainer',
      );
    }

    public get tabTitleClassNames() {
      return classNames(
        'Polaris-Tabs__Title',
      );
    }

    public get className() {
      return classNames(
        'Polaris-Tabs__Tab',
        this.selected && `Polaris-Tabs__Tab--selected`,
      );
    }

    // protected handleClick(id: string) {
    //
    //   this.$emit('click', this.$event, id);
    // }
  }
</script>

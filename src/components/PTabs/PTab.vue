<template>
  <li :class="tabContainerClassNames">
    <button
        v-if="!to && !url"
        :id="id"
        type="button"
        :tabIndex="tabIndex"
        :class="className"
        @click="$emit('click', id, $event)"
    >
      <span :class="tabTitleClassNames"><slot/></span>
    </button>

    <a
      v-else-if="url"
      :id="id"
      :href="url"
      :target="external ? '_blank' : ''"
      :tabIndex="tabIndex"
      :class="className"
      @click="$emit('click', id, $event)"
    >
      <span :class="tabTitleClassNames"><slot/></span>
    </a>

    <router-link v-else :tabIndex="tabIndex" :class="className" :to="to" @click.native="$emit('click', id, $event)">
      <span :class="tabTitleClassNames"><slot/></span>
    </router-link>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

@Component

export default class PTab extends Vue {

  @Prop([String, Number]) public id!: string | number;
  @Prop(Boolean) public focused!: boolean;
  @Prop(Boolean) public selected!: boolean;
  @Prop([String, Object]) public to!: string | object;
  @Prop(String) public url!: string;
  @Prop(Boolean) public external!: boolean;

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

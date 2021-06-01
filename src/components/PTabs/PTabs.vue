<template>
  <div>
    <div :class="wrapperClassName">
      <ul :class="className">
        <PTab v-for="(tab, tabIndex) in tabs"
              :key="tabIndex + '-' + tab.id"
              :id="tab.id"
              :to="tab.to"
              :selected="selected === tabIndex"
              @click="handleTabClick"
        >
          {{tab.content}}
        </PTab>
      </ul>
    </div>
    <PPanel v-if="!navigation" v-for="(tab, tabIndex) in tabs" :key="tab.id" :id="tab.id + '-panel'" :tabID="tab.id" :hidden="!(selected === tabIndex)"><slot v-if="selected === tabIndex"/></PPanel>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

import {TabDescriptor} from './types';

import PTab from './PTab.vue';
import PPanel from './PPanel.vue';

@Component({
  components: {
    PTab,
    PPanel,
  },
})

export default class PTabs extends Vue {

  /**
   * Lists of tabs
   */
  @Prop(Array) public tabs!: TabDescriptor[];
  /**
   * Selected tab ID
   */
  @Prop(Number) public selected!: number;
  /**
   * Set true to enable navigation
   */
  @Prop(Boolean) public navigation!: boolean;

  public get className() {
    return classNames(
        'Polaris-Tabs',
    );
  }

  public get wrapperClassName() {
    return classNames(
        'Polaris-Tabs__Wrapper',
        this.navigation && 'Polaris-Tabs__Navigation',
    );
  }

  protected handleTabClick(id: string, event: object) {

    const tab = this.tabs.find((aTab) => aTab.id === id);
    if (tab === null) {
      return;
    }

    const selectedIndex = this.tabs.indexOf(tab!);

    this.$emit('select', selectedIndex, event);
  }
}
</script>
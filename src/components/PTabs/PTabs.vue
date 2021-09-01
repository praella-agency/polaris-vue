<template>
  <div>
    <div :class="wrapperClassName">
      <ul :class="className">
        <PTab v-for="(tab, tabIndex) in tabs"
              :key="tabIndex + '-' + tab.id"
              :id="tab.id"
              :to="tab.to"
              :url="tab.url"
              :selected="selected === tabIndex"
              :external="tab.external"
              @click="handleTabClick"
        >
          {{tab.content}}
        </PTab>
      </ul>
    </div>
    <PPanel v-if="!navigation" v-for="(tab, tabIndex) in tabs" :key="tab.id" :id="tab.id + '-panel'" :tabID="tab.id" :hidden="!(selected === tabIndex)">
      <!-- @slot Panel content -->
      <slot v-if="selected === tabIndex"/>
    </PPanel>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

import {TabDescriptor} from './types';

import PTab from './PTab.vue';
import PPanel from './PPanel.vue';

/**
* <br/>
* <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
*  sans-serif;">Use to alternate among related views within the same context.</h4>
*/
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
  @Prop({type: Array, default: () => []}) public tabs!: TabDescriptor[];
  /**
   * Selected tab ID
   */
  @Prop({type: Number, default: null}) public selected!: number;
  /**
   * Set true to enable navigation
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public navigation!: boolean;

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
    /**
     * Method to handle tab click
     * @property {tabId, event}
     */
    this.$emit('select', selectedIndex, event);
  }
}
</script>

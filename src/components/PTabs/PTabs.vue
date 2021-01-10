<template>
  <div>
    <div class="Polaris-Tabs__Wrapper">
      <ul :class="className">
        <PTab v-for="(tab, tabIndex) in tabs"
             :key="tabIndex + '-' + tab.id"
             :id="tab.id"
             :selected="selected === tabIndex"
             @click="handleTabClick"
        >
          {{tab.content}}
        </PTab>
      </ul>
    </div>
    <PPanel v-for="(tab, tabIndex) in tabs" :key="tab.id" :id="tab.id + '-panel'" :tabID="tab.id" :hidden="!(selected === tabIndex)"><slot v-if="selected === tabIndex"/></PPanel>
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

    @Prop(Array) public tabs!: TabDescriptor[];
    @Prop(Number) public selected!: number;

    public get className() {
      return classNames(
        'Polaris-Tabs',
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

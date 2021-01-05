<template>
  <ExampleContainer title="Resource List">
    <ExampleContent :code="example1">
      <PCard sectioned>
        <PResourceList
                selectable
                :resourceName="{singular: 'product', plural: 'products'}"
                :hasMore="true"
                :totalCount="5"
                :selected="selected"
                @change="toggleSelected"
                @input-filter-changed="handleSearch"
                @filter-removed="handleFilterRemoved"
                :appliedFilters="[{key:'item_1',value:'Item 1'},{key:'item_2',value:'Item 2'},]"
                :bulkActions="[
                  {content: 'Action 1', onAction: handleAction1},
                  {content: 'Action 2', onAction: handleAction2},
                  {content: 'Action 3', onAction: handleAction3},
                  {content: 'Action 4', onAction: handleAction4, destructive: true}
              ]"
        >
          <template slot="filter">
            <PPopover :active="active" @close="toggleRatingFilter" id="popover_1">
              <PButton slot="activator" @click="toggleRatingFilter" :disclosure="active ? 'up' : 'down'">Filter Options</PButton>
              <POptionList
                      slot="content"
                      allowMultiple
                      :selected="selected"
                      :options="[
                      {label: 'Item 1', value: '1'},
                      {label: 'Item 2', value: '2'},
                      {label: 'Item 3', value: '3'},
                      {label: 'Item 4', value: '4'},
                    ]"
              ></POptionList>
            </PPopover>
            <PPopover :active="active2" @close="toggleRatingFilter2" id="popover_2">
              <PButton slot="activator" @click="toggleRatingFilter2" :disclosure="active2 ? 'up' : 'down'">Filter Options 2</PButton>
              <POptionList
                      slot="content"
                      allowMultiple
                      :selected="selected"
                      :options="[
                      {label: 'Item 1', value: '1'},
                      {label: 'Item 2', value: '2'},
                      {label: 'Item 3', value: '3'},
                      {label: 'Item 4', value: '4'},
                    ]"
                      @input-filter-changed="handleSearch"
              ></POptionList>
            </PPopover>
          </template>
          <PResourceListItem selectable :checked="isChecked(1)" :id="1" @change="handleSelected">
            <PAvatar slot="media"></PAvatar>
            Content for Item 1
          </PResourceListItem>
          <PResourceListItem selectable :checked="isChecked(2)" :id="2" @change="handleSelected">
            <PAvatar slot="media"></PAvatar>
            Content for Item 2
          </PResourceListItem>
          <PResourceListItem selectable :checked="isChecked(3)" :id="3" @change="handleSelected">
            <PAvatar slot="media"></PAvatar>
            Content for Item 3
          </PResourceListItem>
        </PResourceList>
      </PCard>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PResourceList, PResourceListItem } from '@/components/PResourceList';
import { PPopover } from '@/components/PPopover';
import { PButton } from '@/components/PButton';
import { POptionList } from '@/components/POptionList';
import { PAvatar } from '@/components/PAvatar';
import { PCard } from '@/components/PCard';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PResourceList, PPopover, PButton, POptionList, PResourceListItem, PAvatar, PCard,
  },
})
export default class TitlesAndTextExample extends Vue {
  public example1 = `
  <PCard sectioned>
        <PResourceList
                selectable
                :resourceName="{singular: 'product', plural: 'products'}"
                :hasMore="true"
                :totalCount="5"
                :selected="selected"
                @change="toggleSelected"
                @input-filter-changed="handleSearch"
                @filter-removed="handleFilterRemoved"
                :appliedFilters="[{key:'item_1',value:'Item 1'},{key:'item_2',value:'Item 2'},]"
                :bulkActions="[
                  {content: 'Action 1', onAction: handleAction1},
                  {content: 'Action 2', onAction: handleAction2},
                  {content: 'Action 3', onAction: handleAction3},
                  {content: 'Action 4', onAction: handleAction4, destructive: true}
              ]"
        >
          <template slot="filter">
            <PPopover :active="active" @close="toggleRatingFilter" id="popover_1">
              <PButton slot="activator" @click="toggleRatingFilter" :disclosure="active ? 'up' : 'down'">Filter Options</PButton>
              <POptionList
                      slot="content"
                      allowMultiple
                      :selected="selected"
                      :options="[
                      {label: 'Item 1', value: '1'},
                      {label: 'Item 2', value: '2'},
                      {label: 'Item 3', value: '3'},
                      {label: 'Item 4', value: '4'},
                    ]"
              ></POptionList>
            </PPopover>
            <PPopover :active="active2" @close="toggleRatingFilter2" id="popover_2">
              <PButton slot="activator" @click="toggleRatingFilter2" :disclosure="active2 ? 'up' : 'down'">Filter Options 2</PButton>
              <POptionList
                      slot="content"
                      allowMultiple
                      :selected="selected"
                      :options="[
                      {label: 'Item 1', value: '1'},
                      {label: 'Item 2', value: '2'},
                      {label: 'Item 3', value: '3'},
                      {label: 'Item 4', value: '4'},
                    ]"
                      @input-filter-changed="handleSearch"
              ></POptionList>
            </PPopover>
          </template>
          <PResourceListItem selectable :checked="isChecked(1)" :id="1" @change="handleSelected">
            <PAvatar slot="media"></PAvatar>
            Content for Item 1
          </PResourceListItem>
          <PResourceListItem selectable :checked="isChecked(2)" :id="2" @change="handleSelected">
            <PAvatar slot="media"></PAvatar>
            Content for Item 2
          </PResourceListItem>
          <PResourceListItem selectable :checked="isChecked(3)" :id="3" @change="handleSelected">
            <PAvatar slot="media"></PAvatar>
            Content for Item 3
          </PResourceListItem>
        </PResourceList>
      </PCard>
  `;

  public selected = [1];
  public search = '';
  public active = false;
  public active2 = false;

  public handleAction1() {
    alert('Handle Action 1');
  }

  public handleAction2() {
    alert('Handle Action 2');
  }

  public handleAction3() {
    alert('Handle Action 3');
  }

  public handleAction4() {
    alert('Handle Action 4');
  }

  public handleSearch(val) {
    alert('handle search ' + val);
    this.search = val;
  }

  public handleSelected(id, checked) {

    if (checked) {
      this.selected.push(id);
    }

    if (!checked) {
      this.selected.splice(this.selected.indexOf(id), 1);
    }
  }

  public toggleRatingFilter() {
    this.active = !this.active;
  }
  public toggleRatingFilter2() {
    this.active2 = !this.active2;
  }

  public isChecked(id) {
    return this.selected.indexOf(id) >= 0;
  }

  public toggleSelected(item) {

    this.selected = item.selected ? [1, 2, 3] : [ ];
  }

  public handleFilterRemoved(item) {
    this.search = '';
  }
}
</script>

<style lang="scss" scoped>

</style>

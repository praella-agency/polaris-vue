<template>
    <div :class="className">
        <div class="Polaris-ResourceList__FiltersWrapper">
            <PFilter v-if="$slots.hasOwnProperty('filter')" v-bind="$attrs" :resourceTitle="resourceTitle" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
                <slot name="filter" ></slot>
            </PFilter>
        </div>
        <div class="Polaris-ResourceList__HeaderOuterWrapper">
            <PResourceListHeader
                    v-bind="$attrs"
                    :selectable="selectable"
                    :selectedItems="computedValue.selected"
                    :selectedMore="computedValue.selectedMore"
                    :checked="checked"
                    :resourceTitle="resourceTitle"
                    :checkedCount="checkedCount"
                    :checkedAll="checkedAll"
                    :count="count()"
                    :hasMore="hasMore"
                    v-on="$listeners"
                    @toggle-all="onToggledAll($event)"
                    @toggle-select-more="onSelectMore"
            />
        </div>
        <ul class="Polaris-ResourceList" aria-live="polite">
            <slot/>
        </ul>

        <slot v-if="showEmptySearchState" name="emptySearchState" />
    </div>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import {PImage} from '@/components/PImage';
    import PResourceListHeader from '@/components/PResourceList/components/PResourceListHeader.vue';
    import PFilter from "@/components/PFilter/PFilter.vue";

    interface ResourceNameInterface {
        singular: string;
        plural: string;
    }

    @Component({
        components: {
            PFilter,
            PResourceListHeader,
            PImage,
        },
    })
    export default class PResourceList extends Vue {

        @Prop(String) public source!: string;
        @Prop({type: Array, default: () => []}) public selected!: number[];
        @Prop(Boolean) public selectable!: boolean;
        @Prop(Boolean) public hasMore!: boolean;
        @Prop(Boolean) public loading!: boolean;
        @Prop({required: true, type: Object}) public resourceName!: ResourceNameInterface;

        public selectedItems = this.selectable && this.selected ? this.selected : [];
        public selectedMore :boolean = false;
        public selectedAll :boolean = false;

        public itemsExist = this.$slots.default;
        public showEmptyState = this.$slots.emptyState && !this.itemsExist && !this.loading;
        public showEmptySearchState = !this.showEmptyState && !this.itemsExist && !this.loading;

        public count() {

            return this.$slots.default ? this.$slots.default.filter(vnode => {
                return vnode.tag != undefined
            }).length : 0;
        }

        public get className() {
            return classNames(
                'Polaris-ResourceList__ResourceListWrapper',
            );
        }

        public get checkedAll() {

            return this.checked && this.count() === this.checkedCount;
        }

        public get checked() {
            return this.selectable && this.checkedCount > 0;
        }

        public get resourceTitle() {

            const resourceName: ResourceNameInterface = this.resourceName;
            return this.count() > 1 ? resourceName.plural : resourceName.singular;
        }

        public get checkedCount() {
            return this.selectable ? this.selected.length : 0;
        }

        public get computedValue() {
            return { selected: this.selectedItems, selectedAll: this.selectedAll, selectedMore: this.selectedMore };
        }

        public set computedValue(items: any) {
            this.selectedAll = items.selectedAll;
            this.selectedMore = items.selectedMore;
            this.$emit('change', items);
        }

        public onToggledAll(checked) {

            if (checked) {
                this.computedValue = { selectedAll: false, selectedMore: false }
            } else {
                this.computedValue = { ...this.computedValue, ...{ selectedAll: true } }
            }
        }

        public onSelectMore() {

            this.computedValue = { ...this.computedValue, ...{ selectedAll: true, selectedMore: !this.selectedMore } }
        }

        public onRemoveFilter(tag) {

            this.$emit('filter-removed',tag)
        }

        public onFilterInputChanged(value) {

            this.$emit('input-filter-changed',value)
        }
    }
</script>

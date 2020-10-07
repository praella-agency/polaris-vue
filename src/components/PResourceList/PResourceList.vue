<template>

    <div :class="className">


        <!--<div class="Polaris-EmptyState Polaris-EmptyState&#45;&#45;withinContentContainer">
            <div class="Polaris-EmptyState__Section">
                <div class="Polaris-EmptyState__DetailsContainer">
                    <div class="Polaris-EmptyState__Details">
                        <div class="Polaris-TextContainer">
                            <p class="Polaris-DisplayText Polaris-DisplayText&#45;&#45;sizeSmall">Upload a file to get started</p>
                            <div class="Polaris-EmptyState__Content">
                                <p>You can use the Files section to upload images, videos, and other documents</p>
                            </div>
                        </div>
                        <div class="Polaris-EmptyState__Actions">
                            <div class="Polaris-Stack Polaris-Stack&#45;&#45;alignmentCenter">
                                <div class="Polaris-Stack__Item"><button type="button" class="Polaris-Button Polaris-Button&#45;&#45;primary"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Upload files</span></span></button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Polaris-EmptyState__ImageContainer"><img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" role="presentation" alt="" class="Polaris-EmptyState__Image"></div>
            </div>
        </div>-->

        <div class="Polaris-ResourceList__FiltersWrapper">
            <PFilter v-bind="$attrs" :resourceTitle="resourceTitle" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
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
                    :checkedCount="checkedCount()"
                    :checkedAll="checkedAll()"
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
        @Prop(Array) public selected!: number[];
        @Prop(Boolean) public selectable!: boolean;
        @Prop(Boolean) public hasMore!: boolean;
        @Prop({required: true, type: Object}) public resourceName!: ResourceNameInterface;

        public selectedItems = this.selected ? this.selected : [];
        public selectedMore :boolean = false;
        public selectedAll :boolean = false;

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

        public checkedAll() {

            return this.$slots.default && this.$slots.default.length === this.selected.length;
        }

        public get checked() {
            return this.checkedCount() > 0;
        }


        public get resourceTitle() {

            const resourceName: ResourceNameInterface = this.resourceName;
            return this.count() > 1 ? resourceName.plural : resourceName.singular;
        }

        public checkedCount() {
            return this.selected.length;
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

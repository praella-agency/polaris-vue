<template>

    <div :class="className">
        <div class="Polaris-ResourceList__FiltersWrapper" v-if="$slots.filter">
            <slot name="filter" />
        </div>

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

        <PResourceListHeader
                v-bind="$attrs"
                :selectable="selectable"
                :selectedItems="computedValue"
                :checked="checked"
                :checkedAll="checkedAll"
                :count="count"
                v-on="$listeners"
                @toggle-all="onToggledAll($event)" />


    </div>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import {PImage} from '@/components/PImage';
    import PResourceListHeader from '@/components/PResourceList/PResourceListHeader.vue';

    @Component({
        components: {
            PResourceListHeader,
            PImage,
        },
    })
    export default class PResourceList extends Vue {

        @Prop(String) public source!: string;
        @Prop(Array) public selected!: number[];
        @Prop(Boolean) public selectable!: boolean;

        public selectedItems = this.selected ? this.selected : [];

        public get count() {

            return this.$slots.default ? this.$slots.default.length : 0;
        }

        public get className() {
            return classNames(
                'Polaris-ResourceList__ResourceListWrapper',
            );
        }

        public get checkedAll() {

            return this.$slots.default && this.$slots.default.length === this.selected.length;
        }

        public get checked() {

            return this.selected.length > 0;
        }

        public get computedValue() {
            return this.selectedItems;
        }

        public set computedValue(selected: any[]) {
            this.selectedItems = selected;
            this.$emit('change', selected);
        }

        public onToggledAll(checked) {

            if (checked) {
                this.computedValue = []
            } else {
                this.computedValue = [1,2,3]
            }
        }
    }
</script>

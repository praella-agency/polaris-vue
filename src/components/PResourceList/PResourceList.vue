<template>
    <div :class="className">
        <div class="Polaris-ResourceList__FiltersWrapper" v-if="hideFilters">
            <PFilter v-if="$slots.hasOwnProperty('filter')" v-bind="$attrs" :resourceTitle="resourceTitle" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
                <!-- @slot Filter content -->
                <slot name="filter"/>
            </PFilter>
        </div>
        <div ref="PResourceListHeader" class="Polaris-ResourceList__HeaderOuterWrapper" v-if="showHeader">
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
            <!-- @slot Displays when Selectable is true -->
            <slot :selectable="selectable"/>
        </ul>

        <!-- @slot Content for empty search state -->
        <slot v-if="showEmptySearchState" name="emptySearchState">
          <div class="Polaris-ResourceList__SpinnerContainer" :style="{'padding-top': `${topPadding}px`}">
            <PSpinner size="large" />
          </div>
          <div class="Polaris-ResourceList__LoadingOverlay"></div>
        </slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import {PImage} from '@/components/PImage';
import PResourceListHeader from '@/components/PResourceList/components/PResourceListHeader.vue';
import PFilter from '@/components/PFilter/PFilter.vue';
import {PSpinner} from '@/components/PSpinner';

interface ResourceNameInterface {
    singular: string;
    plural: string;
}

@Component({
    components: {
        PFilter,
        PResourceListHeader,
        PImage,
        PSpinner,
    },
})
export default class PResourceList extends Vue {

    /**
     * Renders a Select All button at the top
     * of the list and checkboxes in front of each list item.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public selectable!: boolean;

    /**
     * Get the value of the selected items in array.
     */
    @Prop({type: Array, default: () => []}) public selected!: number[];

    /**
     * Whether or not there are more items than currently set
     * on the items prop
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public hasMore!: boolean;

    /**
     * Overlays item list with a spinner while a
     * background action is being performed.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public loading!: boolean;

    /**
     * Name of the resource, such as customers or books.
     * @values {plural: string, singular: string}
     */
    @Prop({required: true, type: Object}) public resourceName!: ResourceNameInterface;

    /**
     * Boolean to show or hide the header
     * @value true | false
     */
    @Prop({type: Boolean, default: false}) public showHeader!: boolean;

    /**
     * Boolean to show or hide the filters
     * @value true | false
     */
    @Prop({type: Boolean, default: true}) public hideFilters!: boolean;

    public selectedItems = this.selectable && this.selected ? this.selected : [];
    public selectedMore: boolean = false;
    public selectedAll: boolean = false;

    public itemsExist = this.$slots.default;

    public showEmptyState = this.$slots.emptyState && !this.itemsExist && !this.loading;
    public showEmptySearchState = !this.showEmptyState && !this.itemsExist && this.loading;

    public topPadding = 8;

    public mounted() {
      let loadingPosition = 0;

      if (typeof window !== 'undefined' && this.$refs.hasOwnProperty('PResourceListHeader')) {
        const overlay = (this.$refs.PResourceListHeader as Element).getBoundingClientRect();
        const viewportHeight = Math.max(document.documentElement ?
            document.documentElement.clientHeight : 0, window.innerHeight || 0);
        const overflow = viewportHeight - overlay.height;
        const spinnerHeight = 45;
        loadingPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 :
            (viewportHeight - overlay.top - spinnerHeight) / 2;
        loadingPosition = loadingPosition + (this.$refs.PResourceListHeader as Element).getBoundingClientRect().height;
        this.topPadding = loadingPosition > 0 ? loadingPosition : this.topPadding;
      }
    }

    public count() {
        if (typeof this.$scopedSlots !== 'undefined'
            && typeof this.$scopedSlots.default === 'function'
            && this.$scopedSlots.default({})) {
            const slots = this.$scopedSlots.default({});
            return slots ? slots.filter((vnode) => vnode.tag !== undefined).length : 0;
        }
        if (this.$slots.default) {
            return this.$slots.default.filter((vnode) => {
                return vnode.tag !== undefined;
            }).length;
        }

        return 0;
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

        /**
         * Callback when selection is changed.
         * @property {Array} selectedItems
         */
        this.$emit('change', items);
    }

    public onToggledAll(checked) {

        if (checked) {
            this.computedValue = { selectedAll: false, selectedMore: false };
        } else {
            this.computedValue = { ...this.computedValue, ...{ selectedAll: true } };
        }
    }

    public onSelectMore() {

        this.computedValue = { ...this.computedValue, ...{ selectedAll: true, selectedMore: !this.selectedMore } };
    }

    public onRemoveFilter(tag) {
        /**
         * Calls when filter removes
         * @property {String} tag
         */
        this.$emit('filter-removed', tag);
    }

    public onFilterInputChanged(value) {
        /**
         * Calls when filter is adding
         * @property {String} input-value
         */
        this.$emit('input-filter-changed', value);
    }
}
</script>

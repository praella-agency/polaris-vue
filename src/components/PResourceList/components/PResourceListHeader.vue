<template>

    <div :class="className">
        <div class="Polaris-ResourceList__HeaderContentWrapper">
            <div class="Polaris-ResourceList__HeaderTitleWrapper">{{resourceHeaderTitle}}</div>
            <div class="Polaris-ResourceList__CheckableButtonWrapper" v-if="selectable && !checked">
                <PCheckableButton plain v-bind="$attrs" v-on="$listeners">{{resourceHeaderTitle}}</PCheckableButton>
            </div>
            <div class="Polaris-ResourceList__SortWrapper" v-if="sortOptions">
                <PSelect :inlineLabel="sortLabel" labelHidden :options="sortOptions" @change="$emit('sort-change', $event)"></PSelect>
            </div>
        </div>

        <div class="Polaris-ResourceList__BulkActionsWrapper" v-if="checked">
             <div class="Polaris-ResourceList-BulkActions__Group Polaris-ResourceList-BulkActions__Group--largeScreen Polaris-ResourceList-BulkActions__Group--entered">
                <div class="Polaris-ResourceList-BulkActions__ButtonGroupWrapper">
                    <PButtonGroup segmented>
                        <PCheckableButton v-bind="$attrs" :checked="checked" v-on="$listeners">{{resourceHeaderTitle}}</PCheckableButton>
                        <PBulkActionButtonWrapper :action="promotedBulkActions"></PBulkActionButtonWrapper>
                        <PBulkActionButtonWrapper>
                            <PPopover
                                    :id="popoverId"
                                    :active="bulkActionsShown"
                                    preferredAlignment="right"
                                    :fullWidth="false"
                                    @close="bulkActionsShown = false">
                                <template slot="activator">
                                    <PButton @click="bulkActionsShown = !bulkActionsShown">
                                        More actions
                                    </PButton>
                                </template>
                                <template slot="content">
                                    <PActionList :items="bulkActions"></PActionList>
                                </template>
                            </PPopover>
                        </PBulkActionButtonWrapper>
                    </PButtonGroup>
                </div>
                <div class="Polaris-ResourceList-BulkActions__PaginatedSelectAll" v-if="hasMore && checked">
                    <PButton @click="handleToggleSelectMore"
                             plain v-if="!selectedMore">Select all {{count}}+ {{resourceTitle}} in your store</PButton>
                    <div v-else>
                        <span>All {{count}}+ {{resourceTitle}} in your store are selected. </span>
                        <PButton plain @click="handleToggleSelectMore">Undo</PButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PButtonGroup } from '@/components/PButtonGroup';
import { PButton } from '@/components/PButton';
import PCheckableButton from '@/components/PResourceList/components/PCheckableButton.vue';
import PBulkActionButtonWrapper from '@/components/PResourceList/components/PBulkActionButtonWrapper.vue';
import { PPopover } from '@/components/PPopover';
import { PActionList } from '@/components/PActionList';
import ComponentHelpers from '@/ComponentHelpers';
import {PSelect} from '@/components/PSelect';

interface BulkActionsInterface {
    content: string;
    onAction: void;
}

interface SortOptionsInterface {
    label: string;
    value: void;
}

@Component({
    components: {
        PCheckableButton, PButtonGroup, PButton, PBulkActionButtonWrapper, PPopover, PActionList, PSelect,
    },
})
export default class PResourceListHeader extends Vue {

    @Prop({type: String, default: `PolarisPopover${ComponentHelpers.uuid()}`}) public popoverId!: string;
    @Prop(String) public resourceTitle!: string;
    @Prop(Object) public promotedBulkActions!: object;
    @Prop(Array) public bulkActions!: BulkActionsInterface[];
    @Prop(Array) public sortOptions!: SortOptionsInterface[];
    @Prop({type: String, default: 'Sort By'}) public sortLabel!: string;
    @Prop(Number) public totalCount!: number;
    @Prop(Boolean) public selectable!: boolean;
    @Prop(Boolean) public checked!: boolean;
    @Prop(Number) public checkedCount!: number;
    @Prop(Boolean) public hasMore!: boolean;
    @Prop(Boolean) public selectedMore!: boolean;
    @Prop({required: true, type: Number}) public count!: number;

    public bulkActionsShown: boolean = false;

    public get className() {

        return classNames(
            'Polaris-ResourceList__HeaderWrapper',
            this.selectable && 'Polaris-ResourceList__HeaderWrapper--hasSelect',
            this.checked && 'Polaris-ResourceList__HeaderWrapper--inSelectMode',
            this.promotedBulkActions && 'Polaris-ResourceList__HeaderWrapper--hasSort',
        );
    }

    public get resourceHeaderTitle() {

        if (!this.checked) {

            const resource = this.resourceTitle;
            return `Showing ${this.count} ${this.totalCount ? ' of ' + this.totalCount : ''} ${resource}`;
        } else if (this.checkedCount) {

            return `${this.checkedCount}${this.selectedMore ? '+' : ''} selected`;
        }
    }

    public handleToggleSelectMore() {

        this.$emit('toggle-select-more');
    }
}
</script>

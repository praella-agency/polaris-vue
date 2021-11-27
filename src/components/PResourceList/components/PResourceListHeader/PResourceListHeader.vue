<template>
    <div :class="className">
        <div v-if="loading" class="Polaris-ResourceList__HeaderWrapper--overlay"></div>
        <div class="Polaris-ResourceList__HeaderContentWrapper">
            <div class="Polaris-ResourceList__HeaderTitleWrapper">{{ resourceHeaderTitle }}</div>
            <div class="Polaris-ResourceList__CheckableButtonWrapper" v-if="selectable && !checked">
                <PCheckableButton plain v-bind="$attrs" v-on="$listeners">{{ resourceHeaderTitle }}</PCheckableButton>
            </div>
            <div class="Polaris-ResourceList__SortWrapper" v-if="(sortOptions && sortOptions.length > 0)">
                <PSelect
                    :inlineLabel="!smallView ? sortLabel : null"
                    :labelHidden="smallView"
                    :options="sortOptions"
                    v-model="selectedOption"
                    @change="handleSortChange"
                />
            </div>
            <div v-if="isSelectable" class="Polaris-ResourceList__SelectButtonWrapper">
                <PButton
                    icon="EnableSelectionMinor"
                    @click="handleSelectMode(true)"
                >
                    Select
                </PButton>
            </div>
        </div>

        <div class="Polaris-ResourceList__BulkActionsWrapper" v-if="checked || smallViewChecked">
            <div :class="`Polaris-ResourceList-BulkActions__Group ${screenClassName}
                Polaris-ResourceList-BulkActions__Group--entered`">
                <div class="Polaris-ResourceList-BulkActions__ButtonGroupWrapper">
                    <PButtonGroup :segmented="segmentedGroup">
                        <PCheckableButton v-bind="$attrs" :checked="checked" v-on="$listeners">
                            {{ resourceHeaderTitle }}
                        </PCheckableButton>
                        <PBulkActionButtonWrapper
                            v-if="!smallView && (promotedBulkActions.length > 0 || Object.keys(promotedBulkActions).length > 0)"
                            :actions="promotedBulkActions"
                        />
                        <template v-if="smallView">
                            <PBulkActionButtonWrapper
                                v-if="promotedBulkActions.length > 0 || Object.keys(promotedBulkActions).length > 0 ||
                                        bulkActions.length > 0"
                            >
                                <PPopover
                                    :id="popOverID"
                                    :active="bulkActionsShown"
                                    :fullWidth="false"
                                    @close="bulkActionsShown = false">
                                    <template slot="activator">
                                        <PButton
                                            :disclosure="bulkActionsShown ? 'up' : 'down'"
                                            @click="bulkActionsShown = !bulkActionsShown">
                                            Actions
                                        </PButton>
                                    </template>
                                    <template slot="content">
                                        <PActionList :items="promotedBulkActionsData"
                                                     :sections="bulkActionsForSmallScreen"/>
                                    </template>
                                </PPopover>
                            </PBulkActionButtonWrapper>
                            <PBulkActionButtonWrapper>
                                <PButton
                                    @click="cancelSelectMode(false)"
                                >
                                    Cancel
                                </PButton>
                            </PBulkActionButtonWrapper>
                        </template>
                        <template v-else>
                            <PBulkActionButtonWrapper v-if="bulkActions.length > 0">
                                <PPopover
                                    :id="popOverID"
                                    :active="bulkActionsShown"
                                    preferredAlignment="right"
                                    :fullWidth="false"
                                    @close="bulkActionsShown = false">
                                    <template slot="activator">
                                        <PButton
                                            :disclosure="bulkActionsShown ? 'up' : 'down'"
                                            @click="bulkActionsShown = !bulkActionsShown">
                                            More actions
                                        </PButton>
                                    </template>
                                    <template slot="content">
                                        <PActionList :items="bulkActions"/>
                                    </template>
                                </PPopover>
                            </PBulkActionButtonWrapper>
                        </template>
                    </PButtonGroup>
                </div>
                <div class="Polaris-ResourceList-BulkActions__PaginatedSelectAll"
                     v-if="hasMore && checked && !smallView">
                    <PButton @click="handleToggleSelectMore"
                             plain v-if="!selectedMore">Select all {{ count }}+ {{ resourceTitle }} in your store
                    </PButton>
                    <div v-else>
                        <span>All {{ count }}+ {{ resourceTitle }} in your store are selected. </span>
                        <PButton plain @click="handleToggleSelectMore">Undo</PButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import ComponentHelpers from '../../../../ComponentHelpers';
    import { PButtonGroup } from '../../../../components/PButtonGroup';
    import { PButton } from '../../../../components/PButton';
    import { PCheckableButton } from '../../../../components/PResourceList/components/PCheckableButton';
    import { PBulkActionButtonWrapper } from '../../../../components/PResourceList/components/PBulkActionButtonWrapper';
    import { PPopover } from '../../../../components/PPopover';
    import { PActionList } from '../../../../components/PActionList';
    import { PSelect } from '../../../../components/PSelect';
    import ArrayValidator from '../../../../utilities/validators/ArrayValidator';

    const BulkActionsInterface = {
        content: {
            type: String,
            required: true,
        },
        onAction: {
            type: Function,
            required: true,
        },
    }

    const SortOptionsInterface = {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    }

    export default {
        name: 'PResourceListHeader',
        components: {
            PCheckableButton, PButtonGroup, PButton, PBulkActionButtonWrapper, PPopover, PActionList, PSelect,
        },
        props: {
            popoverId: {
                type: String,
                default: `PolarisPopover${ComponentHelpers.uuid()}`,
            },
            resourceTitle: {
                type: String,
            },
            promotedBulkActions: {
                type: [Object, Array],
                default: () => ([]),
            },
            bulkActions: {
                type: Array,
                default: () => ([]),
                ...ArrayValidator('bulkActions', BulkActionsInterface),
            },
            sortOptions: {
                type: Array,
                ...ArrayValidator('sortOptions', SortOptionsInterface),
            },
            sortLabel: {
                type: String,
                default: 'Sort By',
            },
            totalCount: {
                type: Number,
            },
            selectable: {
                type: Boolean,
            },
            checked: {
                type: Boolean,
            },
            checkedCount: {
                type: Number,
            },
            hasMore: {
                type: Boolean,
            },
            selectedMore: {
                type: Boolean,
            },
            count: {
                type: Number,
                required: true,
            },
            loading: {
                type: Boolean,
            },
        },
        data() {
            return {
                bulkActionsShown: false,
                selectedOption: null,
                smallView: false,
                selectMode: this.selectable,
                popOverID: this.popOverID,
                smallViewChecked: false,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-ResourceList__HeaderWrapper',
                    this.selectable && 'Polaris-ResourceList__HeaderWrapper--hasSelect',
                    (this.checked || this.smallViewChecked) && 'Polaris-ResourceList__HeaderWrapper--inSelectMode',
                    this.promotedBulkActions && 'Polaris-ResourceList__HeaderWrapper--hasSort',
                    this.loading && 'Polaris-ResourceList__HeaderWrapper--disabled',
                );
            },
            screenClassName() {
                return classNames(
                    this.smallView && 'Polaris-ResourceList-BulkActions__Group--smallScreen',
                    !this.smallView && 'Polaris-ResourceList-BulkActions__Group--largeScreen',
                );
            },
            resourceHeaderTitle() {
                if (this.loading) {
                    return `Loading ${this.resourceTitle}`;
                }

                if (!this.checked) {
                    const resource = this.resourceTitle;
                    if (this.smallView) {
                        return `${this.checkedCount}${this.selectedMore ? '+' : ''} selected`;
                    }
                    return `Showing ${this.count} ${this.totalCount ? ' of ' + this.totalCount : ''} ${resource}`;
                } else if (this.checkedCount) {

                    return `${this.checkedCount}${this.selectedMore ? '+' : ''} selected`;
                }
            },
            isSelectable() {
                return Boolean((Object.keys(this.promotedBulkActions).length > 0) ||
                    (Object.keys(this.bulkActions).length > 0) || this.selectable);
            },
            bulkActionsForSmallScreen() {
                if (this.bulkActions.length > 0) {
                    return [
                        {
                            items: this.bulkActions,
                        },
                    ];
                }
            },
            segmentedGroup() {
                return Object.keys(this.promotedBulkActions).length > 0 || this.bulkActions.length > 0;
            },
            promotedBulkActionsData() {
                if (this.promotedBulkActions instanceof Array) {
                    return this.promotedBulkActions;
                }
                return [this.promotedBulkActions];
            },
        },
        methods: {
            handleToggleSelectMore() {
                this.$emit('toggle-select-more');
            },
            handleSortChange(value) {
                this.$emit('sort-change', value);
            },
            isSmallScreen() {
                if (window.innerWidth < 458) {
                    this.smallView = true;
                    this.popOverID = 'smallScreenPopover';
                } else {
                    this.smallView = false;
                    this.popOverID = 'largeScreenPopover';
                    this.smallViewChecked = false;
                }
            },
            handleSelectMode(selectMode) {
                this.selectMode = selectMode;
                this.smallViewChecked = true;
                this.$emit('handle-selection-mode', selectMode);
            },
            cancelSelectMode(selectMode) {
                this.selectMode = selectMode;
                this.smallViewChecked = false;
                this.$emit('handle-selection-mode', selectMode);
            },
        },
        mounted() {
            window.addEventListener('resize', this.isSmallScreen);
            this.isSmallScreen();
        },
    }
</script>

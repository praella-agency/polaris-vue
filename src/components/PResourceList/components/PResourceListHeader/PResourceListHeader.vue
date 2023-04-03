<template>
    <div :class="className">
        <div v-if="loading" class="Polaris-ResourceList__HeaderWrapper--overlay"></div>
        <div class="Polaris-ResourceList__HeaderContentWrapper">
            <div class="Polaris-ResourceList__HeaderTitleWrapper">{{ resourceHeaderTitle }}</div>
            <div class="Polaris-ResourceList__CheckableButtonWrapper" v-if="selectable && !checked">
                <PCheckableButton plain :checked="checked" v-bind="$attrs" @toggle-all="handleToggleAll">
                    {{ resourceHeaderTitle }}
                </PCheckableButton>
            </div>
            <template v-if="!(checked || smallViewChecked)">
                <div class="Polaris-ResourceList__SortWrapper" v-if="(sortOptions && sortOptions.length > 0)">
                    <PSelect
                        :inlineLabel="!smallView ? sortLabel : null"
                        :labelHidden="smallView"
                        :options="sortOptions"
                        v-model="selectedOption"
                        @change="handleSortChange"
                    />
                </div>
            </template>
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
                        <PCheckableButton v-bind="$attrs" :checked="checked" @toggle-all="handleToggleAll">
                            {{ resourceHeaderTitle }}
                        </PCheckableButton>
                        <PBulkActionButtonWrapper
                            v-if="!smallView && (promotedBulkActions.length > 0 || Object.keys(promotedBulkActions).length > 0)"
                            :actions="promotedBulkActions"
                        />
                            <PBulkActionButtonWrapper
                                v-if="smallView && (promotedBulkActions.length > 0 || Object.keys(promotedBulkActions).length > 0 ||
                                        bulkActions.length > 0)"
                            >
                                <PPopover
                                    :id="popOverID"
                                    :active="bulkActionsShown"
                                    :fullWidth="false"
                                    @close="bulkActionsShown = false"
                                >
                                    <template #activator>
                                        <PButton
                                            :disclosure="bulkActionsShown ? 'up' : 'down'"
                                            @click="bulkActionsShown = !bulkActionsShown"
                                        >
                                            Actions
                                        </PButton>
                                    </template>
                                    <template #content>
                                        <PActionList
                                            :items="promotedBulkActionsData"
                                            :sections="bulkActionsForSmallScreen"
                                        />
                                    </template>
                                </PPopover>
                            </PBulkActionButtonWrapper>
                            <PBulkActionButtonWrapper v-if="smallView">
                                <PButton
                                    @click="cancelSelectMode(false)"
                                >
                                    Cancel
                                </PButton>
                            </PBulkActionButtonWrapper>
                            <PBulkActionButtonWrapper v-else-if="bulkActions.length > 0">
                                <PPopover
                                    :id="popOverID"
                                    :active="bulkActionsShown"
                                    preferredAlignment="right"
                                    :fullWidth="false"
                                    @close="bulkActionsShown = false"
                                >
                                    <template #activator>
                                        <PButton
                                            :disclosure="bulkActionsShown ? 'up' : 'down'"
                                            @click="bulkActionsShown = !bulkActionsShown">
                                            More actions
                                        </PButton>
                                    </template>
                                    <template #content>
                                        <PActionList :items="bulkActions"/>
                                    </template>
                                </PPopover>
                            </PBulkActionButtonWrapper>
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

<script setup>
    import { classNames } from '../../../../utilities/css';
    import { uuid } from '../../../../ComponentHelpers';
    import { PButtonGroup } from '../../../../components/PButtonGroup';
    import { PButton } from '../../../../components/PButton';
    import { PCheckableButton } from '../../../../components/PResourceList/components/PCheckableButton';
    import { PBulkActionButtonWrapper } from '../../../../components/PResourceList/components/PBulkActionButtonWrapper';
    import { PPopover } from '../../../../components/PPopover';
    import { PActionList } from '../../../../components/PActionList';
    import { PSelect } from '../../../../components/PSelect';
    import ArrayValidator from '../../../../utilities/validators/ArrayValidator';
    import {BulkActionsInterface, SortOptionsInterface} from "../../../variables";
    import {computed, onMounted, ref} from "vue";

    let props = defineProps({
        popoverId: {
            type: String,
            default: `PolarisPopover${uuid()}`,
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
    });
    const emit = defineEmits(['toggle-select-more', 'sort-change', 'handle-selection-mode', 'toggle-all']);

    let bulkActionsShown = ref(false);
    let selectedOption = ref(null);
    let smallView = ref(false);
    let selectMode = ref(props.selectable);
    let popOverID = ref(null);
    let smallViewChecked = ref(false);

    let className = computed(() => {
        return classNames(
            'Polaris-ResourceList__HeaderWrapper',
            props.selectable && 'Polaris-ResourceList__HeaderWrapper--hasSelect',
            (props.checked || smallViewChecked.value) && 'Polaris-ResourceList__HeaderWrapper--inSelectMode',
            props.promotedBulkActions && 'Polaris-ResourceList__HeaderWrapper--hasSort',
            props.loading && 'Polaris-ResourceList__HeaderWrapper--disabled',
        );
    });

    let screenClassName = computed(() => {
        return classNames(
            smallView.value && 'Polaris-ResourceList-BulkActions__Group--smallScreen',
            !smallView.value && 'Polaris-ResourceList-BulkActions__Group--largeScreen',
        );
    });

    let resourceHeaderTitle = computed(() => {
        if (props.loading) {
            return `Loading ${props.resourceTitle}`;
        }

        if (!props.checked) {
            const resource = props.resourceTitle;
            if (smallView.value) {
                return `${props.checkedCount}${props.selectedMore ? '+' : ''} selected`;
            }
            return `Showing ${props.count} ${props.totalCount ? ' of ' + props.totalCount : ''} ${resource}`;
        } else if (props.checkedCount) {
            return `${props.checkedCount}${props.selectedMore ? '+' : ''} selected`;
        }
    });

    let isSelectable = computed(() => {
        return Boolean((Object.keys(props.promotedBulkActions).length > 0) || (Object.keys(props.bulkActions).length > 0) || props.selectable);
    });

    let bulkActionsForSmallScreen = computed(() => {
        if (props.bulkActions.length > 0) {
            return [
                {
                    items: props.bulkActions,
                },
            ];
        }
    });

    let segmentedGroup = computed(() => {
        return Object.keys(props.promotedBulkActions).length > 0 || props.bulkActions.length > 0;
    });

    let promotedBulkActionsData = computed(() => {
        if (props.promotedBulkActions instanceof Array) {
            return props.promotedBulkActions;
        }
        return [props.promotedBulkActions];
    });

    function handleToggleSelectMore() {
        emit('toggle-select-more');
    }

    function handleSortChange(value) {
        emit('sort-change', value);
    }

    function isSmallScreen() {
        if (window.innerWidth < 458) {
            smallView.value = true;
            popOverID.value = 'smallScreenPopover';
        } else {
            smallView.value = false;
            popOverID.value = 'largeScreenPopover';
            smallViewChecked.value = false;
        }
    }

    function handleSelectMode(selectMode) {
        selectMode.value = selectMode;
        smallViewChecked.value = true;
        emit('handle-selection-mode', selectMode);
    }

    function cancelSelectMode(selectMode) {
        selectMode.value = selectMode;
        smallViewChecked.value = false;
        emit('handle-selection-mode', selectMode);
    }

    function handleToggleAll(value) {
        emit('toggle-all', value);
    }

    onMounted(() => {
        window.addEventListener('resize', isSmallScreen);
        isSmallScreen();
    });
</script>

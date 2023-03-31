<template>
    <div
        ref="containerNode"
    >
        <div
            v-if="smallScreen"
            :class="smallScreenGroupClassName"
            ref="smallScreenGroupNode"
        >
            <div
                class="Polaris-BulkActions__ButtonGroupWrapper"
            >
                <PButtonGroup segmented>
                    <div
                        class="Polaris-BulkActions__CheckableContainer"
                        ref="checkableWrapperNode"
                    >
                        <PCheckableButton
                            :accessibilityLabel="accessibilityLabel"
                            :label="label"
                            :selected="selected"
                            :selectMode="selectMode"
                            @toggleAll="$emit('toggleAll')"
                            :measuring="measuring"
                            :disabled="disabled"
                            :indeterminate="indeterminate"
                            smallScreen
                        />
                    </div>
                    <div
                        v-if="hasActions"
                    >
                        <PPopover
                            :id="isUuid"
                            :active.sync="smallScreenPopoverVisible"
                            @close="() => { smallScreenPopoverVisible = false; }"
                        >
                            <template #activator>
                                <PBulkActionButton
                                    disclosure
                                    @action="toggleSmallScreenPopover()"
                                    content="Actions"
                                    :disabled="disabled"
                                    :indicator="isNewBadgeInBadgeActions()"
                                />
                            </template>
                            <template #content>
                                <PActionList
                                    :items="promotedActions"
                                    :sections="actionSections"
                                />
                            </template>
                        </PPopover>
                    </div>
                    <PButton
                        @click="$emit('selectModeToggle', selectMode)"
                        :disabled="disabled"
                    >
                        Cancel
                    </PButton>
                </PButtonGroup>
            </div>
            <div
                v-if="paginatedSelectAllAction || (paginatedSelectAllText && paginatedSelectAllAction)"
                class="Polaris-BulkActions__PaginatedSelectAll"
            >
                <span
                    v-if="paginatedSelectAllText && paginatedSelectAllAction"
                    aria-label="polite"
                >
                    {{ paginatedSelectAllText }}
                </span>
                <PButton
                    v-if="paginatedSelectAllAction"
                    @click="paginatedSelectAllAction.onAction()"
                    plain
                    :disabled="disabled"
                >
                    {{ paginatedSelectAllAction.content }}
                </PButton>
            </div>
        </div>
        <div
            v-else
        >
            <div
                :class="largeScreenGroupClassName"
                ref="largeScreenGroupNode"
            >
                <div
                    class="Polaris-BulkActions__ButtonGroupWrapper"
                    ref="largeScreenButtonsNode"
                >
                    <PButtonGroup
                        v-if="promotedActionsMarkup"
                        segmented
                    >
                        <PCheckableButton
                            :accessibilityLabel="accessibilityLabel"
                            :label="label"
                            :selected="selected"
                            :selectMode="selectMode"
                            @toggleAll="$emit('toggleAll')"
                            :measuring="measuring"
                            :disabled="disabled"
                            :indeterminate="indeterminate"
                        />
                        <template
                            v-for="(action, key) in promotedActionsMarkup"
                        >
                            <PBulkActionMenu
                                v-if="instanceOfMenuGroupDescriptor(action)"
                                :key="key"
                                v-bind="action"
                                :indicator="isNewBadgeInBadgeActions()"
                            />
                            <PBulkActionButton
                                v-if="!action['title']"
                                @action="action.onAction()"
                                v-bind="action"
                                :key="key"
                                @handleMeasurement="handleMeasurement"
                            />
                        </template>
                        <div
                            v-if="actionSections.length > 0 || rolledInPromotedActions.length > 0 || measuring"
                            ref="moreActionsNode"
                        >
                            <PPopover
                                :id="isUuid"
                                :active.sync="largeScreenPopoverVisible"
                                @close="() => { largeScreenPopoverVisible = false; }"
                            >
                                <template #activator>
                                    <PBulkActionButton
                                        disclosure
                                        @action="toggleLargeScreenPopover()"
                                        :content="activatorLabel"
                                        :disabled="disabled"
                                        :indicator="isNewBadgeInBadgeActions()"
                                    />
                                </template>
                                <template #content>
                                    <PActionList
                                        :sections="combinedActions"
                                        @item-action="toggleLargeScreenPopover()"
                                    />
                                </template>
                            </PPopover>
                        </div>
                    </PButtonGroup>
                    <PCheckableButton
                        v-else
                        :accessibilityLabel="accessibilityLabel"
                        :label="label"
                        :selected="selected"
                        :selectMode="selectMode"
                        @toggleAll="$emit('toggleAll')"
                        :measuring="measuring"
                        :disabled="disabled"
                        :indeterminate="indeterminate"
                    />
                </div>
                <div
                    v-if="paginatedSelectAllAction || (paginatedSelectAllText && paginatedSelectAllAction)"
                    class="Polaris-BulkActions__PaginatedSelectAll"
                >
                    <span
                        v-if="paginatedSelectAllText && paginatedSelectAllAction"
                        aria-label="polite"
                    >
                        {{ paginatedSelectAllText }}
                    </span>
                    <PButton
                        v-if="paginatedSelectAllAction"
                        @click="paginatedSelectAllAction.onAction()"
                        plain
                        :disabled="disabled"
                    >
                        {{ paginatedSelectAllAction.content }}
                    </PButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import utils from '../../utilities';
    import { uuid } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { BulkAction } from '../../components/PIndexTable/utilities';
    import { PButtonGroup } from '../../components/PButtonGroup';
    import { PCheckableButton } from '../../components/PCheckableButton';
    import { PPopover } from '../../components/PPopover';
    import { PActionList } from '../../components/PActionList';
    import { PButton } from '../../components/PButton';
    import { Action, MenuGroupDescriptor } from '../../types';
    import { PBulkActionMenu } from '../../components/PBulkActions/components/PBulkActionMenu';
    import { PBulkActionButton } from '../../components/PBulkActions/components/PBulkActionButton';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import {computed, onBeforeUnmount, ref} from "vue";

    let props = defineProps({
        /**
         * Visually hidden text for screen readers
         */
        accessibilityLabel: {
            type: String,
            default: null,
        },
        /**
         * Whether to render the small screen BulkActions or not
         */
        smallScreen: {
            type: Boolean,
            default: false,
        },
        /**
         * Label for the bulk actions
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * State of the bulk actions checkbox
         */
        selected: {
            type: [Boolean, String],
            default: false,
        },
        /**
         * List is in a selectable state
         */
        selectMode: {
            type: Boolean,
            default: false,
        },
        /**
         * Actions that will be given more prominence
         */
        promotedActions: {
            type: Array,
            default: () => ([]),
            ...ArrayValidator('promotedActions', {
                ...BulkAction,
                ...MenuGroupDescriptor,
            }),
        },
        /**
         * List of actions
         */
        actions: {
            type: Array,
            default: () => ([]),
            // ...ArrayValidator('actions', {
            //     ...BulkAction,
            //     ...ActionListSection,
            // }),
        },
        /**
         * Text to select all across pages
         */
        paginatedSelectAllText: {
            type: String,
            default: null,
        },
        /**
         * Action for selecting all across pages
         */
        paginatedSelectAllAction: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('paginatedSelectAllAction', Action),
        },
        /**
         * Disables bulk actions
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Indeterminate checkbox
         */
        indeterminate: {
            type: Boolean,
            default: false,
        },
    });

    let measuring = ref(false);
    let smallScreenPopoverVisible = ref(false);
    let largeScreenPopoverVisible = ref(false);
    let containerWidth = ref(0);
    let bulkActionsWidth = ref(0);
    let promotedActionsWidths = ref([]);
    let addedMoreActionsWidthForMeasuring = ref(0);

    let largeScreenGroupClassName = computed(() => {
        return classNames(
            'Polaris-BulkActions__Group',
            'Polaris-BulkActions__Group--largeScreen',
            measuring.value && 'Polaris-BulkActions__Group--measuring',
            props.selectMode && 'Polaris-BulkActions__Group--entered',
            !props.selectMode && 'Polaris-BulkActions__Group--exited',
        );
    });

    let smallScreenGroupClassName = computed(() => {
        return classNames(
            'Polaris-BulkActions__Group',
            'Polaris-BulkActions__Group--smallScreen',
        );
    });

    let hasActions = computed(() => {
        return Boolean(
            (props.promotedActions ? props.promotedActions.length > 0 : false) ||
            (props.actions ? props.actions.length > 0 : false),
        );
    });

    let activatorLabel = computed(() => {
        return !props.promotedActions || (props.promotedActions && numberOfPromotedActionsToRender() === 0 && measuring.value) ? 'Actions' : 'More actions';
    });

    let actionSections = computed(() => {
        if (!props.actions || (props.actions ? props.actions.length === 0 : false)) {
            return [];
        }

        if (instanceOfBulkActionListSectionArray(props.actions)) {
            return props.actions;
        }

        if (instanceOfBulkActionArray(props.actions)) {
            return [
                {
                    items: props.actions,
                },
            ];
        }

        return [];
    });

    let rolledInPromotedActions = computed(() => {
        let numberOfPromotedActionsToRender = numberOfPromotedActionsToRender();

        if (!props.promotedActions || props.promotedActions.length === 0 ||
            numberOfPromotedActionsToRender >= props.promotedActions.length) {
            return [];
        }

        let rolledInPromotedActions = props.promotedActions.map((action) => {
            if (instanceOfMenuGroupDescriptor(action)) {
                return {
                    items: [...action.actions],
                };
            }

            return {
                items: [action],
            };
        });

        return rolledInPromotedActions.slice(numberOfPromotedActionsToRender);
    });

    let combinedActions = computed(() => {
        if (actionSections.value && rolledInPromotedActions.value.length > 0) {
            return [...rolledInPromotedActions.value, ...actionSections.value];
        } else if (actionSections.value) {
            return actionSections.value;
        } else if (rolledInPromotedActions.value.length > 0) {
            return [...rolledInPromotedActions.value];
        }
    });

    let promotedActionsMarkup = computed(() => {
        let actions = [];
        [...props.promotedActions].slice(0, numberOfPromotedActionsToRender()).map((action) => {
            actions.push(action);
        });

        return actions;
    });

    let isUuid = computed(() => {
        return uuid();
    });

    function isNewBadgeInBadgeActions() {
        const actions = actionSections.value;
        if (!actions) {
            return false;
        }

        for (const action of actions) {
            for (const item of action['items']) {
                return item.badge ? (item.badge.status === 'new') : false;
            }
        }

        return false;
    }

    function clamp(number, min, max) {
        if (number < min) {
            return min;
        }
        if (number > max) {
            return max;
        }
        return number;
    }

    function numberOfPromotedActionsToRender() {
        if (!props.promotedActions) {
            return 0;
        }

        if (containerWidth.value >= bulkActionsWidth.value || measuring.value) {
            return props.promotedActions.length;
        }

        let sufficientSpace = false;
        let counter = props.promotedActions.length - 1;
        let totalWidth = 0;

        while (!sufficientSpace && counter >= 0) {
            totalWidth += promotedActionsWidths.value[counter];
            let widthWithRemovedAction = bulkActionsWidth.value - totalWidth + addedMoreActionsWidthForMeasuring.value;

            if (containerWidth.value >= widthWithRemovedAction) {
                sufficientSpace = true;
            } else {
                counter--;
            }
        }

        return clamp(counter, 0, props.promotedActions.length);
    }

    function toggleSmallScreenPopover() {
        smallScreenPopoverVisible.value = !smallScreenPopoverVisible.value;
    }

    function toggleLargeScreenPopover() {
        largeScreenPopoverVisible.value = !largeScreenPopoverVisible.value;
    }

    function instanceOfBulkActionListSectionArray(actions) {
        let validList = props.actions.filter((action) => {
            return action.items;
        });

        return actions.length === validList.length;
    }

    function instanceOfBulkActionArray(actions) {
        let validList = props.actions.filter((action) => {
            return !action.items;
        });

        return actions.length === validList.length;
    }

    function instanceOfMenuGroupDescriptor(action) {
        return 'title' in action;
    }

    function handleMeasurement(width) {
        if (measuring.value) {
            promotedActionsWidths.value.push(width);
        }
    }

    onBeforeUnmount(() => {
        if (document.getElementById(`PolarisPopover${isUuid.value}Overlay`)) {
            document.getElementById(`PolarisPopover${isUuid.value}Overlay`).remove();
        }
    });
</script>

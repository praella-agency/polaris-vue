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
                            :id="this['_uid']"
                            :active.sync="smallScreenPopoverVisible"
                            @close="() => { this.smallScreenPopoverVisible = false; }"
                        >
                            <PBulkActionButton
                                slot="activator"
                                disclosure
                                @action="toggleSmallScreenPopover()"
                                content="Actions"
                                :disabled="disabled"
                                :indicator="isNewBadgeInBadgeActions()"
                            />
                            <PActionList
                                slot="content"
                                :items="promotedActions"
                                :sections="actionSections"
                            />
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
                            v-for="(action, key) in this.promotedActionsMarkup"
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
                                :id="this['_uid']"
                                :active.sync="largeScreenPopoverVisible"
                                @close="() => { this.largeScreenPopoverVisible = false; }"
                            >
                                <PBulkActionButton
                                    slot="activator"
                                    disclosure
                                    @action="toggleLargeScreenPopover()"
                                    :content="activatorLabel"
                                    :disabled="disabled"
                                    :indicator="isNewBadgeInBadgeActions()"
                                />
                                <PActionList
                                    slot="content"
                                    :sections="combinedActions"
                                    @item-action="toggleLargeScreenPopover()"
                                />
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

<script>
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

    export default {
        name: 'PBulkActions',
        components: {
            PCheckableButton, PButtonGroup, PPopover, PBulkActionButton, PActionList, PButton, PBulkActionMenu,
        },
        props: {
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
        },
        data() {
            return {
                measuring: false,
                smallScreenPopoverVisible: false,
                largeScreenPopoverVisible: false,
                containerWidth: 0,
                bulkActionsWidth: 0,
                promotedActionsWidths: [],
                addedMoreActionsWidthForMeasuring: 0,
            };
        },
        computed: {
            largeScreenGroupClassName() {
                return classNames(
                    'Polaris-BulkActions__Group',
                    'Polaris-BulkActions__Group--largeScreen',
                    this.measuring && 'Polaris-BulkActions__Group--measuring',
                    this.selectMode && 'Polaris-BulkActions__Group--entered',
                    !this.selectMode && 'Polaris-BulkActions__Group--exited',
                );
            },
            smallScreenGroupClassName() {
                return classNames(
                    'Polaris-BulkActions__Group',
                    'Polaris-BulkActions__Group--smallScreen',
                );
            },
            hasActions() {
                return Boolean(
                    (this.promotedActions ? this.promotedActions.length > 0 : false) ||
                    (this.actions ? this.actions.length > 0 : false),
                );
            },
            activatorLabel() {
                return !this.promotedActions || (this.promotedActions && this.numberOfPromotedActionsToRender() === 0
                    && this.measuring) ? 'Actions' : 'More actions';
            },
            combinedActions() {
                if (this.actionSections && this.rolledInPromotedActions.length > 0) {
                    return [...this.rolledInPromotedActions, ...this.actionSections];
                } else if (this.actionSections) {
                    return this.actionSections;
                } else if (this.rolledInPromotedActions.length > 0) {
                    return [...this.rolledInPromotedActions];
                }
            },
            promotedActionsMarkup() {
                let actions = [];
                [...this.promotedActions].slice(0, this.numberOfPromotedActionsToRender()).map((action) => {
                    actions.push(action);
                });

                return actions;
            },
            actionSections() {
                if (!this.actions || (this.actions ? this.actions.length === 0 : false)) {
                    return [];
                }

                if (this.instanceOfBulkActionListSectionArray(this.actions)) {
                    return this.actions;
                }

                if (this.instanceOfBulkActionArray(this.actions)) {
                    return [
                        {
                            items: this.actions,
                        },
                    ];
                }

                return [];
            },
            rolledInPromotedActions() {
                let numberOfPromotedActionsToRender = this.numberOfPromotedActionsToRender();

                if (!this.promotedActions || this.promotedActions.length === 0 ||
                    numberOfPromotedActionsToRender >= this.promotedActions.length) {
                    return [];
                }

                let rolledInPromotedActions = this.promotedActions.map((action) => {
                    if (this.instanceOfMenuGroupDescriptor(action)) {
                        return {
                            items: [...action.actions],
                        };
                    }

                    return {
                        items: [action],
                    };
                });

                return rolledInPromotedActions.slice(numberOfPromotedActionsToRender);
            },
        },
        methods: {
            isNewBadgeInBadgeActions() {
                const actions = this.actionSections;
                if (!actions) {
                    return false;
                }

                for (const action of actions) {
                    for (const item of action['items']) {
                        return item.badge ? (item.badge.status === 'new') : false;
                    }
                }

                return false;
            },
            clamp(number, min, max) {
                if (number < min) {
                    return min;
                }
                if (number > max) {
                    return max;
                }
                return number;
            },
            numberOfPromotedActionsToRender() {
                if (!this.promotedActions) {
                    return 0;
                }

                if (this.containerWidth >= this.bulkActionsWidth || this.measuring) {
                    return this.promotedActions.length;
                }

                let sufficientSpace = false;
                let counter = this.promotedActions.length - 1;
                let totalWidth = 0;

                while (!sufficientSpace && counter >= 0) {
                    totalWidth += this.promotedActionsWidths[counter];
                    let widthWithRemovedAction = this.bulkActionsWidth - totalWidth + this.addedMoreActionsWidthForMeasuring;

                    if (this.containerWidth >= widthWithRemovedAction) {
                        sufficientSpace = true;
                    } else {
                        counter--;
                    }
                }

                return this.clamp(counter, 0, this.promotedActions.length);
            },
            toggleSmallScreenPopover() {
                this.smallScreenPopoverVisible = !this.smallScreenPopoverVisible;
            },
            toggleLargeScreenPopover() {
                this.largeScreenPopoverVisible = !this.largeScreenPopoverVisible;
            },
            instanceOfBulkActionListSectionArray(actions) {
                let validList = this.actions.filter((action) => {
                    return action.items;
                });

                return actions.length === validList.length;
            },
            instanceOfBulkActionArray(actions) {
                let validList = this.actions.filter((action) => {
                    return !action.items;
                });

                return actions.length === validList.length;
            },
            instanceOfMenuGroupDescriptor(action) {
                return 'title' in action;
            },
            handleMeasurement(width) {
                if (this.measuring) {
                    this.promotedActionsWidths.push(width);
                }
            },
        },
        beforeDestroy() {
            if (document.getElementById('PolarisPopover'+this['_uid']+'Overlay')) {
                document.getElementById('PolarisPopover' + this['_uid'] + 'Overlay').remove();
            }
        },
    }
</script>

<style scoped>

</style>
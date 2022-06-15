<template>
    <div :ref="id" class="Polaris-ActionMenu-Actions__ActionsLayout">
        <template v-for="(action, index) in overriddenActions">
            <template v-if="'title' in action">
                <div v-if="action.actions.length > 0" :key="`MenuGroup-${index}`">
                    <PActionMenuMenuGroup
                        :title="action.title"
                        :active="action.title === computedActiveMenuGroup"
                        :actions="[...computedHiddenActions, ...action.actions]"
                        v-bind="action"
                        :onAction="handleMenuGroupClose"
                        @open="handleMenuGroupToggle"
                        @close="handleMenuGroupClose"
                        :getOffsetWidth="handleActionsOffsetWidth"
                    />
                </div>
            </template>
            <PActionMenuMenuAction v-else-if="computedActionMenuMenuAction(action)" :key="`MenuAction-${index}`"
                                   :getOffsetWidth="handleActionsOffsetWidth" :content="action.content"
                                   v-bind="action"/>
        </template>
    </div>
</template>

<script>
    import utils from '../../../../utilities';
    import { uuid } from '../../../../ComponentHelpers';
    import { MenuActionDescriptor, MenuGroupDescriptor } from '../../../../types';
    import { sortAndOverrideActionOrder } from '../../../../components/PActionMenu/utilities';
    import { PActionMenuMenuGroup } from '../../../../components/PActionMenu/components/PActionMenuMenuGroup';
    import { PActionMenuMenuAction } from '../../../../components/PActionMenu/components/PActionMenuMenuAction';
    import ArrayValidator from '../../../../utilities/validators/ArrayValidator';

    const Props = {
        actions: {
            type: Object,
            properties: MenuActionDescriptor
        },
        groups: {
            type: Object,
            properties: MenuGroupDescriptor
        },
    }

    const ACTION_SPACING = 8;

    export default {
        name: 'PActionMenuActions',
        components: {
            PActionMenuMenuGroup, PActionMenuMenuAction,
        },
        props: {
            id: {
                type: [String, Number],
                default: `ActionMenuLayout${uuid()}`,
            },
            actions: {
                type: Array,
                ...ArrayValidator('actions', MenuActionDescriptor)
            },
            groups: {
                type: Array,
                ...ArrayValidator('actions', MenuGroupDescriptor)
            }
        },
        data() {
            return {
                activeMenuGroup: '',
                hiddenActions: [],
                showableActions: [],
                availableWidthRef: 0,
                timesMeasured: 0,
                actionsAndGroupsLengthRef: 0,
                actionWidthsRef: [],
            }
        },
        computed: {
            lastMenuGroupWidth() {
                return [...this.actionWidthsRef].pop() || 0;
            },

            lastMenuGroup() {
                return [...this.groups].pop();
            },

            /* Measure Variables End*/

            computedShowableActions: {
                get() {
                    return this.showableActions;
                },
                set(value) {
                    this.showableActions = value;
                }
            },

            computedHiddenActions: {
                get() {
                    return this.hiddenActions;
                },
                set(value) {
                    this.hiddenActions = value;
                }
            },

            computedActiveMenuGroup: {
                get() {
                    return this.activeMenuGroup;
                },
                set(value) {
                    this.activeMenuGroup = value;
                }
            },

            menuActions() {
                return [...this.actions, ...this.groups];
            },

            overriddenActions() {
                return sortAndOverrideActionOrder(this.menuActions);
            },
        },
        methods: {
            handleMenuGroupToggle(group) {
                if (typeof group === 'string') {
                    this.computedActiveMenuGroup = this.computedActiveMenuGroup ? undefined : group;
                }
            },
            handleMenuGroupClose() {
                this.computedActiveMenuGroup = undefined;
            },
            handleResize() {
                const actionsLayoutRef = this.$refs[this.id];
                if (actionsLayoutRef) {
                    this.availableWidthRef = actionsLayoutRef.offsetWidth;
                }

                // // Set timesMeasured to 0 to allow re-measuring
                this.timesMeasured = 0;
                this.measureActions();
            },
            handleActionsOffsetWidth(width) {
                this.actionWidthsRef = [...this.actionWidthsRef, width];
            },
            measureActions() {
                if (
                    this.actionWidthsRef.length === 0 ||
                    this.availableWidthRef === 0
                ) {
                    return;
                }

                const actionsAndGroups = [...this.actions, ...this.groups];

                if (actionsAndGroups.length === 1) {
                    this.showableActions = actionsAndGroups;
                    this.hiddenActions = [];
                    return;
                }

                let currentAvailableWidth = this.availableWidthRef;
                let newShowableActions = [];
                let newRolledUpActions = [];

                actionsAndGroups.forEach((action, index) => {
                    const canFitAction =
                        this.actionWidthsRef[index] +
                        0 + // menuGroupWidthRef.current
                        ACTION_SPACING +
                        this.lastMenuGroupWidth <=
                        currentAvailableWidth;

                    if (canFitAction) {
                        currentAvailableWidth -=
                            this.actionWidthsRef[index] + ACTION_SPACING * 2;
                        newShowableActions = [...newShowableActions, action];
                    } else {
                        currentAvailableWidth = 0;
                        // Find last group if it exists and always render it as a rolled up action below
                        if (action === this.lastMenuGroup) {
                            return;
                        }
                        newRolledUpActions = [...newRolledUpActions, action];
                    }
                });

                this.showableActions = newShowableActions;
                this.computedHiddenActions = newRolledUpActions;

                this.timesMeasured += 1;
                this.actionsAndGroupsLengthRef = actionsAndGroups.length;
            },
            computedActionMenuMenuAction(action) {
                return !this.computedHiddenActions.includes(action);
            },
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        [utils.destroyed]() {
            window.removeEventListener('resize', this.handleResize);
        },
    }
</script>

<template>
    <div :ref="refId" class="Polaris-ActionMenu-Actions__ActionsLayout">
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
    import { defineComponent, computed, ref, onUnmounted } from 'vue';
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

    export default defineComponent({
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
        setup(props) {
          let activeMenuGroup= ref('');
          let hiddenActions = ref([]);
          let showableActions = ref([]);
          let availableWidthRef = ref(0);
          let timesMeasured = ref(0);
          let actionsAndGroupsLengthRef = ref(0);
          let actionWidthsRef = ref([]);
          let refId = ref(props.id);

          const lastMenuGroupWidth = computed(() => {
            return [...actionWidthsRef].pop() || 0;
          });

          const lastMenuGroup = computed(() => {
            return [...props.groups].pop();
          });

          /* Measure Variables End*/
          const computedShowableActions = computed({
            get() {
              return showableActions.value;
            },
            set(value) {
              showableActions.value = value;
            }
          });

          const computedHiddenActions = computed({
            get() {
              return hiddenActions.value;
            },
            set(value) {
              hiddenActions.value = value;
            }
          });

          const computedActiveMenuGroup = computed({
            get() {
              return activeMenuGroup.value;
            },
            set(value) {
              activeMenuGroup.value = value;
            }
          });

          const menuActions = computed(() => {
            return [...props.actions, ...props.groups];
          });

          const overriddenActions = computed(() => {
            return sortAndOverrideActionOrder(menuActions.value);
          });

          function handleMenuGroupToggle(group) {
            if (typeof group === 'string') {
              computedActiveMenuGroup.value = computedActiveMenuGroup.value ? undefined : group;
            }
          }
          function handleMenuGroupClose() {
            computedActiveMenuGroup.value = undefined;
          }
          function handleResize() {
            const actionsLayoutRef = refId.value[props.id];
            if (actionsLayoutRef) {
              availableWidthRef.value = actionsLayoutRef.offsetWidth;
            }

            // // Set timesMeasured to 0 to allow re-measuring
            timesMeasured.value = 0;
            measureActions();
          }
          function handleActionsOffsetWidth(width) {
            actionWidthsRef.value = [...actionWidthsRef.value, width];
          }
          function measureActions() {
            if (
                actionWidthsRef.value.length === 0 ||
                availableWidthRef.value === 0
            ) {
              return;
            }

            const actionsAndGroups = [...props.actions, ...props.groups];

            if (actionsAndGroups.length === 1) {
              showableActions.value = actionsAndGroups;
              hiddenActions.value = [];
              return;
            }

            let currentAvailableWidth = availableWidthRef.value;
            let newShowableActions = [];
            let newRolledUpActions = [];

            actionsAndGroups.forEach((action, index) => {
              const canFitAction =
                  actionWidthsRef.value[index] +
                  0 + // menuGroupWidthRef.current
                  ACTION_SPACING +
                  lastMenuGroupWidth.value <=
                  currentAvailableWidth;

              if (canFitAction) {
                currentAvailableWidth -=
                    actionWidthsRef.value[index] + ACTION_SPACING * 2;
                newShowableActions = [...newShowableActions, action];
              } else {
                currentAvailableWidth = 0;
                // Find last group if it exists and always render it as a rolled up action below
                if (action === lastMenuGroup.value) {
                  return;
                }
                newRolledUpActions = [...newRolledUpActions, action];
              }
            });

            showableActions.value = newShowableActions;
            computedHiddenActions.value = newRolledUpActions;

            timesMeasured.value += 1;
            actionsAndGroupsLengthRef.value = actionsAndGroups.length;
          }
          function computedActionMenuMenuAction(action) {
            return !computedHiddenActions.value.includes(action);
          }

          /* Component created lifecycle hook */
          window.addEventListener('resize', handleResize);
          handleResize();

          onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
          });

          return {activeMenuGroup, hiddenActions, showableActions, availableWidthRef, timesMeasured, actionsAndGroupsLengthRef, actionWidthsRef,
            lastMenuGroupWidth, lastMenuGroup, menuActions, overriddenActions, computedShowableActions, computedHiddenActions, computedActiveMenuGroup, refId,
            handleMenuGroupToggle, handleMenuGroupClose, handleResize, measureActions, computedActionMenuMenuAction, handleActionsOffsetWidth};
        },
    })
</script>

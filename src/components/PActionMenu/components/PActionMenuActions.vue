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
      <PActionMenuMenuAction v-else-if="!computedHiddenActions.includes(action)" :key="`MenuAction-${index}`"
                             :getOffsetWidth="handleActionsOffsetWidth" :content="action.content" v-bind="action"/>
    </template>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {MenuActionDescriptor, MenuGroupDescriptor} from '@/types';
import {sortAndOverrideActionOrder} from '../utilities';
import PActionMenuMenuGroup from './PActionMenuMenuGroup.vue';
import PActionMenuMenuAction from './PActionMenuMenuAction.vue';

interface Props {
  actions?: MenuActionDescriptor[];
  groups?: MenuGroupDescriptor[];
}

const ACTION_SPACING = 8;
type MenuDescriptorWithIndex = (MenuActionDescriptor | MenuGroupDescriptor) & {
  index: number;
};

@Component({
  components: {
    PActionMenuMenuGroup,
    PActionMenuMenuAction,
  },
})

export default class PActionMenuActions extends Vue {

  @Prop({type: String, default: `ActionMenuLayout${new Date().getUTCMilliseconds()}`}) public id!: string;
  @Prop(Array) public actions!: MenuActionDescriptor[];
  @Prop(Array) public groups!: MenuGroupDescriptor[];

  /* Measure Variables Start*/
  public activeMenuGroup = '';
  public hiddenActions = [];
  public showableActions!: MenuActionDescriptor[];
  public availableWidthRef = 0;
  public timesMeasured = 0;
  public actionsAndGroupsLengthRef = 0;

  public actionWidthsRef: any[] = [];

  public get lastMenuGroupWidth() {
    return [...this.actionWidthsRef].pop() || 0;
  }

  public get lastMenuGroup() {
    return [...this.groups].pop();
  }

  /* Measure Variables End*/

  public get computedShowableActions() {
    return this.showableActions;
  }

  public set computedShowableActions(value: any) {
    this.showableActions = value;
  }

  public get computedHiddenActions() {
    return this.hiddenActions;
  }

  public set computedHiddenActions(value: any) {
    this.hiddenActions = value;
  }

  public get computedActiveMenuGroup() {
    return this.activeMenuGroup;
  }

  public set computedActiveMenuGroup(value: any) {
    this.activeMenuGroup = value;
  }

  public get menuActions() {
    return [...this.actions, ...this.groups];
  }

  public get overriddenActions() {
    return sortAndOverrideActionOrder(this.menuActions);
  }

  public handleMenuGroupToggle(group: string) {
    this.computedActiveMenuGroup = this.computedActiveMenuGroup ? undefined : group;
  }

  public handleMenuGroupClose() {
    this.computedActiveMenuGroup = undefined;
  }

  public mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  public destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  public handleResize() {
    const actionsLayoutRef = this.$refs[this.id] as HTMLElement;
    this.availableWidthRef = actionsLayoutRef.offsetWidth;

    // // Set timesMeasured to 0 to allow re-measuring
    this.timesMeasured = 0;
    this.measureActions();
  }

  public handleActionsOffsetWidth(width) {
    this.actionWidthsRef = [...this.actionWidthsRef, width];
  }

  public measureActions() {
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
    let newShowableActions: MenuActionDescriptor[] = [];
    let newRolledUpActions: (MenuActionDescriptor[] | MenuGroupDescriptor[]) = [];

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
  }
}
</script>

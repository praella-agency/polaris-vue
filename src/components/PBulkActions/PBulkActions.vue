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
                            :active="smallScreenPopoverVisible"
                            @close="toggleSmallScreenPopover()"
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
                                :active="largeScreenPopoverVisible"
                                @close="toggleLargeScreenPopover()"
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

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { BulkAction } from '@/components/PIndexTable/utilities';
  import { PButtonGroup } from '@/components/PButtonGroup';
  import { PCheckableButton } from '@/components/PCheckableButton';
  import { PPopover } from '@/components/PPopover';
  import { PActionList } from '@/components/PActionList';
  import { PButton } from '@/components/PButton';
  import { Action, ActionListSection, MenuGroupDescriptor } from '@/types';
  import PBulkActionMenu from '@/components/PBulkActions/components/PBulkActionMenu.vue';
  import PBulkActionButton from '@/components/PBulkActions/components/PBulkActionButton.vue';
  import { classNames } from '@/utilities/css';

  @Component({
    components: {
      PCheckableButton, PButtonGroup, PPopover, PBulkActionButton, PActionList, PButton, PBulkActionMenu,
    }
  })
  export default class PBulkActions extends Vue {
    /**
     * Visually hidden text for screen readers
     */
    @Prop({type: String, default: null}) public accessibilityLabel!: string;

    /**
     * Whether to render the small screen BulkActions or not
     */
    @Prop({type: Boolean, default: false}) public smallScreen!: boolean;

    /**
     * Label for the bulk actions
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * State of the bulk actions checkbox
     */
    @Prop({type: [Boolean, String], default: false}) public selected!: boolean | 'indeterminate';

    /**
     * List is in a selectable state
     */
    @Prop({type: Boolean, default: false}) public selectMode!: boolean;

    /**
     * Actions that will be given more prominence
     */
    @Prop({type: Array, default: () => ([])}) public promotedActions!: (BulkAction | MenuGroupDescriptor)[];

    /**
     * List of actions
     */
    @Prop({type: Array, default: () => ([])}) public actions!: (BulkAction | ActionListSection)[];

    /**
     * Text to select all across pages
     */
    @Prop({type: String, default: null}) public paginatedSelectAllText!: string;

    /**
     * Action for selecting all across pages
     */
    @Prop({type: Object, default: () => ({})}) public paginatedSelectAllAction!: Action;

    /**
     * Disables bulk actions
     */
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    /**
     * Indeterminate checkbox
     */
    @Prop({type: Boolean, default: false}) public indeterminate!: boolean;

    public measuring = false;
    public smallScreenPopoverVisible = false;
    public largeScreenPopoverVisible = false;
    public containerWidth = 0;
    public bulkActionsWidth = 0;
    public promotedActionsWidths: number[] = [];
    public addedMoreActionsWidthForMeasuring = 0;

    public get largeScreenGroupClassName() {
      return classNames(
        'Polaris-BulkActions__Group',
        'Polaris-BulkActions__Group--largeScreen',
        this.measuring && 'Polaris-BulkActions__Group--measuring',
        this.selectMode && 'Polaris-BulkActions__Group--entered',
        !this.selectMode && 'Polaris-BulkActions__Group--exited',
      );
    }

    public get smallScreenGroupClassName() {
      return classNames(
        'Polaris-BulkActions__Group',
        'Polaris-BulkActions__Group--smallScreen',
      );
    }

    public get hasActions() {
      return Boolean(
        (this.promotedActions ? this.promotedActions.length > 0 : false) ||
        (this.actions ? this.actions.length > 0 : false),
      );
    }

    public get activatorLabel() {
      return !this.promotedActions || (this.promotedActions && this.numberOfPromotedActionsToRender() === 0
            && this.measuring) ? 'Actions' : 'More actions';
    }

    public get combinedActions() {
      if (this.actionSections && this.rolledInPromotedActions.length > 0) {
        return [...this.rolledInPromotedActions, ...this.actionSections];
      } else if (this.actionSections) {
        return this.actionSections;
      } else if (this.rolledInPromotedActions.length > 0) {
        return [...this.rolledInPromotedActions];
      }
    }

    public isNewBadgeInBadgeActions() {
      let actions = this.actionSections;
      if (!actions) {
        return false;
      }

      for (let action of actions) {
        for (let item of action['items']) {
          return item.badge ? (item.badge.status === 'new') : false;
        }
      }

      return false;
    }

    public clamp(number: number, min: number, max: number) {
      if (number < min) {
        return min;
      }
      if (number > max) {
        return max;
      }
      return number;
    }

    public numberOfPromotedActionsToRender() {
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
    }

    public get promotedActionsMarkup() {
      let actions: (BulkAction | MenuGroupDescriptor)[] = [];
      [...this.promotedActions].slice(0, this.numberOfPromotedActionsToRender()).map((action) => {
        actions.push(action);
      });

      return actions;
    }

    public toggleSmallScreenPopover() {
      this.smallScreenPopoverVisible = !this.smallScreenPopoverVisible;
    }

    public toggleLargeScreenPopover() {
      this.largeScreenPopoverVisible = !this.largeScreenPopoverVisible;
    }

    public instanceOfBulkActionListSectionArray(actions: (BulkAction | ActionListSection)[]) {
      let validList = this.actions.filter((action: any) => {
        return action.items;
      });

      return actions.length === validList.length;
    }

    public instanceOfBulkActionArray(actions: (BulkAction | ActionListSection)[]) {
      let validList = this.actions.filter((action: any) => {
        return !action.items;
      });

      return actions.length === validList.length;
    }

    public get actionSections() {
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
    }

    public instanceOfMenuGroupDescriptor(action: MenuGroupDescriptor | BulkAction): action is MenuGroupDescriptor {
      return 'title' in action;
    }

    public handleMeasurement = (width: number) => {
      if (this.measuring) {
        this.promotedActionsWidths.push(width);
      }
    }

    public get rolledInPromotedActions() {
      let numberOfPromotedActionsToRender = this.numberOfPromotedActionsToRender();

      if (!this.promotedActions || this.promotedActions.length === 0 ||
        numberOfPromotedActionsToRender >= this.promotedActions.length) {
        return [];
      }

      let rolledInPromotedActions = this.promotedActions.map((action) => {
        if (this.instanceOfMenuGroupDescriptor(action)) {
          return {
            items: [...action.actions]
          }
        }

        return {
          items: [action]
        }
      });

      return rolledInPromotedActions.slice(numberOfPromotedActionsToRender);
    }
  }
</script>

<style scoped>

</style>
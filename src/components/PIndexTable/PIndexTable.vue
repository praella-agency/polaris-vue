<template>
    <div class="Polaris-IndexTable">
        <template v-if="!shouldShowBulkActions && !condensed && loading">
            <transition>
                <div class="Polaris-IndexTable__LoadingPanel">
                    <div class="Polaris-IndexTable__LoadingPanelRow">
                        <PSpinner size="small">
                            <span class="Polaris-IndexTable__LoadingPanelText">
                                {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
                            </span>
                        </PSpinner>
                    </div>
                </div>
            </transition>
        </template>
        <template v-if="itemCount > 0">
            <template v-if="condensed">

                <div
                    :class="stickyTableClassName"
                    role="presentation"
                >
                    <div
                        v-if="shouldShowBulkActions"
                        :class="bulkActionClassName"
                        :data-condensed="condensed"
                    >
                        <template v-if="!shouldShowBulkActions && !condensed && loading">
                            <transition>
                                <div class="Polaris-IndexTable__LoadingPanel">
                                    <div class="Polaris-IndexTable__LoadingPanelRow">
                                        <PSpinner size="small">
                                        <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </PSpinner>
                                    </div>
                                </div>
                            </transition>
                        </template>
                        <PBulkActions
                            :smallScreen="condensed"
                            :label="`${selectedItemsCountLabel} selected`"
                            :accessibilityLabel="bulkActionAccessiblityLable"
                            :selected="bulkSelectState"
                            :selectMode="selectMode || isSmallScreenSelectable"
                            @toggleAll="handleTogglePage"
                            :promotedActions="(!condensed || selectedItemsCount) ? promotedBulkActions : []"
                            :actions="(!condensed || selectedItemsCount) ? bulkActions : []"
                            :paginatedSelectAllText="paginatedSelectAllText"
                            :paginatedSelectAllAction="paginatedSelectAllAction"
                            @selectModeToggle="condensed ? handleSelectModeToggle : undefined"
                        />
                    </div>
                    <div
                        v-else-if="condensed"
                        :class="headerMarkupClassName"
                    >
                        <template v-if="!shouldShowBulkActions && !condensed && loading">
                            <transition>
                                <div class="Polaris-IndexTable__LoadingPanel">
                                    <div class="Polaris-IndexTable__LoadingPanelRow">
                                        <PSpinner size="small">
                                        <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </PSpinner>
                                    </div>
                                </div>
                            </transition>
                        </template>
                        <slot name="sort"/>
                        <PButton
                            v-if="selectable"
                            icon="EnableSelectionMinor"
                            @click="toggleIsSmallScreenSelectable"
                        >
                            Select
                        </PButton>
                    </div>
                    <div
                        v-else
                        :class="stickyHeaderClassName"
                        ref="stickyHeaderWrapperElement"
                    >
                        <template v-if="!shouldShowBulkActions && !condensed && loading">
                            <transition>
                                <div class="Polaris-IndexTable__LoadingPanel">
                                    <div class="Polaris-IndexTable__LoadingPanelRow">
                                        <PSpinner size="small">
                                        <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </PSpinner>
                                    </div>
                                </div>
                            </transition>
                        </template>
                        <div
                            :class="stickyColumnHeaderClassName"
                        >
                            <div
                                class="Polaris-IndexTable__TableHeading"
                                :key="headings[0].title"
                                :style="stickyColumnHeaderStyle"
                                data-index-table-sticky-heading
                            >
                                <PStack
                                    spacing="none"
                                    :wrap="false"
                                    alignment="center"
                                >
                                    <PStackItem v-if="selectable">
                                        <div
                                            class="Polaris-IndexTable-FirstStickyHeaderElement"
                                            ref="firstStickyHeaderElement"
                                        >
                                            <div
                                                class="Polaris-IndexTable__ColumnHeaderCheckboxWrapper"
                                            >
                                                <PCheckbox
                                                    :label="`Select all ${resourceName.plural}`"
                                                    labelHidden
                                                    @change="handleSelectPage"
                                                    :checked="bulkSelectState"
                                                />
                                            </div>
                                        </div>
                                    </PStackItem>
                                    <PStackItem v-if="selectable">
                                        <div
                                            class="Polaris-IndexTable-StickyTableHeading-second-scrolling"
                                        >
                                            <PStack
                                                v-if="headings[0].new"
                                                :wrap="false"
                                                alignment="false"
                                            >
                                                <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                </PStackItem>
                                                <PStackItem>
                                                    <PBadge status="new">
                                                        new
                                                    </PBadge>
                                                </PStackItem>
                                            </PStack>
                                            <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                {{ headings[0].title }}
                                            </span>
                                            <template v-else>
                                                {{ headings[0].title }}
                                            </template>
                                        </div>
                                    </PStackItem>
                                    <PStackItem v-if="!selectable">
                                        <div
                                            class="Polaris-IndexTable-FirstStickyHeaderElement"
                                            ref="firstStickyHeaderElement"
                                        >
                                            <PStack
                                                v-if="headings[0].new"
                                                :wrap="false"
                                                alignment="false"
                                            >
                                                <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                </PStackItem>
                                                <PStackItem>
                                                    <PBadge status="new">
                                                        new
                                                    </PBadge>
                                                </PStackItem>
                                            </PStack>
                                            <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                {{ headings[0].title }}
                                            </span>
                                            <template v-else>
                                                {{ headings[0].title }}
                                            </template>
                                        </div>
                                    </PStackItem>
                                </PStack>
                            </div>
                        </div>
                        <div
                            class="Polaris-IndexTable__StickyTableHeadings"
                            ref="stickyHeaderElement"
                        >
                            <template
                                v-for="(heading, index) in headings"
                            >
                                <div
                                    :class="stickyHeadingClassName(index)"
                                    :style="headingStyle(index + 1)"
                                    :key="heading.title"
                                    data-index-table-sticky-heading
                                >
                                    <PStack
                                        v-if="heading.new"
                                        :wrap="false"
                                        alignment="false"
                                    >
                                        <PStackItem>
                                            <span>
                                                {{ heading.title }}
                                            </span>
                                        </PStackItem>
                                        <PStackItem>
                                            <PBadge status="new">
                                                new
                                            </PBadge>
                                        </PStackItem>
                                    </PStack>
                                    <span v-else-if="heading.hidden" class="Polaris-VisuallyHidden">
                                        {{ heading.title }}
                                    </span>
                                    <template v-else>
                                        {{ heading.title }}
                                    </template>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <ul
                    :data-selectmode="Boolean(selectMode || isSmallScreenSelectable)"
                    class="Polaris-IndexTable__CondensedList"
                    ref="condensedListElement"
                >
                    <slot/>
                </ul>
            </template>
            <template v-else>

                <div
                    :class="stickyTableClassName"
                    role="presentation"
                >
                    <div
                        v-if="shouldShowBulkActions"
                        :class="bulkActionClassName"
                        :data-condensed="condensed"
                    >
                        <template v-if="!shouldShowBulkActions && !condensed && loading">
                            <transition>
                                <div class="Polaris-IndexTable__LoadingPanel">
                                    <div class="Polaris-IndexTable__LoadingPanelRow">
                                        <PSpinner size="small">
                                        <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </PSpinner>
                                    </div>
                                </div>
                            </transition>
                        </template>
                        <PBulkActions
                            :smallScreen="condensed"
                            :label="`${selectedItemsCountLabel} selected`"
                            :accessibilityLabel="bulkActionAccessiblityLable"
                            :selected="bulkSelectState"
                            :selectMode="selectMode || isSmallScreenSelectable"
                            @toggleAll="handleTogglePage"
                            :promotedActions="(!condensed || selectedItemsCount) ? promotedBulkActions : []"
                            :actions="(!condensed || selectedItemsCount) ? bulkActions : []"
                            :paginatedSelectAllText="paginatedSelectAllText"
                            :paginatedSelectAllAction="paginatedSelectAllAction"
                            @selectModeToggle="condensed ? handleSelectModeToggle : undefined"
                        />
                    </div>
                    <div
                        v-else-if="condensed"
                        :class="headerMarkupClassName"
                    >
                        <template v-if="!shouldShowBulkActions && !condensed && loading">
                            <transition>
                                <div class="Polaris-IndexTable__LoadingPanel">
                                    <div class="Polaris-IndexTable__LoadingPanelRow">
                                        <PSpinner size="small">
                                        <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </PSpinner>
                                    </div>
                                </div>
                            </transition>
                        </template>
                        <slot name="sort"/>
                        <PButton
                            v-if="selectable"
                            icon="EnableSelectionMinor"
                            @click="toggleIsSmallScreenSelectable"
                        >
                            Select
                        </PButton>
                    </div>
                    <div
                        v-else
                        :class="stickyHeaderClassName"
                        ref="stickyHeaderWrapperElement"
                    >
                        <template v-if="!shouldShowBulkActions && !condensed && loading">
                            <transition>
                                <div class="Polaris-IndexTable__LoadingPanel">
                                    <div class="Polaris-IndexTable__LoadingPanelRow">
                                        <PSpinner size="small">
                                        <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </PSpinner>
                                    </div>
                                </div>
                            </transition>
                        </template>
                        <div
                            :class="stickyColumnHeaderClassName"
                        >
                            <div
                                class="Polaris-IndexTable__TableHeading"
                                :key="headings[0].title"
                                :style="stickyColumnHeaderStyle"
                                data-index-table-sticky-heading
                            >
                                <PStack
                                    spacing="none"
                                    :wrap="false"
                                    alignment="center"
                                >
                                    <PStackItem v-if="selectable">
                                        <div
                                            class="Polaris-IndexTable-FirstStickyHeaderElement"
                                            ref="firstStickyHeaderElement"
                                        >
                                            <div
                                                class="Polaris-IndexTable__ColumnHeaderCheckboxWrapper"
                                            >
                                                <PCheckbox
                                                    :label="`Select all ${resourceName.plural}`"
                                                    labelHidden
                                                    @change="handleSelectPage"
                                                    :checked="bulkSelectState"
                                                />
                                            </div>
                                        </div>
                                    </PStackItem>
                                    <PStackItem v-if="selectable">
                                        <div
                                            class="Polaris-IndexTable-StickyTableHeading-second-scrolling"
                                        >
                                            <PStack
                                                v-if="headings[0].new"
                                                :wrap="false"
                                                alignment="false"
                                            >
                                                <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                </PStackItem>
                                                <PStackItem>
                                                    <PBadge status="new">
                                                        new
                                                    </PBadge>
                                                </PStackItem>
                                            </PStack>
                                            <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                {{ headings[0].title }}
                                            </span>
                                            <template v-else>
                                                {{ headings[0].title }}
                                            </template>
                                        </div>
                                    </PStackItem>
                                    <PStackItem v-if="!selectable">
                                        <div
                                            class="Polaris-IndexTable-FirstStickyHeaderElement"
                                            ref="firstStickyHeaderElement"
                                        >
                                            <PStack
                                                v-if="headings[0].new"
                                                :wrap="false"
                                                alignment="false"
                                            >
                                                <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                </PStackItem>
                                                <PStackItem>
                                                    <PBadge status="new">
                                                        new
                                                    </PBadge>
                                                </PStackItem>
                                            </PStack>
                                            <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                {{ headings[0].title }}
                                            </span>
                                            <template v-else>
                                                {{ headings[0].title }}
                                            </template>
                                        </div>
                                    </PStackItem>
                                </PStack>
                            </div>
                        </div>
                        <div
                            class="Polaris-IndexTable__StickyTableHeadings"
                            ref="stickyHeaderElement"
                        >
                            <template
                                v-for="(heading, index) in headings"
                            >
                                <div
                                    :class="stickyHeadingClassName(index)"
                                    :style="headingStyle(index + 1)"
                                    :key="heading.title"
                                    data-index-table-sticky-heading
                                >
                                    <PStack
                                        v-if="heading.new"
                                        :wrap="false"
                                        alignment="false"
                                    >
                                        <PStackItem>
                                            <span>
                                                {{ heading.title }}
                                            </span>
                                        </PStackItem>
                                        <PStackItem>
                                            <PBadge status="new">
                                                new
                                            </PBadge>
                                        </PStackItem>
                                    </PStack>
                                    <span v-else-if="heading.hidden" class="Polaris-VisuallyHidden">
                                        {{ heading.title }}
                                    </span>
                                    <template v-else>
                                        {{ heading.title }}
                                    </template>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <table
                    ref="tableElement"
                    :class="tableClassName"
                >
                    <thead>
                        <tr
                            v-for="(heading, key) in headings"
                            :key="key"
                        >
                            {{ heading.title }}
                        </tr>
                    </thead>
                    <tbody
                        ref="tableBodyRef"
                    >
                        <slot/>
                    </tbody>
                </table>
            </template>
        </template>
        <template v-else>
            <div
                class="Polaris-IndexTable__EmptySearchResultWrapper"
            >
                <slot name="emptyState">
                    <PEmptySearchResult
                        :title="`No ${resourceName.plural} found`"
                        description="Try changing the filters or search term"
                        withIllustration
                    ></PEmptySearchResult>
                </slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
  import { PSpinner } from '../PSpinner';
  import { PButton } from '../PButton';
  import { PEmptySearchResult } from '../PEmptySearchResult';
  import { PStack, PStackItem } from '../PStack';
  import { PCheckbox } from '../PCheckbox';
  import { PBadge } from '../PBadge';
  import { BulkActionsProps, IndexTableHeading } from '@/components/PIndexTable/utilities';
  import { PBulkActions } from '@/components/PBulkActions';
  import { classNames } from '@/utilities/css';

  interface TableHeadingRect {
    offsetWidth: number;
    offsetLeft: number;
  }

  @Component({
    components: {
      PBulkActions, PEmptySearchResult, PSpinner, PButton, PStack, PStackItem, PCheckbox, PBadge,
    }
  })
  export default class PIndexTable extends Vue {
    @Prop({type: Array, default: () => ([])}) public headings!: IndexTableHeading[];

    @Prop({type: Array, default: () => ([])}) public promotedBulkActions!: BulkActionsProps[];

    @Prop({type: Array, default: () => ([])}) public bulkActions!: BulkActionsProps['actions'][];

    @Prop({type: Array, default: () => ({})}) public resourceName!: {
      plural: string,
      singular: string,
    };

    @Prop({type: Boolean, default: false}) public lastColumnSticky!: boolean;

    @Prop({type: Boolean, default: false}) public selectable!: boolean;

    @Prop({type: Boolean, default: false}) public condensed!: boolean;

    @Prop({type: Boolean, default: false}) public loading!: boolean;

    @Prop({type: [String, Number], default: null}) public selectedItemsCount!: 'All' | number;

    @Prop({type: Number, default: 0}) public itemCount!: number;

    @Ref() public tableHeadingRect!: TableHeadingRect[];

    public bulkActionsSelectable = Boolean(this.promotedBulkActions.length > 0 || this.bulkActions.length > 0);
    public isSmallScreenSelectable = false;
    public selectMode = false;
    public hasMoreLeftColumns = false;
    public isSticky = false;

    public created() {
      window.addEventListener('resize', this.isSmallScreen);
      this.isSmallScreen();
    }

    public destroyed() {
      window.removeEventListener('resize', this.isSmallScreen);
    }

    public isSmallScreen() {
      return typeof window === 'undefined' ? false : window.innerWidth < 458;
    }

    public get tableClassName() {
      return classNames(
        'Polaris-IndexTable__Table',
        this.hasMoreLeftColumns && 'Polaris-IndexTable__Table--scrolling',
        this.selectMode && 'Polaris-IndexTable--disableTextSelection',
        this.selectMode && this.shouldShowBulkActions && 'Polaris-IndexTable--selectMode',
      );
    }

    public get stickyTableClassName() {
      return classNames(
        'Polaris-IndexTable__StickyTable',
        this.condensed && 'Polaris-IndexTable__StickyTable--condensed',
      );
    }

    public get stickyHeaderClassName() {
      return classNames(
        'Polaris-IndexTable__StickyTableHeader',
        this.isSticky && 'Polaris-IndexTable__StickyTableHeader--isSticky',
      );
    }

    public get bulkActionClassName() {
      return classNames(
        'Polaris-IndexTable__BulkActionsWrapper',
        this.condensed && 'Polaris-IndexTable__StickyTableHeader--condensed',
        this.isSticky && 'Polaris-IndexTable__StickyTableHeader--isSticky',
      );
    }

    public get headerMarkupClassName() {
      return classNames(
        'Polaris-IndexTable__HeaderWrapper',
      );
    }

    public get stickyColumnHeaderClassName() {
      return classNames(
        'Polaris-IndexTable__StickyTableColumnHeader',
        this.hasMoreLeftColumns && 'Polaris-IndexTable__StickyTableColumnHeader--isScrolling',
      );
    }
    public get shouldShowBulkActions() {
      return (this.bulkActionsSelectable && this.selectedItemsCount) || this.isSmallScreenSelectable;
    }

    public get selectedItemsCountLabel() {
      return this.selectedItemsCount === 'All' ? `${this.itemCount}+` : this.selectedItemsCount;
    }

    public get stickyColumnHeaderStyle() {
      return this.tableHeadingRect && this.tableHeadingRect.length > 0 ? {
        minWidth: this.calculateFirstHeaderOffset()
      } : undefined;
    }

    public calculateFirstHeaderOffset() {
      if (!this.selectable) {
        return this.tableHeadingRect[0].offsetWidth;
      }

      return this.condensed
        ? this.tableHeadingRect[0].offsetWidth
        : this.tableHeadingRect[0].offsetWidth + this.tableHeadingRect[1].offsetWidth;
    }

    public handleTogglePage() {

    }

    public handleSelectModeToggle(val: boolean) {
    }

    public toggleIsSmallScreenSelectable() {
      this.isSmallScreenSelectable = !this.isSmallScreenSelectable;
    }

    public handleSelectPage(checked: boolean) {
    }

    public headingStyle(position) {
      return this.tableHeadingRect && this.tableHeadingRect.length > position
        ? {
          minWidth: this.tableHeadingRect[position].offsetWidth
        } : undefined;
    }

    public stickyHeadingClassName(index) {
      return classNames(
        'Polaris-IndexTable__TableHeading',
        index === 0 && 'Polaris-IndexTable-StickyTableHeading-second',
        index === 0 && !this.selectable && 'unselectable'
      );
    }
  }
</script>

<style scoped>

</style>
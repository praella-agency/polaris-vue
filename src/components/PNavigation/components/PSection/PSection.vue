<template>
  <ul :class="className">
    <li v-if="title" class="Polaris-Navigation__SectionHeading">
      <span class="Polaris-Navigation__Text">{{title}}</span>
      <button
          v-if="Object.keys(action).length > 0"
          type="button"
          class="Polaris-Navigation__Action"
          :aria-label="action.accessibilityLabel"
          @click="action.onClick"
      >
        <PIcon :source="action.icon"/>
      </button>
    </li>
    <PItem
        v-for="(sectionItem, key) in sectionItems"
        :key="key"
        :label="sectionItem.label"
        :subNavigationItems="sectionItem.subNavigationItems"
        @click="handleClick(sectionItem.onClick, sectionItem.subNavigationItems.length > 0)"
        v-bind="sectionItem"
    />
    <li
        v-if="Object.keys(rollup).length > 0 && additionalItems.length > 0"
        class="Polaris-Navigation__RollupSection"
    >
      <PCollapsible
          :id="`AdditionalItems#${this['uid']}`"
          :open="expanded"
      >
        <ul
            class="Polaris-Navigation__List"
        >
          {{ additionalItems }}
        </ul>
      </PCollapsible>
      <div
          v-if="Object.keys(rollup).length > 0 && items.length > rollup.after"
          class="Polaris-Navigation__ListItem"
          :key="`List Item`"
      >
        <button
            type="button"
            class="Polaris-Navigation__Item Polaris-Navigation__RollupToggle"
            @click="toggleExpanded"
            :aria-label="Object.keys(rollup).length > 0 && (expanded ? rollup.hide : rollup.view)"
            :testID="`ToggleViewAll`"
        >
          <span class="Polaris-Navigation__Icon">
            <PIcon source="HorizontalDotsMinor"/>
          </span>
        </button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
  import { PItem } from '@/components/PNavigation/components/PItem';
  import { PIcon } from '@/components/PIcon';
  import { PCollapsible } from '@/components/PCollapsible';
  import { classNames } from '@/utilities/css';

  interface ItemURLDetails {
    url?: string;
    matches?: boolean;
    exactMatch?: boolean;
    matchPaths?: string[];
    excludePaths?: string[];
    external?: boolean;
  }

  export interface SubNavigationItem extends ItemURLDetails {
    url: string;
    label: string;
    disabled?: boolean;
    new?: boolean;

    onClick?(): void;
  }

  interface SecondaryAction {
    url: string;
    accessibilityLabel: string;
    icon: string;
  }

  export interface ItemProps extends ItemURLDetails {
    icon?: string;
    label: string;
    disabled?: boolean;
    accessibilityLabel?: string;
    selected?: boolean;
    exactMatch?: boolean;
    new?: boolean;
    subNavigationItems?: SubNavigationItem[];
    secondaryAction?: SecondaryAction;

    onClick?(): void;
  }

  const noWindowMatches: MediaQueryList = {
    media: '',
    addListener: () => {},
    removeListener: () => {},
    matches: false,
    onchange: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: (_: Event) => true,
  };

  const Breakpoints = {
    navigationBarCollapsed: '768px',
    stackedContent: '1043px',
  };

  @Component({
    components: {
      PItem, PIcon, PCollapsible,
    }
  })
  export default class PSection extends Vue {
    @Prop({type: Array, default: null}) public items!: ItemProps[];
    @Prop({type: String, default: null}) public icon!: string;
    @Prop({type: String, default: null}) public title!: string;
    @Prop({type: Boolean, default: false}) public fill!: boolean;
    @Prop({
      type: Object,
      default: () => ({})
    }) public rollup!: {
      after: number;
      view: string;
      hide: string;
      activePath: string;
    };
    @Prop({
      type: Object,
      default: () => ({})
    }) public action!: {
      icon: string;
      accessibilityLabel: string;
      onClick(): void;
    };
    @Prop({type: Boolean, default: false}) public separator!: boolean;

    @Ref() public animationFrame: number | null = null;

    @Watch('animationFrame')
    public onAnimationFrameChanged(value) {
      return value && cancelAnimationFrame(value);
    }

    public itemsMarkup = this.items;
    public additionalItems = Object.keys(this.rollup).length > 0 ? this.itemsMarkup.slice(this.rollup.after) : [];
    public expanded = false;

    public get sectionItems() {
      return Object.keys(this.rollup).length > 0
        ? this.itemsMarkup.slice(0, this.rollup.after)
        : this.itemsMarkup;
    }

    public get className() {
      return classNames(
        'Polaris-Navigation__Section',
        this.separator && 'Polaris-Navigation__Section--withSeparator',
        this.fill && 'Polaris-Navigation__Section--fill',
      );
    }

    public navigationBarCollapsed() {
      return typeof window === 'undefined'
        ? noWindowMatches
        : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
    }

    public toggleExpanded() {
      this.expanded = !this.expanded;
    }

    public handleClick(
      onClick: ItemProps['onClick'],
      hasSubNavItems: boolean,
    ) {
      if (onClick) {
        onClick();
      }

      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }

      if (!hasSubNavItems || this.navigationBarCollapsed().matches) {
        this.animationFrame = requestAnimationFrame(() => {
            this.expanded = false;
          }
        );
      }
    }
  }
</script>

<style scoped>

</style>
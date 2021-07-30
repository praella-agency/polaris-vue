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
  </ul>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
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

    public itemMarkup = this.items;

    public get sectionItems() {
      return (Object.keys(this.rollup).length > 0)
        ? this.itemMarkup.slice(0, this.rollup.after)
        : this.itemMarkup;
    }

    public get className() {
      return classNames(
        'Polaris-Navigation__Section',
        this.separator && 'Polaris-Navigation__Section--withSeparator',
        this.fill && 'Polaris-Navigation__Section--fill',
      );
    }
  }
</script>

<style scoped>

</style>
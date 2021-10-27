<template>
    <component
        :is="condensed ? 'li' : 'tr'"
        :key="id"
        :class="rowClassName"
        @mouseenter="setHoverIn"
        @mouseleave="setHoverOut"
        @click="handleRowClick"
        :ref="tableRowCallbackRef"
    >
        <PIndexTableCheckbox
            v-if="selectable"
            :condensed="condensed"
            :itemId="id"
            :selected="selected"
            @interaction="handleInteraction"
        />
        <slot/>
    </component>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';
  import PIndexTableCheckbox from '@/components/PIndexTable/components/PIndexTableCheckbox/PIndexTableCheckbox.vue';

  enum SelectionType {
    All = 'all',
    Page = 'page',
    Multi = 'multi',
    Single = 'single',
  }

  @Component({
    components: {
      PIndexTableCheckbox,
    }
  })
  export default class PIndexTableRow extends Vue {
    @Prop({type: [String, Number], required: true}) public id!: string | number;

    @Prop({type: Boolean, default: false}) public selected!: boolean;

    @Prop({type: Number, default: 0}) public position!: number;

    @Prop({type: Boolean, default: false}) public subdued!: boolean;

    @Prop({type: String, default: null}) public status!: 'success' | 'subdued';

    @Prop({type: Boolean, default: true}) public selectable!: boolean;

    @Prop({type: Boolean, default: false}) public condensed!: boolean;

    @Prop({type: Boolean, default: false}) public selectMode!: boolean;

    @Prop({type: Boolean, default: true}) public clickable!: boolean;

    @Ref() public primaryLinkElement!: HTMLAnchorElement;

    @Ref() public tableRowRef!: HTMLTableRowElement & HTMLLIElement;

    public isNavigating = false;

    public hovered = false;

    public get rowClassName() {
      return classNames(
        'Polaris-IndexTable__TableRow',
        this.selectable && this.condensed && 'Polaris-IndexTable--condensedRow',
        this.selected && 'Polaris-IndexTable__TableRow--selected',
        this.subdued && 'Polaris-IndexTable__TableRow--subdued',
        this.hovered && 'Polaris-IndexTable__TableRow--hovered',
        this.status && 'Polaris-IndexTable--' + variationName('status', this.status),
        (!this.selectable || this.primaryLinkElement) && 'TableRow-unclickable',
      );
    }

    public setHoverIn() {
      this.hovered = true;
    }

    public setHoverOut() {
      this.hovered = false;
    }

    public handleRowClick(event: MouseEvent) {
      if (!this.clickable) {
        this.$emit('navigation', this.id);
        return;
      }

      if (this.selectable || this.primaryLinkElement) {
        event.preventDefault();
        event.stopPropagation();

        if (this.primaryLinkElement && !this.selectMode) {
          this.isNavigating = true;
          let ctrlKey = event.ctrlKey;
          let metaKey = event.metaKey;

          this.$emit('navigation', this.id);

          if ((ctrlKey || metaKey) && this.primaryLinkElement instanceof HTMLAnchorElement) {
            this.isNavigating = false;
            window.open(this.primaryLinkElement.href, '_blank');
            return;
          }

          this.primaryLinkElement.dispatchEvent(new MouseEvent(event.type));
        } else {
          this.isNavigating = false;
          this.handleInteraction(event);
        }
      }
    }

    public handleInteraction(event: MouseEvent) {
      event.stopPropagation();

      let selectionType = event.shiftKey ? SelectionType.Multi : SelectionType.Single;

      this.$emit('selectionChange', selectionType, !this.selected, this.id, this.position);
    }

    public tableRowCallbackRef(node) {
      this.tableRowRef = node;
      let el = node.querySelector('[data-primary-link]');

      if (el) {
        this.primaryLinkElement = el;
      }
    }
  }
</script>

<style scoped>

</style>
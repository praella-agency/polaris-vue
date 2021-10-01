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
        <PTableCheckbox
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
  import PTableCheckbox from '@/components/PIndexTable/components/PTableCheckbox/PTableCheckbox.vue';

  enum SelectionType {
    All = 'all',
    Page = 'page',
    Multi = 'multi',
    Single = 'single',
  }

  @Component({
    components: {
      PTableCheckbox,
    }
  })
  export default class PRow extends Vue {
    @Prop({type: [String, Number], required: true}) public id!: string | number;

    @Prop({type: Boolean, default: false}) public selected!: boolean;

    @Prop({type: Number, default: 0}) public position!: number;

    @Prop({type: Boolean, default: false}) public subdued!: boolean;

    @Prop({type: String, default: null}) public status!: 'success' | 'subdued';

    @Ref() public primaryLinkElement!: HTMLAnchorElement;

    @Ref() public tableRowRef!: HTMLTableRowElement & HTMLLIElement;

    public condensed = false;
    public selectMode = false;
    public selectable = false;
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
        !this.selectable && this.primaryLinkElement && 'TableRow-unclickable',
      );
    }

    public setHoverIn() {
      this.hovered = true;
    }

    public setHoverOut() {
      this.hovered = false;
    }

    public handleRowClick(event: MouseEvent) {
      if (this.selectable || this.primaryLinkElement) {
        if (!this.tableRowRef || this.isNavigating) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.primaryLinkElement && !this.selectMode) {
          this.isNavigating = true;
          let ctrlKey = event.ctrlKey;
          let metaKey = event.metaKey;

          if (this.$emit('navigation', this.id)) {

          }

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
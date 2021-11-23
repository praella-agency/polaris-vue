<template>
    <component
        :is="condensed ? 'transition' : 'td'"
        :class="!condensed ? checkboxClassName : ''"
        :ref="!condensed ? checkboxNode : ''">
        <div
            class="Polaris-IndexTable-Checkbox__TableCellContentContainer"
        >
            <div
                :class="wrapperClassName"
                @click="handleClick"
                @change="stopPropagation"
            >
                <PCheckbox
                    :id="itemId"
                    :label="`Select ${resourceName.singular}`"
                    labelHidden
                    :checked="selected"
                />
            </div>
        </div>
    </component>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PCheckbox } from '@/components/PCheckbox/index.js';

  @Component({
    components: {
      PCheckbox,
    },
  })
  export default class PIndexTableCheckbox extends Vue {
    @Prop({type: Boolean, default: false}) public condensed!: boolean;
    @Prop({type: [String, Number], default: null}) public itemId!: string | number;
    @Prop({type: Object, default: () => ({})}) public resourceName!: {
      plural: string,
      singular: string,
    };
    @Prop({type: Boolean, default: false}) public selected!: boolean;

    @Ref() public checkboxNode!: HTMLTableDataCellElement;

    @Watch('checkboxNode')
    public onCheckboxNodeChanged(value) {
      if (!value) {
        return;
      }

      window.addEventListener('resize', this.handleResize);

      return window.removeEventListener('resize', this.handleResize);
    }

    @Watch('handleResize')
    public onHandleResizeChanged(value) {
      this.handleResize();
    }

    public get checkboxClassName() {
      return classNames(
        'Polaris-IndexTable__TableCell',
        'Polaris-IndexTable__TableCell--first',
      );
    }

    public get wrapperClassName() {
      return classNames(
        'Polaris-IndexTable-Checkbox__Wrapper',
        this.condensed ? 'Polaris-IndexTable-Checkbox--condensed' : 'Polaris-IndexTable-Checkbox--expanded',
      );
    }

    public handleResize() {
      if (!this.checkboxNode) {
        return;
      }

      const {width} = this.checkboxNode.getBoundingClientRect();
      this.checkboxNode.style.setProperty('--p-checkbox-offset', width + 'px');
    }

    public stopPropagation(event: MouseEvent | KeyboardEvent) {
      event.stopPropagation();
      event.preventDefault();
    }

    public handleClick(event) {
      if (event.target.tagName === 'INPUT') {
        this.$emit('interaction', event);
      }
    }
  }
</script>

<style scoped>

</style>
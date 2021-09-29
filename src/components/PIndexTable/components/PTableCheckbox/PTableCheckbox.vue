<template>
    <td :class="checkboxClassName" :ref="checkboxNode">
        <div
            class="Polaris-IndexTable-Checkbox__TableCellContentContainer"
        >
            <div
                :class="wrapperClassName"
                @click="$emit('interaction')"
                @keyup="$emit('interaction')"
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
    </td>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PCheckbox } from '@/components/PCheckbox';

  @Component({
    components: {
      PCheckbox,
    }
  })
  export default class PTableCheckbox extends Vue {
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

      let {width} = this.checkboxNode.getBoundingClientRect();
      this.checkboxNode.style.setProperty('--p-checkbox-offset', width + 'px');
    }

    public stopPropagation(event: MouseEvent | KeyboardEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
</script>

<style scoped>

</style>
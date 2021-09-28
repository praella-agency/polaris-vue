<template>
    <div
        :class="className"
        @click="$emit('toggleAll')"
    >
        <div
            class="Polaris-CheckableButton__Checkbox"
        >
            <PCheckbox
                :label="accessibilityLabel"
                labelHidden
                :checked="selected"
                :disabled="disabled"
                @change="$emit('toggleAll')"
                ref="checkBoxRef"
            />
        </div>
        <span class="Polaris-CheckableButton__Label">
            {{ label }}
        </span>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PCheckbox } from '../PCheckbox';
  import { CheckboxHandles } from '@/types';

  @Component({
    components: {
      PCheckbox,
    }
  })
  export default class PCheckableButton extends Vue {
    @Prop({type: String, default: null}) public accessibilityLabel!: string;
    @Prop({type: String, default: null}) public label!: string;
    @Prop({type: [Boolean, String], default: false}) public selected!: boolean | 'indeterminate';
    @Prop({type: Boolean, default: false}) public selectMode!: boolean;
    @Prop({type: Boolean, default: false}) smallScreen!: boolean;
    @Prop({type: Boolean, default: false}) public plain!: boolean;
    @Prop({type: Boolean, default: false}) public measuring!: boolean;
    @Prop({type: Boolean, default: false}) public disabled?: boolean;

    public currentKey: 'plain' | 'bulkSm' | 'bulkLg' = 'bulkLg';

    @Watch('plain')
    public onPlainChanged(value) {
      if (value) {
        this.currentKey = 'plain';
      }
    }

    @Watch('smallScreen')
    public onSmallScreenChanged(value) {
      if (value === true) {
        this.currentKey = 'bulkSm';
      }
    }

    public get className() {
      if (this.plain) {
        return classNames(
          'Polaris-CheckableButton',
          'Polaris-CheckableButton__CheckableButton--plain',
        );
      } else {
        return classNames(
          'Polaris-CheckableButton',
          this.selectMode && 'Polaris-CheckableButton__CheckableButton--selectMode',
          this.selected && 'Polaris-CheckableButton__CheckableButton--selected',
          this.measuring && 'Polaris-CheckableButton__CheckableButton--measuring',
        );
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <fieldset :class="className" :id="finalName" :aria-invalid="this.error !== null">
    <legend class="Polaris-ChoiceList__Title" v-if="title">
      {{ title }}
    </legend>
    <ul class="Polaris-ChoiceList__Choices">
      <li v-for="(choice, key) in options" :key="key">
        <component
            :is="allowMultiple ? 'PCheckbox' : 'PRadioButton'"
            :name="allowMultiple ? (finalName + key) : finalName"
            :id="finalName + key"
            :label="choice[textField]"
            :value="choice[valueField]"
            :disabled="choice[disabledField] || disabled"
            :checked="choiceIsSelected(choice, selected)"
            :helpText="choice[helpTextField]"
            :aria-describedby="error && choice[describedByErrorField] ? (finalName + key) : null"
            @change="handleChange"
        />
        <div :id="finalName + key"
             v-if="renderChildren[choice[valueField]] && choice[renderChildrenField]"
             class="Polaris-ChoiceList__ChoiceChildren">
          <slot/>
        </div>
      </li>
    </ul>
    <div v-if="error" class="Polaris-ChoiceList__ChoiceError">
      <PInlineError :message="error" :fieldID="finalName"/>
    </div>
  </fieldset>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';
import {PCheckbox} from '../PCheckbox';
import {PRadioButton} from '../PRadioButton';
import {PInlineError} from '../PInlineError';

@Component({
  components: {
    PCheckbox, PRadioButton, PInlineError,
  },
})
export default class PChoiceList extends Vue {
  /**
   * Label for list of choices
   */
  @Prop({type: String, default: null}) public title!: string;

  /**
   * Collection of choices
   */
  @Prop({type: Array, default: () => ([])}) public options!: [];

  /**
   * Field name in the `options` array that should be used for the text label
   */
  @Prop({type: String, default: null}) public textField!: string;

  /**
   * Field name in the `options` array that should be used for the value
   */
  @Prop({type: String, default: null}) public valueField!: string;

  /**
   * Field name in the `options` array that should be used for the disabled state
   */
  @Prop({type: String, default: null}) public disabledField!: string;

  /**
   * Field name in the `options` array that should be used for the help text
   */
  @Prop({type: String, default: null}) public helpTextField!: string;

  /**
   * Field name in the `options` array that should be used for the error message
   */
  @Prop({type: String, default: null}) public describedByErrorField!: string;

  /**
   * Field name in the `options` array that should be used for the enable child rendering
   */
  @Prop({type: String, default: null}) public renderChildrenField!: string;

  /**
   * Collection of selected choice
   */
  @Prop({type: Array, default: () => ([])}) public selected!: string[];

  /**
   * Name for form input
   */
  @Prop({type: String, default: `PolarisChoiceList${new Date().getUTCMilliseconds()}`}) public name!: string;

  /**
   * Allow multiple
   */
  @Prop({type: Boolean, default: true}) public allowMultiple!: boolean;

  /**
   * Toggles display of the title
   */
  @Prop({type: Boolean, default: false}) public titleHidden!: boolean;

  /**
   * Display an error message
   */
  @Prop({type: String, default: null}) public error!: string;

  /**
   * Disable all choices
   */
  @Prop({type: Boolean, default: false}) public disabled!: boolean;

  public renderChildren = {};

  public get className() {
    return classNames(
        'Polaris-ChoiceList',
        this.titleHidden && 'Polaris-ChoiceList--titleHidden',
    );
  }

  public get finalName() {
    return this.allowMultiple ? `${this.name}Multiple` : this.name;
  }

  public choiceIsSelected(choice, selected: string[]) {
    return selected.includes(choice[this.valueField]);
  }

  public handleChange(checked: boolean) {
    for (let [key, choice] of Object.entries(this.options)) {
      if (checked && (choice[this.valueField] === checked['value'])) {
        this.$emit(
            'change',
            this.updateSelectedChoices(choice, checked['checked'], this.selected, this.allowMultiple)
        );
      }
    }
  }

  public updateSelectedChoices(
      choice,
      checked: boolean,
      selected: string[],
      allowMultiple = false,
  ) {
    // if (checked) {
    //     if (allowMultiple) {
    //         if(selected.indexOf(choice[this.valueField]) === -1) {
    //             selected.push(choice[this.valueField]);
    //         }
    //     } else {
    //         selected.splice(0, this.selected.length);
    //         selected.push(choice[this.valueField]);
    //     }
    // }
    // else {
    //     if (allowMultiple) {
    //         if(selected.indexOf(choice[this.valueField]) > -1) {
    //             selected.splice(this.selected.indexOf(choice[this.valueField]), 1);
    //         }
    //     } else {
    //         selected.splice(0, this.selected.length);
    //     }
    // }
    if (checked) {
      console.log(allowMultiple);
      return allowMultiple ? [...selected, choice[this.valueField]] : [choice[this.valueField]];
    }
    console.log(choice, JSON.stringify(selected));
    // return selected;
    return selected.filter((selectedChoice) => selectedChoice !== choice);
  }
}
</script>

<style scoped>

</style>
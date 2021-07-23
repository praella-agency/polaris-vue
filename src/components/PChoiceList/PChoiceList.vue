<template>
    <fieldset :class="className" :id="finalName" :aria-invalid="this.error !== null">
        <legend class="Polaris-ChoiceList__Title" v-if="title">
            {{ title }}
        </legend>
        <ul class="Polaris-ChoiceList__Choices">
            <li v-for="(choice, key) in choices" :key="key">
                <component
                    :is="allowMultiple ? 'PCheckbox' : 'PRadioButton'"
                    :name="allowMultiple ? (finalName + key) : finalName"
                    :id="finalName + key"
                    :label="choice[choiceLabel]"
                    :value="choice[choiceValue]"
                    :disabled="choice[choiceDisabled] || disabled"
                    :checked="choiceIsSelected(choice, selected)"
                    :helpText="choice[choiceHelpText]"
                    :aria-describedby="error && choice[choiceDescribedByError] ? (finalName + key) : null"
                    @change="handleChange"
                />
                <div :id="finalName + key"
                     v-if="renderChildren[choice[choiceValue]]"
                     class="Polaris-ChoiceList__ChoiceChildren">
                    <slot />
                </div>
            </li>
        </ul>
        <div v-if="error" class="Polaris-ChoiceList__ChoiceError">
            <PInlineError :message="error" :fieldID="finalName" />
        </div>
    </fieldset>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator';
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
    @Prop({type: Array, default: () => ([])}) public choices!: [];

    /**
     * Label for the choice
     */
    @Prop({type: String, default: null}) public choiceLabel!: string;

    /**
     * Value for the choice
     */
    @Prop({type: String, default: null}) public choiceValue!: string;

    /**
     * Disable choice
     */
    @Prop({type: String, default: null}) public choiceDisabled!: string;

    /**
     * Additional text to aid in use
     */
    @Prop({type: String, default: null}) public choiceHelpText!: string;

    /**
     * Indicates that the choice is aria-describedBy the error message
     */
    @Prop({type: String, default: null}) public choiceDescribedByError!: string;

    /**
     * Indicates that the choice is aria-describedBy the error message
     */
    @Prop({type: String, default: null}) public choiceRenderChildren!: string;

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
      return selected.includes(choice[this.choiceValue]);
    }

    public handleChange(checked: boolean) {
      for (let [key, choice] of Object.entries(this.choices)) {
        if (checked && (choice[this.choiceValue] === checked['value'])) {
          this.$emit(
            'change',
            [this.updateSelectedChoices(choice, checked, this.allowMultiple), this.name]
          );
        }
      }
  }

    public updateSelectedChoices(
      choice,
      checked: boolean,
      allowMultiple = false,
    ) {
      if (checked['checked'] === true) {
        this.$set(this.renderChildren, choice[this.choiceValue], true);
        if (allowMultiple) {
          if(this.selected.indexOf(choice[this.choiceValue]) === -1) {
            return this.selected.push(choice[this.choiceValue]);
          }
        } else {
          this.selected.splice(0, this.selected.length);
          return this.selected.push(choice[this.choiceValue]);
        }
      } else {
        this.$set(this.renderChildren, choice[this.choiceValue], false);
        if (allowMultiple) {
          if(this.selected.indexOf(choice[this.choiceValue]) > -1) {
            return this.selected.splice(this.selected.indexOf(choice[this.choiceValue]), 1);
          }
        } else {
          return this.selected.splice(0, this.selected.length);
        }
      }

      return this.selected.filter((selectedChoice) => selectedChoice !== choice);
    }
  }
</script>

<style scoped>

</style>
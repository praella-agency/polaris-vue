<template>
    <div :class="className">
        <div v-if="label" :class="labelClassName">
            <PLabel
                    :id="id"
                    :requiredIndicator="requiredIndicator"
                    :hidden="false"
                    v-bind="$attrs"
            >
                {{ label }}
            </PLabel>
            <div
                    v-if="action"
                    :class="actionClassName"
            >
                <PButton
                        plain
                        v-on="action.onAction ? { click: action.onAction } : {}"
                >
                    {{ action.content }}
                </PButton>
            </div>
        </div>
        <slot/>
        <div
                v-if="error && (typeof error !== 'boolean')"
                :class="errorClass"
        >
            <PInlineError :message="error" :fieldID="id"/>
        </div>
        <div
                v-if="helpText"
                :class="helpTextClassName"
                :id="helpTextID"
        >
            {{ helpText }}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {PLabel} from '@/components/PLabel';
import {PButton} from '@/components/PButton';
import {PInlineError} from '@/components/PInlineError';
import {Action} from '@/types';
import {classNames} from '@/utilities/css';

@Component({
  components: {
    PLabel, PButton, PInlineError,
  },
})
export default class PLabelled extends Vue {
  /**
   * A unique identifier for the label
   */
  @Prop({type: [String, Number], default: null}) public id!: string | number;

  /**
   * Text for the label
   */
  @Prop({type: String, default: null}) public label!: string;

  /**
   * Error to display beneath the label
   */
  @Prop({type: Boolean, default: false}) public error?: boolean;

  /**
   * An action
   */
  @Prop({type: Function}) public action!: Action;

  /**
   * Additional hint text to display
   */
  @Prop({type: String, default: null}) public helpText!: string;

  /**
   * Visually hide the label
   */
  @Prop({type: Boolean, default: false}) public labelHidden!: boolean;

  /**
   * Visual required indicator for the label
   */
  @Prop({type: Boolean, default: false}) public requiredIndicator!: boolean;

  public get className() {
    return classNames(
      this.labelHidden && 'Polaris-Labelled--hidden',
    );
  }

  public get labelClassName() {
    return classNames(
      'Polaris-Labelled__LabelWrapper',
    );
  }

  public get actionClassName() {
    return classNames(
      'Polaris-Labelled__Action',
    );
  }

  public get errorClass() {
    return classNames(
      'Polaris-Labelled__Error',
    );
  }

  public get helpTextClassName() {
    return classNames(
      'Polaris-Labelled__HelpText',
    );
  }

  public get helpTextID() {
    return this.id + 'HelpText';
  }
}
</script>

<style scoped>

</style>
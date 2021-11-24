<template>
  <div>
    <!--
      Triggered on click
      @event click
    -->
    <label :class="className" :for="id" @click="$emit('click', $event)">
      <span class="Polaris-Choice__Control">
      <!-- @slot Title for choice control -->
        <slot/>
      </span>
      <span class="Polaris-Choice__Label">
        <slot v-if="$slots.label" name="label" />
        <template v-else>{{ label }}</template>
      </span>
    </label>
    <div v-if="typeof error === 'string' || helpText || $slots.helpText"
         class="Polaris-Choice__Descriptions">
      <PFieldError v-if="typeof error === 'string'" :error="error"/>
      <div v-if="helpText || $slots.helpText"
           class="Polaris-Choice__HelpText"
           :id="id+'HelpText'">
        <slot name="helpText">{{ helpText }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { classNames } from '../../utilities/css';
import {PFieldError} from '../../components/PFieldError/index.js';

export default {
    name: 'PChoice',
    components: {
        PFieldError,
    },
    props: {
        /**
         * ID for form input
         */
        id: {
            type: [String, Number],
            required: true,
        },
        /**
         * Label for the checkbox
         */
        label: {
            type: String,
        },
        /**
         * Disable input
         */
        disabled: {
            type: Boolean,
        },
        /**
         * Visually hide the label
         */
        labelHidden: {
            type: Boolean,
        },
        /**
         * Additional text to aide in use
         */
        helpText: {
            type: String,
        },
        /**
         * Display an error message
         */
        error: {
            type: [String, Boolean],
        },
    },
    computed: {
        className() {
            return classNames(
                'Polaris-Choice',
                this.labelHidden && 'Polaris-Choice--labelHidden',
                this.disabled && 'Polaris-Choice--disabled',
            );
        },
    },
}
</script>

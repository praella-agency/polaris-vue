<template>
    <div>
        <!--
          Triggered on click
          @event click
        -->
        <label :class="className" :for="id" @click="emit('click', $event)">
            <span class="Polaris-Choice__Control">
                <!-- @slot Title for choice control -->
                <slot/>
            </span>
            <span class="Polaris-Choice__Label">
                <slot name="label">
                    {{ label }}
                </slot>
            </span>
        </label>
        <div
            v-if="typeof error === 'string' || helpText || isSlot($slots.helpText)"
            class="Polaris-Choice__Descriptions"
        >
            <PFieldError v-if="typeof error === 'string'" :error="error"/>
            <div
                v-if="helpText || isSlot($slots.helpText)"
                class="Polaris-Choice__HelpText"
                :id="id+'HelpText'"
            >
                <slot name="helpText">
                    {{ helpText }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, useSlots } from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PFieldError } from '../../components/PFieldError';

    let props = defineProps({
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
    });
    const emit = defineEmits(['click']);
    let slots = useSlots();

    let className = computed(() => {
        return classNames(
            'Polaris-Choice',
            props.labelHidden && 'Polaris-Choice--labelHidden',
            props.disabled && 'Polaris-Choice--disabled',
        );
    });

    let isSlot = computed(() => {
        return hasSlot;
    });
</script>

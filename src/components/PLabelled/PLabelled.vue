<template>
    <div :class="className">
        <div v-if="label" class="Polaris-Labelled__LabelWrapper">
            <PLabel
                :id="id"
                :requiredIndicator="requiredIndicator"
                :hidden="false"
                v-bind="$attrs"
            >
                <slot name="label">
                    {{ label }}
                </slot>
            </PLabel>
            <div
                v-if="action"
                class="Polaris-Labelled__Action"
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
            class="Polaris-Labelled__Error"
        >
            <PInlineError :message="error" :fieldID="id"/>
        </div>
        <div
            v-if="helpText"
            class="Polaris-Labelled__HelpText"
            :id="helpTextID"
        >
            <slot name="helpText">
                {{ helpText }}
            </slot>
        </div>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { Action } from '../../types';
    import { PLabel } from '../../components/PLabel';
    import { PButton } from '../../components/PButton';
    import { PInlineError } from '../../components/PInlineError';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';

    export default {
        name: 'PLabelled',
        components: {
            PLabel, PButton, PInlineError,
        },
        props: {
            /**
             * A unique identifier for the label
             */
            id: {
                type: [String, Number],
                default: null,
            },
            /**
             * Text for the label
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Error to display beneath the label
             */
            error: {
                type: Boolean,
                default: false,
            },
            /**
             * An action
             */
            action: {
                type: Object,
                ...ObjectValidator('action', Action),
            },
            /**
             * Additional hint text to display
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * Visually hide the label
             */
            labelHidden: {
                type: Boolean,
                default: false,
            },
            /**
             * Visual required indicator for the label
             */
            requiredIndicator: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    this.labelHidden && 'Polaris-Labelled--hidden',
                );
            },
            helpTextID() {
                return this.id + 'HelpText';
            },
        },
    }
</script>

<style scoped>

</style>
<template>
    <div :class="className">
        <div
            v-if="!floatingLabel && (label || emptyLabel || $slots.hasOwnProperty('label'))"
            class="Polaris-Labelled__LabelWrapper"
            :class="labelClass"
        >
            <!-- @slot Field label -->
            <slot name="label">
                <div class="Polaris-Label">
                    <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text" v-html="emptyLabel?'&nbsp':label"/>
                </div>
            </slot>
        </div>

        <PConnected v-if="connected">
            <template v-if="$slots.hasOwnProperty('connectedLeft')" slot="left">
                <!-- @slot An element connected to the left of the input -->
                <slot name="connectedLeft">{{ connectedLeft }}</slot>
            </template>

            <template slot="right" v-if="$slots.hasOwnProperty('connectedRight')">
                <!-- @slot An element connected to the right of the input -->
                <slot name="connectedRight">{{ connectedRight }}</slot>
            </template>

            <PInput v-bind="[$attrs, $props]" v-on="$listeners" :hasError="!!error" :id="id">
                <!-- @slot Field prefix -->
                <slot name="prefix" slot="prefix"></slot>
                <!-- @slot Field suffix -->
                <slot name="suffix" slot="suffix"></slot>
            </PInput>
        </PConnected>

        <PInput
            v-else
            v-bind="[$attrs, $props]"
            v-on="$listeners"
            :hasError="!!error"
            :id="id"
            :floatingLabel="floatingLabel"
            :label="label"
        >
            <slot name="prefix" slot="prefix"></slot>
            <slot name="label" slot="label"></slot>
            <slot name="suffix" slot="suffix"></slot>
        </PInput>
        <div class="Polaris-Labelled__HelpText" v-if="helpText">{{ helpText }}</div>
        <!-- @slot Customize Error -->
        <slot name="error">
            <PFieldError v-if="error" :error="error"/>
        </slot>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PInput } from '../../components/PTextField/components/PInput';
    import { PConnected } from '../../components/PConnected';
    import { PFieldError } from '../../components/PFieldError';
    import StringValidator from "../../utilities/validators/StringValidator";

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">A text field is an input field that merchants can type into. It has a range of options and supports
     *  several text formats including numbers.</h4>
     */
    export default {
        name: 'PTextField',
        components: {
            PInput, PConnected, PFieldError,
        },
        props: {
            /**
             * Text field label
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Text field id
             */
            id: {
                type: [String, Number],
                default: `PolarisTextField${new Date().getUTCMilliseconds()}`,
            },
            /**
             * Text field label class
             */
            labelClass: {
                type: String,
                default: null,
            },
            /**
             * Text field help text
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * Text field connected to left
             */
            connectedLeft: {
                type: String,
                default: null,
            },
            /**
             * Text field connected to right
             */
            connectedRight: {
                type: String,
                default: null,
            },
            /**
             * Text field is connected
             */
            connected: {
                type: Boolean,
                default: false,
            },
            /**
             * Text field has error
             */
            error: {
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
             * Visually hide the label
             */
            emptyLabel: {
                type: Boolean,
                default: false,
            },
            /**
             * Enable rich text editor
             */
            richEditor: {
                type: Boolean,
                default: false,
            },
            /**
             * Show a clear text button in the input
             */
            clearable: {
                type: Boolean,
                default: false,
            },
            /**
             * **For input type:- file**
             *
             * A Boolean which, if present, indicates that the user may choose more than one file
             */
            multiple: {
                type: Boolean,
                default: false,
            },
            /**
             * **For input type:- file**
             *
             * One or more unique file type specifiers describing file types to allow
             */
            accept: {
                type: String,
                default: null,
            },
            /**
             * Determine type of input
             */
            type: {
                type: String,
            },
            /**
             * Create beautifully simple form labels that float over your input fields
             */
            floatingLabel: {
                type: Boolean,
                default: false,
            },
            /**
             * Disable editing of the input
             */
            readOnly: {
                type: Boolean,
            },
        },
        computed: {
            className() {
                return classNames(
                    this.computedLabelHidden && 'Polaris-Labelled--hidden',
                    (this.floatingLabel && (!this.richEditor && this.type !== 'file')) && 'Polaris-Floating',
                );
            },
            labelClassName() {
                return classNames(
                    !this.floatingLabel && `Polaris-Labelled__LabelWrapper`,
                );
            },
            computedLabelHidden() {
                return this.floatingLabel || this.labelHidden;
            }
        },
        methods: {
            handleInput(value) {
                /**
                 * Get inserted data
                 */
                this.$emit('input', value);
            },
        },
    }
</script>

<style>
    .ck.ck-editor {
        position: relative;
        width: 100%;
    }
</style>
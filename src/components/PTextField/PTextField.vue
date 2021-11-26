<template>
    <div :class="labelHidden && 'Polaris-Labelled--hidden'">
        <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel || $slots.hasOwnProperty('label')"
             :class="labelClass">
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

            <PInput v-bind="[$attrs, $props]" v-on="$listeners" :hasError="!!error" :id="id" @input="handleInput">
                <!-- @slot Field prefix -->
                <slot name="prefix" slot="prefix"></slot>
                <!-- @slot Field suffix -->
                <slot name="suffix" slot="suffix"></slot>
            </PInput>
        </PConnected>

        <PInput v-else v-bind="[$attrs,$props]" v-on="$listeners" :hasError="!!error" :id="id">
            <slot name="prefix" slot="prefix"></slot>
            <slot name="suffix" slot="suffix"></slot>
        </PInput>
        <div class="Polaris-Labelled__HelpText" v-if="helpText">{{ helpText }}</div>
        <PFieldError v-if="error" :error="error"/>
    </div>
</template>

<script>
    import { PInput } from '../../components/PTextField/components/PInput';
    import { PConnected } from '../../components/PConnected';
    import { PFieldError } from '../../components/PFieldError/index.js';

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
             * @values true | false
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
             * @values true | false
             */
            labelHidden: {
                type: Boolean,
                default: false,
            },
            /**
             * Visually hide the label
             * @values true | false
             */
            emptyLabel: {
                type: Boolean,
                default: false,
            },
            /**
             * Enable rich text editor
             * @values true | false
             */
            richEditor: {
                type: Boolean,
                default: false,
            },
            /**
             * Show a clear text button in the input
             * @values true | false
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
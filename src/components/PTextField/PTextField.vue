<template>
    <div :class="className">
        <div
            v-if="!floatingLabel && (label || emptyLabel || hasSlot($slots.label))"
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
            <template #left v-if="hasSlot($slots.connectedLeft)">
                <!-- @slot An element connected to the left of the input -->
                <slot name="connectedLeft">
                    {{ connectedLeft }}
                </slot>
            </template>

            <template #right v-if="hasSlot($slots.connectedRight)">
                <!-- @slot An element connected to the right of the input -->
                <slot name="connectedRight">
                    {{ connectedRight }}
                </slot>
            </template>

            <PInput
                v-bind="$attrs"
                v-on="listeners"
                :hasError="!!error"
                :id="id"
                :floatingLabel="floatingLabel"
                :label="label"
                :labelClass="labelClass"
                :helpText="helpText"
                :connectedLeft="connectedLeft"
                :connected="connected"
                :error="error"
                :labelHidden="labelHidden"
                :emptyLabel="emptyLabel"
                :richEditor="richEditor"
                :clearable="clearable"
                :multiple="multiple"
                :accept="accept"
                :type="type"
                :readOnly="readOnly"
                :prefix="prefix"
                @input="handleInput"
            >
                <template #prefix v-if="$attrs.prefix || hasSlot($slots.prefix)">
                    <!-- @slot Field prefix -->
                    <slot name="prefix"></slot>
                </template>
                <template #suffix v-if="$attrs.suffix || hasSlot($slots.suffix)">
                    <!-- @slot Field suffix -->
                    <slot name="suffix"></slot>
                </template>
            </PInput>
        </PConnected>

        <PInput
            v-else
            v-bind="$attrs"
            v-on="listeners"
            :hasError="!!error"
            :id="id"
            :floatingLabel="floatingLabel"
            :label="label"
            :labelClass="labelClass"
            :helpText="helpText"
            :connectedLeft="connectedLeft"
            :connected="connected"
            :error="error"
            :labelHidden="labelHidden"
            :emptyLabel="emptyLabel"
            :richEditor="richEditor"
            :clearable="clearable"
            :multiple="multiple"
            :accept="accept"
            :type="type"
            :readOnly="readOnly"
            :prefix="prefix"
            @input="handleInput"
        >
            <template #prefix v-if="$attrs.prefix || hasSlot($slots.prefix)">
                <slot name="prefix"></slot>
            </template>
            <template #label>
                <slot name="label"></slot>
            </template>
            <template #suffix v-if="$attrs.suffix || hasSlot($slots.suffix)">
                <slot name="suffix"></slot>
            </template>
        </PInput>
        <div class="Polaris-Labelled__HelpText" v-if="helpText">
            {{ helpText }}
        </div>
        <!-- @slot Customize Error -->
        <slot name="error">
            <PFieldError v-if="error" :error="error"/>
        </slot>
    </div>
</template>

<script>
    import utils from '../../utilities';
    import { hasSlot, uuid } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PInput } from '../../components/PTextField/components/PInput';
    import { PConnected } from '../../components/PConnected';
    import { PFieldError } from '../../components/PFieldError';

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
                default: `PolarisTextField${uuid()}`,
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
             * Element to display before the input
             */
            prefix: {
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
        emits: ['input', 'update:value', 'update:modelValue'],
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
            },
            listeners() {
                if (utils.isVue2) {
                    return this.$listeners;
                }
                return {};
            },
            hasSlot() {
                return hasSlot;
            },
        },
        methods: {
            handleInput(value) {
                /**
                 * Get inserted data
                 */
                this.$emit('input', value);
                /**
                 * Get inserted data
                 * @ignore
                 */
                this.$emit('update:value', value);
                /**
                 * Get inserted data
                 * @ignore
                 */
                this.$emit('update:modelValue', value);
            },
        },
    }
</script>


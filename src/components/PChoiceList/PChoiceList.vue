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
                    <!-- @slot Render children -->
                    <slot/>
                </div>
            </li>
        </ul>
        <div v-if="error" class="Polaris-ChoiceList__ChoiceError">
            <PInlineError :message="error" :fieldID="finalName"/>
        </div>
    </fieldset>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PCheckbox } from '../../components/PCheckbox';
    import { PRadioButton } from '../../components/PRadioButton';
    import { PInlineError } from '../../components/PInlineError';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">A choice list lets you create a list of grouped radio buttons or checkboxes. Use this component if you
     *  need to group together a related list of interactive choices.</h4>
     */
    export default {
        name: 'PChoiceList',
        components: {
            PCheckbox, PRadioButton, PInlineError,
        },
        props: {
            /**
             * Label for list of choices
             */
            title: {
                type: String,
                default: null,
            },
            /**
             * Collection of choices
             */
            options: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Field name in the `options` array that should be used for the text label
             */
            textField: {
                type: String,
                default: 'label',
            },
            /**
             * Field name in the `options` array that should be used for the value
             */
            valueField: {
                type: String,
                default: 'value',
            },
            /**
             * Field name in the `options` array that should be used for the disabled state
             */
            disabledField: {
                type: String,
                default: 'disabled',
            },
            /**
             * Field name in the `options` array that should be used for the help text
             */
            helpTextField: {
                type: String,
                default: 'helpText',
            },
            /**
             * Field name in the `options` array that should be used for the error message
             */
            describedByErrorField: {
                type: String,
                default: null,
            },
            /**
             * Field name in the `options` array that should be used for the enable child rendering
             */
            renderChildrenField: {
                type: String,
                default: null,
            },
            /**
             * Collection of selected choice
             */
            selected: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Name for form input
             */
            name: {
                type: String,
                default: `PolarisChoiceList${new Date().getUTCMilliseconds()}`,
            },
            /**
             * Allow multiple
             */
            allowMultiple: {
                type: Boolean,
                default: true,
            },
            /**
             * Toggles display of the title
             */
            titleHidden: {
                type: Boolean,
                default: false,
            },
            /**
             * Display an error message
             */
            error: {
                type: String,
                default: null,
            },
            /**
             * Disable all choices
             */
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                renderChildren: {},
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-ChoiceList',
                    this.titleHidden && 'Polaris-ChoiceList--titleHidden',
                );
            },
            finalName() {
                return this.allowMultiple ? `${this.name}Multiple` : this.name;
            },
        },
        methods: {
            choiceIsSelected(choice, selected) {
                return selected.includes(choice[this.valueField]);
            },
            handleChange(checked) {
                /* tslint:disable-next-line */
                for (let [key, choice] of Object.entries(this.options)) {
                    /* tslint:disable-next-line */
                    if (checked && (choice[this.valueField] === checked['value'])) {
                        /**
                         * Triggers when selection is change
                         */
                        this.$emit(
                            'change',
                            /* tslint:disable-next-line */
                            this.updateSelectedChoices(choice, checked['checked'], this.selected, this.allowMultiple)
                        );
                    }
                }
            },
            updateSelectedChoices(choice, checked, selected, allowMultiple = false) {
                if (checked) {
                    return allowMultiple ? [...selected, choice[this.valueField]] : [choice[this.valueField]];
                }

                return selected.filter((selectedChoice) => selectedChoice !== choice);
            }
        },
    }
</script>

<style scoped>

</style>
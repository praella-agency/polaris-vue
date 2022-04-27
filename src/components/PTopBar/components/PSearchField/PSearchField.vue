<template>
    <div :class="className">
        <input
            :id="`SearchField${uuid}`"
            class="Polaris-TopBar-SearchField__Input"
            :placeholder="placeholder"
            type="search"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            ref="input"
            v-model="computedValue"
            @input="handleChange"
            @keydown="preventDefault"
        />
        <span class="Polaris-TopBar-SearchField__Icon">
            <PIcon source="SearchMinor"/>
        </span>
        <button
            v-if="inputValue !== ''"
            type="button"
            aria-label="Clear"
            class="Polaris-TopBar-SearchField__Clear"
            @click="handleClear"
            @blur="handleBlur"
            @focus="handleFocus"
        >
            <PIcon source="CircleCancelMinor"/>
        </button>
        <div
            :class="divClassName"
        />
    </div>
</template>

<script>
    import utils from '../../../../utilities';
    import { uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';

    export default {
        name: 'PSearchField',
        components: {
            PIcon,
        },
        props: {
            /**
             * Initial value for the input
             */
            value: {
                type: String,
                required: true,
            },
            /**
             * Initial value for the input
             */
            modelValue: {
                type: String,
                required: true,
            },
            /**
             * Hint text to display
             */
            placeholder: {
                type: String,
                default: null,
            },
            /**
             * Force the focus state on the input
             */
            focused: {
                type: Boolean,
                default: false,
            },
            /**
             * Force a state where search is active but the text field component is not focused
             */
            active: {
                type: Boolean,
                default: false,
            },
            /**
             * Show a border when the search field is focused
             */
            showFocusBorder: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['input', 'change', 'cancel', 'focus', 'update:value', 'update:modelValue'],
        data() {
            return {
                forceActive: false,
                inputValue: this.computedVModel,
            };
        },
        computed: {
            computedVModel() {
                if (utils.isVue3) {
                    return this.modelValue;
                }
                return this.value;
            },
            className() {
                return classNames(
                    'Polaris-TopBar-SearchField',
                    (this.focused || this.active || this.forceActive) && 'Polaris-TopBar-SearchField--focused',
                );
            },
            divClassName() {
                return classNames(
                    'Polaris-TopBar-SearchField__Backdrop',
                    this.showFocusBorder && 'Polaris-TopBar-SearchField__BackdropShowFocusBorder',
                );
            },
            computedValue: {
                get() {
                    return this.inputValue;
                },
                set(value) {
                    this.inputValue = value;
                    /**
                     * Handle input of search field
                     */
                    this.$emit('input', value);
                    /**
                     * For Vue 3
                     * Handle input of search field
                     * @ignore
                     */
                    this.$emit('update:value', value);
                    /**
                     * For Vue 3
                     * Handle input of search field
                     * @ignore
                     */
                    this.$emit('update:modelValue', value);
                },
            },
            uuid() {
                return uuid();
            }
        },
        methods: {
            preventDefault(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                }
            },
            handleChange(event) {
                this.$emit('change', event.target.value);
            },
            handleBlur() {
                this.forceActive = true;
                this.$emit('cancel');

                if (!(this.$refs.input)) {
                    return;
                }

                (this.$refs.input).value = '';
                this.$emit('change');
                (this.$refs.input).focus();
            },
            handleFocus() {
                this.$emit('focus');
                this.forceActive = true;
            },
            handleClear() {
                this.inputValue = '';
                this.$emit('input', '');
                /**
                 * @ignore
                 */
                this.$emit('update:value', '');
                /**
                 * For Vue 3
                 * @ignore
                 */
                this.$emit('update:modelValue', '');
            },
        },
        watch: {
            focused(value, OldValue) {
                if (!(this.$refs.input)) {
                    return;
                }

                if (this.focused) {
                    (this.$refs.input).focus();
                } else {
                    (this.$refs.input).blur();
                }
            },
        },
        created() {
            this.inputValue = this.computedVModel;
        }
    }
</script>

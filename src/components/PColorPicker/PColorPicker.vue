<template>
    <div class="color-picker-field" v-click-outside="hidePicker">
        <div :class="propsClass">
            <span @click="togglePicker()" :class="className" :style="'background-color:'+color"></span>
            <PTextField v-model="color" type="text" :label="label" :show-input="showInput" class="picker"
                        labelClass="mb-0"></PTextField>
        </div>
        <div class="picker-wrapper">
            <Chrome v-show="showPicker" :value="color" @input="updateColor" @mouseup="dropColor"/>
        </div>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { Chrome } from './components/Chrome';
    import { PTextField } from '../../components/PTextField/';
    import vClickOutside from 'v-click-outside';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The color picker is used to let merchants select a color visually. For example, merchants use the
     *  color picker to customize the accent color of the email templates for their shop.</h4>
     */
    export default {
        name: 'PColorPicker',
        components: {
            PTextField, Chrome,
        },
        directives: {
            clickOutside: vClickOutside.directive,
        },
        props: {
            /**
             * Label for the colorPicker
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * ID for form input
             */
            id: {
                type: [String, Number],
                required: true,
            },
            /**
             * LabelClass for input
             */
            labelClass: {
                type: String,
                default: null,
            },
            /**
             * Hide/Show input
             */
            showInput: {
                type: Boolean,
                default: false,
            },
            /**
             * PropsClass for input
             */
            propsClass: {
                type: String,
                default: null,
            },
            /**
             * Selected color
             */
            color: {
                type: String,
                default: '#FFFF',
            },
            /**
             * Disabled field
             */
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['change', 'update:color', 'drop'],
        data() {
            return {
                showPicker: false,
                dropColors: null,
            };
        },
        computed: {
            className() {
                return classNames(
                    'picker',
                    this.disabled && 'Polaris-ColorPicker--disabled',
                );
            },
            computedColor: {
                get() {
                    return this.color;
                },
                set(value) {
                    this.dropColors = value;
                    /**
                     * Triggers when color is changed
                     * @ignore
                     */
                    this.$emit('update:color', value ? value.hex : value);
                    /**
                     * Triggers when color is changed
                     */
                    this.$emit('change', value);
                }
            }
        },
        methods: {
            updateColor(color) {
                /**
                 * Triggers when color is changed
                 * @ignore
                 */
                this.$emit('update:color', color.hex);
                /**
                 * Triggers when color is changed
                 */
                this.$emit('change', color);
            },
            togglePicker() {
                this.showPicker = !this.showPicker;
            },
            hidePicker() {
                this.showPicker = false;
            },
            dropColor() {
                /**
                 * Mouse drop event, triggered when mouseup
                 */
                this.$emit('drop', this.dropColors);
            }
        },
    }
</script>
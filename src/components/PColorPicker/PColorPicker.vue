<template>
    <div class="color-picker-field" v-click-outside="hidePicker">
        <div :class="propsClass">
            <span @click="togglePicker()" :class="className" :style="'background-color:'+color"></span>
            <PTextField v-model="color" type="text" :label="label" :show-input="showInput" class="picker"
                        labelClass="mb-0"></PTextField>
        </div>
        <div class="picker-wrapper">
            <template v-if="utils.isVue3">
                <Chrome v-show="showPicker" v-model="color"></Chrome>
            </template>
            <template v-else>
                <ChromePicker v-show="showPicker" v-model="color"></ChromePicker>
            </template>
        </div>
    </div>
</template>

<script>
    import utils from '../../utilities';
    import { Chrome } from '@ckpack/vue-color';
    import ChromePicker from 'vue-color';
    import { classNames } from "../../utilities/css";
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
            PTextField, Chrome, ChromePicker,
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
        emits: ['change', 'update:color'],
        data() {
            return {
                showPicker: false,
            };
        },
        computed: {
            className() {
                return classNames(
                    'picker',
                    this.disabled && 'Polaris-ColorPicker--disabled',
                );
            },
            utils() {
                return utils;
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
        },
    }
</script>

<style>
    .vc-chrome input {
        font-family: inherit;
    }

    .vc-chrome {
        font-family: inherit !important;
        box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05), 0px 1px 5px rgba(0, 0, 0, 0.15) !important;
        border-radius: 0.8rem !important;
        border: none !important;
        overflow: hidden;
    }

    .vc-chrome-saturation-wrap {
        box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05), 0px 1px 5px rgba(0, 0, 0, 0.15) !important;
        border-radius: 0.8rem 0.8rem 0 0 !important;
        border: none !important;
    }
</style>

<style scoped>
    .color-picker-field span.picker {
        position: absolute;
        right: 10px;
        width: 30px;
        height: 20px;
        z-index: 25;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, .24);
        float: left;
        left: 0;
        margin: 0 10px 0 0;
    }

    .color-picker-field {
        position: relative;
    }

    .picker-wrapper {
        position: absolute;
        top: 100%;
        z-index: 111;
    }

    .picker {
        position: relative !important;
        display: inline-block;
    }
</style>

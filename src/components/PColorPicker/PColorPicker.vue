<template>
    <div class="color-picker-field" v-p-click-outside="hidePicker">
        <div :class="propsClass">
            <span @click="togglePicker()" :class="className" :style="'background-color:'+color"></span>
            <PTextField v-model="computedColor" type="text" :label="label" :show-input="showInput" class="picker"
                        labelClass="mb-0"></PTextField>
        </div>
        <div class="picker-wrapper">
            <Chrome v-show="showPicker" :value="color" @input="updateColor" @mouseup="dropColor"/>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { classNames } from '../../utilities/css';
    import { Chrome } from './components/Chrome';
    import { PTextField } from '../../components/PTextField/';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The color picker is used to let merchants select a color visually. For example, merchants use the
     *  color picker to customize the accent color of the email templates for their shop.</h4>
     */

    let props = defineProps({
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
    });

    let emit = defineEmits(['change', 'update:color', 'drop']);
    let showPicker = ref(false);
    let dropColors = ref(null);

    const className = computed(() => {
        return classNames(
            'picker',
            props.disabled && 'Polaris-ColorPicker--disabled',
        );
    });

    const computedColor = computed({
        get() {
            return props.color;
        },
        set(value) {
            dropColors.value = value;
            /**
             * Triggers when color is changed
             * @ignore
             */
            emit('update:color', value.hex ? value.hex : value);
            /**
             * Triggers when color is changed
             */
            emit('change', value);
        }
    });

    function updateColor(color) {
      console.log('Update Clolot', color);
        dropColors.value = color;
        /**
         * Triggers when color is changed
         * @ignore
         */
        emit('update:color', color.hex);
        /**
         * Triggers when color is changed
         */
        emit('change', color);
    }

    function togglePicker() {
        showPicker.value = !showPicker.value;
    }

    function hidePicker() {
        if (showPicker.value) {
            emit('drop', dropColors.value || props.color);
        }
        showPicker.value = false;
    }

    function dropColor() {
        /**
         * Mouse drop event, triggered when mouseup
         */
        emit('drop', dropColors.value);
    }
</script>

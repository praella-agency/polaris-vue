<template>
    <div :class="propsClass">
        <label class="switch" :style="label ? 'margin-right:3px' : ''">
            <input type="checkbox" :id="id" :value="value" :checked="disabled ? false : checked" :disabled="disabled"
                   @change="onChange">
            <span class="slider round"></span>
        </label>
        <!--
          @slot Label
          @type String
        -->
        <slot v-if="$slots.label" name="label"/>
        <template v-else>{{ label }}</template>
    </div>
</template>

<script>
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The `p-toggle` component provides users the ability to choose between two distinct values. These are
     *  very similar to a switch, or on/off switch, though aesthetically different than a checkbox.</h4>
     */
    export default {
        name: 'PToggle',
        props: {
            /**
             * Label of toggle.
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * ID of toggle.
             */
            id: {
                type: [String, Number],
                default: `PolarisTextField${new Date().getUTCMilliseconds()}`,
            },
            /**
             * propsClass of toggle.
             */
            propsClass: {
                type: String,
                default: null,
            },
            /**
             * Value of toggle.
             */
            value: {
                type: [String, Boolean, Number],
            },
            /**
             * Set true for disable.
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Defined if toggle enabled/disabled.
             */
            checked: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['change'],
        methods: {
            onChange(e) {
                const target = e.target || e.srcElement;
                /**
                 * On change event handler
                 * @param e
                 */
                this.$emit('change', {checked: target.checked, value: target.value});
            },
        },
    }
</script>

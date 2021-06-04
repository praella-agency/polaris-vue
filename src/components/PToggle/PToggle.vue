<template>
  <div :class="propsClass">
    <label class="switch" :style="label ? 'margin-right:3px' : ''">
      <input type="checkbox" :id="id" :value="value" :checked="disabled ? false : checked" :disabled="disabled"
             @change="onChange">
      <span class="slider round"></span>
    </label>
    <slot v-if="$slots.label" name="label"/>
    <template v-else>{{ label }}</template>
  </div>
</template>
<script>
  export default {
    props: {
      /**
       * Label of toggle
       * @values Any String
       */
      label: {
        required: false,
        type: String,
        default: null,
      },
      /**
       * ID of toggle
       */
      id: {
        required: false,
        type: String,
        default: `PolarisTextField${new Date().getUTCMilliseconds()}`,
      },
      /**
       * propsClass of toggle
       * @values true, false
       */
      propsClass: {
        required: false,
        type: String,
        default: null,
      },
      /**
       * Value of toggle
       * @values Any String or boolean
       */
      value: {
        required: false,
        type: [String, Boolean, Number],
      },
      /**
       * Set true for disable
       * @values true, false
       */
      disabled: {
        required: false,
        type: Boolean,
        default: false,
      },
      /**
       * Defined if toggle enabled/disabled
       * @values true, false
       */
      checked: {
        default: false,
        required: false,
        type: Boolean,
      },
    },
    methods: {
      /**
       * On change event handler
       * @param e
       */
      onChange(e) {
        const target = e.target || e.srcElement;
        this.$emit('change', {checked: target.checked, value: target.value});
      },
    },
  };
</script>
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
export default {
  title: 'PToggle',
  props: {
    label: {
      type: String
    },
    id: {
      type: String,
      default: `PolarisTextField${new Date().getUTCMilliseconds()}`
    },
    propsClass: {
      type: String,
      default: null
    },
    value: {
      type: [String, Boolean, Number],
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(e) {
      const target = e.target || e.srcElement;
      /**
       * On change event handler
       * @param e
       */
      this.$emit('change', {checked: target.checked, value: target.value});
    }
  }
}
</script>
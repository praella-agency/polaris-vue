<template>
  <div @blur="focused = false"
       @focus="focused = true"
       :class="className">
    <slot v-if="!$slots.children">{{ children }}</slot>
    <slot name="children"></slot>
  </div>
</template>

<script>
  import { classNames } from '../../../../utilities/css';
  import StringValidator from '../../../../utilities/validators/StringValidator';

  const Position = ['Left', 'Primary', 'Right'];

  export default {
    name: 'PConnectedItem',
    props: {
      position: {
        type: String,
        ...StringValidator('position', Position)
      },
      children: {
        type: String,
      },
      focused: {
        type: Boolean,
      },
    },
    computed: {
      className() {
        return classNames(
            'Polaris-Connected__Item',
            this.focused && 'Polaris-Connected__Item--focused',
            this.position === 'Primary' && 'Polaris-Connected__Item--primary',
            this.position !== 'Primary' && 'Polaris-Connected__Item--connection',
        );
      }
    }
  }
</script>

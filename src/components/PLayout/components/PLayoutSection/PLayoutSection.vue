<template>
  <div :class="className">
    <!-- @slot Default -->
    <slot/>
  </div>
</template>

<script>
import { classNames } from '../../../../utilities/css';

export default {
    name: 'PLayoutSection',
    props: {
        /**
         * Set it true to make it secondary.
         * @values true | false
         */
        secondary: {
            type: Boolean,
            default: false,
        },
        /**
         * Set it true to make it full width.
         * @values true | false
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },
        /**
         * Set it true to make it one half.
         * @values true | false
         */
        oneHalf: {
            type: Boolean,
            default: false,
        },
        /**
         * Set it true to make it one third.
         * @values true | false
         */
        oneThird: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        className() {
            return classNames(
                'Polaris-Layout__Section',
                this.secondary && 'Polaris-Layout__Section--secondary',
                this.fullWidth && 'Polaris-Layout__Section--fullWidth',
                this.oneHalf && 'Polaris-Layout__Section--oneHalf',
                this.oneThird && 'Polaris-Layout__Section--oneThird',
            );
        },
    },
}
</script>

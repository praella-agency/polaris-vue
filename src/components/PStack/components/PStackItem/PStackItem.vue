<template>
  <div :class="className" v-bind:style="style">
    <!-- @slot Elements to display inside stack item -->
    <slot/>
  </div>
</template>

<script>
import { classNames } from '../../../../utilities/css';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">The stack component will treat multiple elements wrapped in a stack item component as one item. By
 *  default, each individual element is treated as one stack item. Use the fill prop on a single stack item component to
 *  make it fill the rest of the available horizontal space.</h4>
 */
export default {
    name: 'PStackItem',
    props: {
        /**
         * Fill the available horizontal space in the stack with the item
         * @values true | false
         */
        fill: {
            type: Boolean,
            default: false,
        },
        /**
         * Width of Item
         * @values Ex:- 100 | 100px
         */
        width: {
            type: [String, Number],
        }
    },
    computed: {
        className() {
            return classNames(
                'Polaris-Stack__Item',
                this.fill && 'Polaris-Stack__Item--fill',
            );
        },
        style() {
            if (this.width) {
                return {width: /^\d+$/.test(this.width) ? this.width + 'px' : this.width};
            } else { return null; }
        },
    },
}
</script>

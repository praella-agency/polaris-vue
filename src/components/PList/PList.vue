<template>
    <component :is="element" :class="className">
        <!-- @slot List item elements -->
        <slot/>
    </component>
</template>

<script>
    import { classNames } from '@/utilities/css';
    import StringValidator from "./../../utilities/validators/StringValidator";

    const Type = ['bullet', 'number'];

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Lists display a set of related text-only content. Each list item begins with a bullet or a number.
     * </h4>
     */
    export default {
      name: 'PList',
      props: {
        /**
         * Type of list
         * @values bullet | number
         */
        type: {
          type: String,
          default: 'bullet',
          ...StringValidator('type', Type)
        }
      },
      data() {
        return {
          element: this.type === 'bullet' ? 'ul' : 'ol',
        }
      },
      computed: {
        className() {

          return classNames(
              'Polaris-List',
              this.type && this.type === 'number' && 'Polaris-List--typeNumber',
          );
        }
      }
    }
</script>

<template>
  <div :class="className">
    <div class="Polaris-FooterHelp__Content">
      <!-- @slot Icon content -->
      <slot name="icon">
        <div class="Polaris-FooterHelp__Icon">
          <PIcon color="highlight" source="CircleInformationMajor" />
        </div>
      </slot>
      <div class="Polaris-FooterHelp__Text">
        <!-- @slot Display the content inside the layout -->
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import { classNames } from '../../utilities/css';
import { PIcon } from '../../components/PIcon';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Footer help is used to refer merchants to more information related to the product or feature they’re
 *  using.</h4>
 */
export default {
    name: 'PFooterHelp',
    components: {
        PIcon,
    },
    props: {
        /**
         * Id for the element
         */
        id: {
            type: [String, Number],
            default: null,
        },
        /**
         * Url for the footer
         */
        url: {
            type: String,
            default: null,
        },
        /**
         * Set to for router link
         */
        to: {
            type: [String, Object],
        },
        /**
         * Makes the link open in a new tab.
         * @values true | false
         */
        external: {
            type: Boolean,
            default: false,
        },
        /**
         * Makes the link color the same as the current text color and adds an underline.
         * @values true | false
         */
        monochrome: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        className() {
            return classNames(
                'Polaris-FooterHelp',
            );
        },
        isStringSlot() {
            const slots = (this.$slots.default || []);
            return this.external && slots.length === 1 && slots[0].text;
        },
    },
}
</script>

<template>
    <!--
      Triggered on click
      @event click
    -->

    <!--
      Triggered on focus
      @event focus
    -->

    <!--
      Triggered on blur
      @event blur
    -->
    <component
        :is="(to ? 'router-link' : (href ? 'a' : 'button'))"
        :to="to"
        :href="href"
        :type="type"
        @click="$emit('click', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :class="className"
        :aria-controls="ariaProps"
        :aria-haspopup="ariaProps"
        :aria-owns="ariaProps"
        :value="value"
        :aria-label="ariaLabel"
        :disabled="isDisabled || loading"
        :role="loading ? 'alert' : undefined"
        :aria-busy="loading ? true : undefined">
    <span class="Polaris-Button__Content">
      <span v-if="loading" class="Polaris-Button__Spinner">
        <p-spinner size="small" :color="spinnerColor"></p-spinner>
        <span role="status">
          <span class="Polaris-VisuallyHidden">Loading</span>
        </span>
      </span>
      <span v-if="icon" class="Polaris-Button__Icon">
        <PIcon :source="loading ? 'placeholder' : icon"/>
      </span>
      <span v-if="!hasNoChildren" class="Polaris-Button__Text">
        <!-- @slot The content to display content inside the button -->
        <slot/>
      </span>
      <span v-if="disclosure" class="Polaris-Button__Icon">
        <div :class="disclosureIconClassName">
          <PIcon :source="loading ? 'placeholder' : 'CaretDownMinor'"/>
        </div>
      </span>
    </span>
    </component>
</template>

<script>
    import { classNames, variationName } from '../../utilities/css';

    import { PIcon } from '../PIcon';
    import { PSpinner } from '../PSpinner';

    const Size = 'slim' | 'medium' | 'large';
    const TextAlign = 'left' | 'right' | 'center';
    const Type = 'submit' | 'reset' | 'button';

    const DEFAULT_SIZE = 'medium';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons,
     *  which look similar to links, are used for less important or less commonly used actions, such as “view shipping
     *  settings”.</h4>
     */
    export default {
        name: 'PButton',
        components: {
            PIcon, PSpinner,
        },
        props: {
            /**
             * A destination to link to, rendered in the href attribute of a link
             */
            href: {
                type: String,
                default: undefined,
            },
            /**
             * VueRouter link | link object
             */
            to: {
                type: String | Object,
            },
            /**
             * Define aria-controls, aria-haspopup, aria-owns
             */
            ariaProps: {
                type: Boolean,
                default: false,
            },
            /**
             * Define aria-label
             */
            ariaLabel: {
                type: String,
                default: null,
            },
            /**
             * Type of the button
             */
            type: {
                type: Type,
                default: null,
            },
            /**
             * Provides extra visual weight and identifies
             * the primary action in a set of buttons
             */
            primary: {
                type: Boolean,
                default: false,
            },
            /**
             * Gives the button a subtle alternative to the
             * default button styling, appropriate for certain backdrops
             */
            outline: {
                type: Boolean,
                default: false,
            },
            /**
             * Indicates a dangerous or potentially negative action
             */
            destructive: {
                type: Boolean,
                default: false,
            },
            /**
             * Indicates a dangerous or potentially negative text
             */
            destructiveText: {
                type: Boolean,
                default: false,
            },
            /**
             * Disables the button, disallowing merchant interaction
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Replaces button text with a spinner while a background action is being performed
             */
            loading: {
                type: Boolean,
                default: false,
            },
            /**
             * Renders a button that looks like a link
             */
            plain: {
                type: Boolean,
                default: false,
            },
            /**
             * Makes `plain` and `outline` Button colors
             * (text, borders, icons) the same as the current text color.
             *
             * Also adds an underline to `plain` Buttons
             */
            monochrome: {
                type: Boolean,
                default: false,
            },
            /**
             * Allows the button to grow to the width of its container
             */
            fullWidth: {
                type: Boolean,
                default: false,
            },
            /**
             * Displays the button with a disclosure icon.
             */
            disclosure: {
                type: Boolean | String,
                default: false,
            },
            /**
             * Changes the size of the button, giving it more or less padding
             */
            size: {
                type: Size,
                default: null,
            },
            /**
             * Changes the inner text alignment of the button
             */
            textAlign: {
                type: TextAlign,
                default: null,
            },
            /**
             * Icon to display to the left of the button content
             * for available icon list.
             */
            icon: {
                type: String,
                default: null,
            },
            /**
             * Button content
             */
            value: {
                type: String | Number | Array,
            },
            /**
             * Renders a button without border
             */
            plainAction: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Button',
                    this.primary && 'Polaris-Button--primary',
                    this.outline && 'Polaris-Button--outline',
                    this.destructive && 'Polaris-Button--destructive',
                    this.destructiveText && 'Polaris-Button--destructiveText',
                    this.isDisabled && 'Polaris-Button--disabled',
                    this.loading && 'Polaris-Button--loading',
                    this.plain && 'Polaris-Button--plain',
                    this.plainAction && 'Polaris-Button--plainAction',
                    this.monochrome && 'Polaris-Button--monochrome',
                    this.fullWidth && 'Polaris-Button--fullWidth',
                    this.icon && this.hasNoChildren && 'Polaris-Button--iconOnly',
                    this.size && this.size !== DEFAULT_SIZE && `Polaris-Button--${variationName('size', this.size)}`,
                    this.textAlign && `Polaris-Button--${variationName('textAlign', this.textAlign)}`,
                );
            },
            disclosureIconClassName() {
                return classNames(
                    'Polaris-Button__DisclosureIcon',
                    this.disclosure === 'up' && 'Polaris-Button__DisclosureIconFacingUp',
                    this.loading && 'Polaris-Button__Hidden',
                );
            },
            isDisabled() {
                return this.disabled || this.loading;
            },
            spinnerColor() {
                return this.primary || this.destructive ? 'white' : 'inkLightest';
            },
            hasNoChildren() {
                return (this.$slots.default || []).length === 0;
            },
        },
    }
</script>

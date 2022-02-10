<template>
    <component
        :is="(to || href) ? 'PUnstyledLink' : 'button'"
        :class="className"
        :id="id"
        :aria-label="accessibilityLabel"
        :role="role"
        @click="$emit('click', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"

        :url="href"
        :to="to"
        :external="external"
        :download="download"

        :type="type"
        :disabled="disabled"
        :aria-busy="loading ? true : undefined"
        :aria-controls="ariaControls"
        :aria-expanded="ariaExpanded"
        :aria-describedby="ariaDescribedBy"
        :aria-pressed="pressed"
        @keydown="$emit('keyDown', $event)"
        @keyup="$emit('keyup', $event)"
        @keypress="$emit('keyPress', $event)"
    >
        <span class="Polaris-Button__Content">
            <span v-if="loading" class="Polaris-Button__Spinner">
                <PSpinner size="small" :color="spinnerColor"/>
            </span>
            <span v-if="icon" :class="iconClassName">
                <PIcon :source="loading ? 'placeholder' : icon"/>
            </span>
            <span v-if="!hasNoChildren" :class="childMarkupClassName" :key="disabled ? 'text-disabled' : 'text'">
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
    import { PIcon } from '../../../../components/PIcon';
    import { PSpinner } from '../../../../components/PSpinner';
    import { PUnstyledLink } from '../../../../components/PUnstyledLink';
    import StringValidator from '../../../../utilities/validators/StringValidator';
    import { classNames, variationName } from "../../../../utilities/css";

    const Size = ['slim', 'medium', 'large'];
    const TextAlign = ['left', 'right', 'center', null];
    const Type = ['submit', 'reset', 'button'];
    const DEFAULT_SIZE = 'medium';

    export default {
        name: 'PUnstyledButton',
        components: {
            PIcon, PSpinner, PUnstyledLink,
        },
        props: {
            /**
             * Visually hidden text for screen readers
             */
            accessibilityLabel: {
                type: String,
                default: null,
            },
            /**
             * Id of the element the button controls
             */
            ariaControls: {
                type: String,
                default: null,
            },
            /**
             * Indicates the ID of the element that describes the button
             */
            ariaDescribedBy: {
                type: String,
                default: null,
            },
            /**
             * Tells screen reader the controlled element is expanded
             */
            ariaExpanded: {
                type: Boolean,
                default: false,
            },
            /**
             * Define aria-controls, aria-haspopup, aria-owns
             */
            ariaProps: {
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
             * Displays the button with a disclosure icon.
             */
            disclosure: {
                type: [Boolean, String],
                default: false,
            },
            /**
             * Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename
             * if it is a string value
             */
            download: {
                type: [Boolean, String],
                default: false,
            },
            /**
             * Forces url to open in a new tab
             */
            external: {
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
             * A destination to link to, rendered in the href attribute of a link
             */
            href: {
                type: String,
                default: undefined,
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
             * Check if button is connected or not
             */
            isConnectedDisclosure: {
                type: Boolean,
                default: false,
            },
            /**
             * A unique identifier for the button
             */
            id: {
                type: String,
                default: null,
            },
            /**
             * Replaces button text with a spinner while a background action is being performed
             */
            loading: {
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
             * Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops
             */
            outline: {
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
             * Renders a button without border
             */
            plainAction: {
                type: Boolean,
                default: false,
            },
            /**
             * Sets the button in a pressed state
             */
            pressed: {
                type: Boolean,
                default: false,
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
             * Removes underline from button text (including on interaction) when `monochrome` and `plain` are true
             */
            removeUnderline: {
                type: Boolean,
                default: false,
            },
            /**
             * A valid WAI-ARIA role to define the semantic value of this element
             */
            role: {
                type: String,
                default: null,
            },
            /**
             * Changes the size of the button, giving it more or less padding
             */
            size: {
                type: String,
                default: 'medium',
                ...StringValidator('size', Size),
            },
            /**
             * Changes the inner text alignment of the button
             */
            textAlign: {
                type: String,
                default: null,
                ...StringValidator('textAlign', TextAlign),
            },
            /**
             * VueRouter link | link object
             */
            to: {
                type: [String, Object],
            },
            /**
             * Type of the button
             */
            type: {
                type: String,
                default: 'button',
                ...StringValidator('type', Type),
            },
            /**
             * Button content
             */
            value: {
                type: [String, Number, Array],
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Button',
                    this.primary && 'Polaris-Button--primary',
                    this.outline && 'Polaris-Button--outline',
                    this.destructive && 'Polaris-Button--destructive',
                    !this.destructive && this.destructiveText && 'Polaris-Button--destructiveText',
                    this.isDisabled && 'Polaris-Button--disabled',
                    this.loading && 'Polaris-Button--loading',
                    this.plain && 'Polaris-Button--plain',
                    this.plainAction && 'Polaris-Button--plainAction',
                    this.pressed && !this.disabled && !this.href && 'Polaris-Button--pressed',
                    this.monochrome && 'Polaris-Button--monochrome',
                    this.size && this.size !== DEFAULT_SIZE && `Polaris-Button--${variationName('size', this.size)}`,
                    this.textAlign && `Polaris-Button--${variationName('textAlign', this.textAlign)}`,
                    this.fullWidth && 'Polaris-Button--fullWidth',
                    this.icon && this.hasNoChildren && 'Polaris-Button--iconOnly',
                    this.isConnectedDisclosure && 'Polaris-Button--connectedDisclosure',
                    this.monochrome && 'Polaris-Button--monochrome',
                );
            },
            disclosureIconClassName() {
                return classNames(
                    'Polaris-Button__DisclosureIcon',
                    this.disclosure === 'up' && 'Polaris-Button__DisclosureIconFacingUp',
                    this.loading && 'Polaris-Button__Hidden',
                );
            },
            childMarkupClassName() {
                return classNames(
                    'Polaris-Button__Text',
                    this.removeUnderline && 'Polaris-Button--removeUnderline',
                );
            },
            isDisabled() {
                return this.disabled || this.loading;
            },
            hasNoChildren() {
                return (this.$slots.default || []).length === 0;
            },
            spinnerColor() {
                return this.primary || this.destructive ? 'white' : 'inkLightest';
            },
            iconClassName() {
                return classNames(
                    'Polaris-Button__Icon',
                    this.loading && 'Polaris-Button--hidden'
                );
            },
        },
    }
</script>

<style scoped>

</style>
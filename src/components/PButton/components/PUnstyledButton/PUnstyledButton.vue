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
        @keyup="$emit('keyUp', $event)"
        @keypress="$emit('keyPress', $event)"
    >
        <slot/>
    </component>
</template>

<script>
    import { PUnstyledLink } from '../../../../components/PUnstyledLink';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    export default {
        name: 'PUnstyledButton',
        components: {
            PUnstyledLink,
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
            className: {
                type: String,
                default: null,
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
                type: Size,
                default: DEFAULT_SIZE,
                // ...StringValidator('size', Size),
            },
            /**
             * Changes the inner text alignment of the button
             */
            textAlign: {
                type: TextAlign,
                default: null,
                // ...StringValidator('textAlign', TextAlign),
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
                // ...StringValidator('type', Type),
            },
            /**
             * Button content
             */
            value: {
                type: String | Number | Array,
            },
        },

    }
</script>

<style scoped>

</style>
<template>
<!--    <div v-if="connectedDisclosure" class="Polaris-Button__ConnectedDisclosureWrapper">-->
<!--        <PUnstyledButton-->
<!--            :class="className"-->
<!--        >-->
<!--            <span class="Polaris-Button__Content">-->
<!--                <span v-if="loading" class="Polaris-Button__Spinner">-->
<!--                    <PSpinner size="small"/>-->
<!--                </span>-->
<!--                <span v-if="icon" :class="iconClassName">-->
<!--                    <PIcon :source="loading ? 'placeholder' : icon"/>-->
<!--                </span>-->
<!--                <span v-if="!hasNoChildren" :class="childMarkupClassName" :key="disabled ? 'text-disabled' : 'text'">-->
<!--                    &lt;!&ndash; @slot The content to display content inside the button &ndash;&gt;-->
<!--                    <slot/>-->
<!--                </span>-->
<!--                <span v-if="disclosure" class="Polaris-Button__Icon">-->
<!--                    <div :class="disclosureIconClassName">-->
<!--                        <PIcon :source="loading ? 'placeholder' : 'CaretDownMinor'"/>-->
<!--                    </div>-->
<!--                </span>-->
<!--            </span>-->

<!--            <PPopover-->
<!--                id="disclosure-button"-->
<!--                :active="disclosureActive"-->
<!--                preferredAlignment="right"-->
<!--                @close="() => {this.disclosureActive = false;}"-->
<!--            >-->
<!--                <button-->
<!--                    slot="activator"-->
<!--                    type="button"-->
<!--                    :class="connectedDisclosureClassName"-->
<!--                    :disabled="disabled"-->
<!--                    :aria-label="accessibilityLabel"-->
<!--                    :aria-describedby="ariaDescribedBy"-->
<!--                    @click="toggleDisclosureActive"-->
<!--                >-->
<!--                    <span class="Polaris-Button__Icon">-->
<!--                        <PIcon source="CaretDownMinor"/>-->
<!--                    </span>-->
<!--                </button>-->
<!--                <PActionList-->
<!--                    slot="content"-->
<!--                    :items="Object.keys(connectedDisclosure).length ? connectedDisclosure.actions : []"-->
<!--                />-->
<!--            </PPopover>-->
<!--        </PUnstyledButton>-->
<!--    </div>-->
<!--    <PUnstyledButton-->
<!--        :class="className"-->
<!--    >-->
<!--            <span class="Polaris-Button__Content">-->
<!--                <span v-if="loading" class="Polaris-Button__Spinner">-->
<!--                    <PSpinner size="small"/>-->
<!--                </span>-->
<!--                <span v-if="icon" :class="iconClassName">-->
<!--                    <PIcon :source="loading ? 'placeholder' : icon"/>-->
<!--                </span>-->
<!--                <span v-if="!hasNoChildren" :class="childMarkupClassName" :key="disabled ? 'text-disabled' : 'text'">-->
<!--                    &lt;!&ndash; @slot The content to display content inside the button &ndash;&gt;-->
<!--                    <slot/>-->
<!--                </span>-->
<!--                <span v-if="disclosure" class="Polaris-Button__Icon">-->
<!--                    <div :class="disclosureIconClassName">-->
<!--                        <PIcon :source="loading ? 'placeholder' : 'CaretDownMinor'"/>-->
<!--                    </div>-->
<!--                </span>-->
<!--            </span>-->
<!--    </PUnstyledButton>-->
</template>

<script>
    import { classNames, variationName } from '../../utilities/css';
    import { PIcon } from '../PIcon';
    import { PSpinner } from '../PSpinner';
    import { PUnstyledButton } from './components/PUnstyledButton';
    import { PPopover } from '../PPopover';
    import { PActionList } from '../PActionList';
    import { ActionListItemDescriptor } from '../../types';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import StringValidator from '../../utilities/validators/StringValidator';

    const Size = ['slim', 'medium', 'large'];
    const TextAlign = ['left', 'right', 'center', null];
    const Type = ['submit', 'reset', 'button'];
    const ConnectedDisclosure = {
        /**
         * Visually hidden label for the connected disclosure button
         */
        accessibilityLabel: String,
        /**
         * Whether or not the disclosure is disabled
         */
        disabled: Boolean,
        /**
         * List of actions
         */
        actions: {
            type: Array,
            properties: {...ActionListItemDescriptor}
        },
    };

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
            PIcon, PSpinner, PUnstyledButton, PPopover, PActionList,
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
             * Define aria-label
             */
            ariaLabel: {
                type: String,
                default: null,
            },
            /**
             * Define aria-controls, aria-haspopup, aria-owns
             */
            ariaProps: {
                type: Boolean,
                default: false,
            },
            /**
             * Disclosure button connected right of the button. Toggles a popover action list
             */
            connectedDisclosure: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('connectedDisclosure', ConnectedDisclosure),
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
                type: String,
                default: 'medium',
                ...StringValidator('size', Size),
            },
            /**
             * Changes the inner text alignment of the button
             */
            textAlign: {
                type: TextAlign,
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
                type: String | Number | Array,
            },
        },
        data() {
            return {
                disclosureActive: false,
            };
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
            connectedDisclosureClassName() {
                return classNames(
                    'Polaris-Button',
                    this.primary && 'Polaris-Button--primary',
                    this.outline && 'Polaris-Button--outline',
                    this.size && this.size !== DEFAULT_SIZE && `Polaris-Button--${variationName('size', this.size)}`,
                    this.textAlign && `Polaris-Button--${variationName('textAlign', this.textAlign)}`,
                    this.destructive && 'Polaris-Button--destructive',
                    this.destructiveText && 'Polaris-Button--destructiveText',
                    this.connectedDisclosure && this.connectedDisclosure.disabled && 'Polaris-Button--disabled',
                    this.icon && this.hasNoChildren && 'Polaris-Button--iconOnly',
                    'Polaris-Button__ConnectedDisclosure',
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
            iconClassName() {
                return classNames(
                    'Polaris-Button__Icon',
                    this.loading && 'Polaris-Button--hidden'
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
        methods: {
            toggleDisclosureActive() {
                this.disclosureActive = !this.disclosureActive;
            },
        },
    }
</script>

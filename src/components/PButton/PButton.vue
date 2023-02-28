<template>
    <div v-if="Object.keys(connectedDisclosure).length > 0" class="Polaris-Button__ConnectedDisclosureWrapper">
        <PUnstyledButton
            v-bind="$props"
            :isConnectedDisclosure="Object.keys(connectedDisclosure).length > 0"
            @click.stop="handleClick"
            @focus.stop="handleFocus"
            @blur.stop="handleBlur"
            @keydown.stop="handleKeyDown"
            @keypress.stop="handleKeyPress"
            @keyup.stop="handleKeyUp"
        >
            <!-- @slot The content to display content inside the button -->
            <slot/>
        </PUnstyledButton>

        <PPopover
            id="disclosure-button"
            :active="disclosureActive"
            preferredAlignment="right"
            @close="() => {disclosureActive = false;}"
        >
            <template #activator>
                <button
                    type="button"
                    :class="connectedDisclosureClassName"
                    :disabled="disabled"
                    :aria-label="accessibilityLabel"
                    :aria-describedby="ariaDescribedBy"
                    @click="toggleDisclosureActive"
                >
                    <span class="Polaris-Button__Icon">
                        <div :class="disclosureIconClassName">
                            <PIcon source="CaretDownMinor"/>
                        </div>
                    </span>
                </button>
            </template>
            <template #content>
                <PActionList
                    :items="Object.keys(connectedDisclosure).length ? connectedDisclosure.actions : []"
                />
            </template>
        </PPopover>
    </div>
    <PUnstyledButton
        v-else
        v-bind="$props"
        :isConnectedDisclosure="Object.keys(connectedDisclosure).length > 0"
        @click.stop="handleClick"
        @focus.stop="handleFocus"
        @blur.stop="handleBlur"
        @keydown.stop="handleKeyDown"
        @keypress.stop="handleKeyPress"
        @keyup.stop="handleKeyUp"
    >
        <!-- @slot The content to display content inside the button -->
        <slot/>
    </PUnstyledButton>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { TextAlign, ConnectedDisclosure, DEFAULT_SIZE } from '../variables';
    import { classNames, variationName } from '../../utilities/css';
    import { PIcon } from '../PIcon';
    import { PUnstyledButton } from './components/PUnstyledButton';
    import { PPopover } from '../PPopover';
    import { PActionList } from '../PActionList';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons,
     *  which look similar to links, are used for less important or less commonly used actions, such as “view shipping
     *  settings”.</h4>
     */
    let props = defineProps({
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
        },
        /**
         * Changes the inner text alignment of the button
         */
        textAlign: {
            type: TextAlign,
            default: null,
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
        },
        /**
         * Button content
         */
        value: {
            type: [String, Number, Array],
        },
        /**
         * Add focus border to button
         */
        addFocus: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['click', 'focus', 'blur', 'keydown', 'keyup', 'keyPress']);

    let disclosureActive = ref(false);

    let connectedDisclosureClassName = computed(() => {
        return classNames(
            'Polaris-Button',
            props.primary && 'Polaris-Button--primary',
            props.outline && 'Polaris-Button--outline',
            props.size && props.size !== DEFAULT_SIZE && `Polaris-Button--${variationName('size', props.size)}`,
            props.textAlign && `Polaris-Button--${variationName('textAlign', props.textAlign)}`,
            props.destructive && 'Polaris-Button--destructive',
            !props.destructive && props.destructiveText && 'Polaris-Button--destructiveText',
            props.connectedDisclosure && props.connectedDisclosure.disabled && 'Polaris-Button--disabled',
            'Polaris-Button--iconOnly',
            'Polaris-Button__ConnectedDisclosure',
            props.monochrome && 'Polaris-Button--monochrome',
        );
    });

    let disclosureIconClassName = computed(() => {
        return classNames(
            'Polaris-Button__DisclosureIcon',
            disclosureActive && 'Polaris-Button__DisclosureIconFacingUp',
        );
    });

    function toggleDisclosureActive() {
        disclosureActive = !disclosureActive;
    }

    function handleClick() {
        /**
         * Callback when clicked
         */
        emit('click', event);
    }

    function handleFocus() {
        /**
         * Callback when button becomes focussed
         */
        emit('focus', event);
    }

    function handleBlur() {
        /**
         * Callback when focus leaves button
         */
        emit('blur', event);
    }

    function handleKeyDown() {
        /**
         * Callback when a keydown event is registered on the button
         */
        emit('keydown', event);
    }

    function handleKeyPress() {
        /**
         * Callback when a keypress event is registered on the button
         */
        emit('keypress', event);
    }

    function handleKeyUp() {
        /**
         * Callback when a keyup event is registered on the button
         */
        emit('keyup', event);
    }
</script>

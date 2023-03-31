<template>
    <component
        :is="(to || href) ? PUnstyledLink : 'button'"
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
        @keydown="$emit('keydown', $event)"
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
            <span v-if="hasNoChildren" :class="childMarkupClassName" :key="disabled ? 'text-disabled' : 'text'">
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

<script setup>
    import { computed, useSlots } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { PIcon } from '../../../../components/PIcon';
    import { PSpinner } from '../../../../components/PSpinner';
    import { PUnstyledLink } from '../../../../components/PUnstyledLink';
    import StringValidator from '../../../../utilities/validators/StringValidator';
    import { classNames, variationName } from "../../../../utilities/css";
    import { Size, TextAlign, ButtonType, DEFAULT_SIZE } from '../../../variables';

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
            ...StringValidator('type', ButtonType),
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
    let slots = useSlots();

    let isDisabled = computed(() => {
        return props.disabled || props.loading;
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Button',
            props.primary && 'Polaris-Button--primary',
            props.outline && 'Polaris-Button--outline',
            props.destructive && 'Polaris-Button--destructive',
            !props.destructive && props.destructiveText && 'Polaris-Button--destructiveText',
            isDisabled.value && 'Polaris-Button--disabled',
            props.loading && 'Polaris-Button--loading',
            props.plain && 'Polaris-Button--plain',
            props.plainAction && 'Polaris-Button--plainAction',
            props.pressed && !props.disabled && !props.href && 'Polaris-Button--pressed',
            props.monochrome && 'Polaris-Button--monochrome',
            props.size && props.size !== DEFAULT_SIZE && `Polaris-Button--${variationName('size', props.size)}`,
            props.textAlign && `Polaris-Button--${variationName('textAlign', props.textAlign)}`,
            props.fullWidth && 'Polaris-Button--fullWidth',
            props.icon && !hasNoChildren && 'Polaris-Button--iconOnly',
            props.isConnectedDisclosure && 'Polaris-Button--connectedDisclosure',
            props.monochrome && 'Polaris-Button--monochrome',
            props.addFocus && 'Polaris-Button__FocusBorder',
        );
    });

    let disclosureIconClassName = computed(() => {
        return classNames(
            'Polaris-Button__DisclosureIcon',
            props.disclosure === 'up' && 'Polaris-Button__DisclosureIconFacingUp',
            props.loading && 'Polaris-Button__Hidden',
        );
    });

    let childMarkupClassName = computed(() => {
        return classNames(
            'Polaris-Button__Text',
            props.removeUnderline && 'Polaris-Button--removeUnderline',
        );
    });

    let hasNoChildren = computed(() => {
        return hasSlot(slots.default);
    });

    let spinnerColor = computed(() => {
        return props.primary || props.destructive ? 'white' : 'inkLightest';
    });

    let iconClassName = computed(() => {
        return classNames(
            'Polaris-Button__Icon',
            props.loading && 'Polaris-Button--hidden'
        );
    });
</script>

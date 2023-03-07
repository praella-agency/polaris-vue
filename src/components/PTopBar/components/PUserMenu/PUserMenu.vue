<template>
    <PMenu
        :id="id"
        :open="open"
        :on-open="onToggle"
        :on-close="onToggle"
        :actions="actions"
        :message="message"
        :accessibility-label="accessibilityLabel"
    >
        <template #activatorContent>
            <PMessageIndicator :active="showIndicator">
                <PAvatar
                    size="small"
                    :source="avatar"
                    :initials="initials && initials.replace(' ', '')"
                />
            </PMessageIndicator>
            <span class="Polaris-TopBar-UserMenu__Details">
                <p class="Polaris-TopBar-UserMenu__Name">{{ name }}</p>
                <p class="Polaris-TopBar-UserMenu__Detail">{{ detail }}</p>
            </span>
        </template>
    </PMenu>
</template>

<script setup>
    import { ref } from 'vue';
    import { PMenu } from '../../../../components/PTopBar/components/PMenu';
    import { PMessageIndicator } from '../../../../components/PMessageIndicator';
    import { PAvatar } from '../../../../components/PAvatar';

    let props = defineProps({
        /**
         * Id for the UserMenu
         */
        id: {
            type: String,
            required: true,
        },
        /**
         * An array of action objects that are rendered inside of a popover triggered by this menu
         */
        /* tslint:disable-next-line */
        actions: {
            type: Array,
            default: () => ([]),
        },
        /**
         * Accepts a message that facilitates direct, urgent communication with the merchant through the user menu
         */
        message: {
            type: Object,
            default: () => ({}),
        },
        /**
         * A string detailing the merchant’s full name to be displayed in the user menu \
         */
        name: {
            type: String,
            default: null,
        },
        /**
         * A string allowing further detail on the merchant’s name displayed in the user menu
         */
        detail: {
            type: String,
            default: null,
        },
        /**
         * A string that provides the accessibility labeling
         */
        accessibilityLabel: {
            type: String,
            default: null,
        },
        /**
         * The merchant’s initials, rendered in place of an avatar image when not provided
         */
        initials: {
            type: String,
            default: null,
        },
        /**
         * An avatar image representing the merchant
         */
        avatar: {
            type: String,
            default: null,
        },
        /**
         * A boolean property indicating whether the user menu is currently open
         */
        open: {
            type: Boolean,
            default: false,
            required: true,
        },
        /**
         * A callback function to handle opening and closing the user menu
         */
        onToggle: {
            type: Function,
        },
    });

    let showIndicator = ref(Boolean(Object.keys(props.message).length > 0));
</script>

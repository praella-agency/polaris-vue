<template>
    <div>
        <PPopover
            :id="id"
            :active="open"
            :close="onClose"
            fixed
            :fullHeight="isFullHeight"
            preferredAlignment="right"
        >
            <div class="Polaris-TopBar-Menu__ActivatorWrapper" slot="activator">
                <button
                    type="button"
                    class="Polaris-TopBar-Menu__Activator"
                    @click="onOpen"
                    :aria-label="accessibilityLabel"
                >
                    <slot name="activatorContent"/>
                </button>
            </div>
            <PActionList slot="content" :sections="actions"/>
            <PMessage
                slot="content"
                v-if="Object.keys(message).length > 0"
                :title="message.title"
                :description="message.description"
                :action="Object.keys(message).length > 0 ? {
            onClick: message.action !== undefined ? message.action.onClick : {},
            content: message.action !== undefined ? message.action.content : ''
          }: {}"
                :link="Object.keys(message).length > 0 ? {
            to: message.link !== undefined ? message.link.to : '',
            content: message.link !== undefined ? message.link.content : '',
            external: message.link !== undefined ? message.link.external : false,
          } : {}"
                :badge="message && message.badge ? {
              content: message.badge !== undefined ? message.badge.content : '',
              status: message.badge !== undefined ? message.badge.status : ''
          } : {}"
            />
        </PPopover>
    </div>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PActionList } from '../../../../components/PActionList/index.js';
    import { PPopover } from '../../../../components/PPopover/index.js';
    import { PMessage } from './components/PMessage/index.js';
    import { ActionListSection, MessageProps } from '../../../../types/types.js';
    import ArrayValidator from '../../../../utilities/validators/ArrayValidator';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    export default {
        name: 'PMenu',
        components: {
            PActionList, PPopover, PMessage,
        },
        props: {
            /**
             * Id for the Menu
             */
            id: {
                type: String,
                required: true,
            },
            /**
             * An array of action objects that are rendered inside of a popover triggered by this menu
             */
            actions: {
                type: Array,
                default: () => ([]),
                ...ArrayValidator('actions', [...ActionListSection]),
            },
            /**
             * Accepts a message that facilitates direct, urgent communication with the merchant through the menu
             */
            message: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('message', MessageProps),
            },
            /**
             * A boolean property indicating whether the menu is currently open
             */
            open: {
                type: Boolean,
            },
            /**
             * A callback function to handle opening the menu popover
             */
            /* tslint:disable-next-line */
            onOpen: {
                type: Function,
                default: () => {
                },
            },
            /**
             * A callback function to handle closing the menu popover
             */
            onClose: {
                type: Function,
            },
            /**
             * A string that provides the accessibility labeling
             */
            accessibilityLabel: {
                type: String,
                default: null,
            },
        },
        data() {
            return {
                focused: true,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Popover__Section',
                    'Polaris-Popover__Section+ Polaris-Popover__Section',
                );
            },
            isFullHeight() {
                return Object.keys(this.message).length > 0;
            },
        },
    }
</script>

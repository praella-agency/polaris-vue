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
                    <slot name="activatorContent">
                        <span>
                            <PIcon :source="icon"/>
                            <PVisuallyHidden>Secondary menu</PVisuallyHidden>
                        </span>
                    </slot>
                </button>
            </div>
            <PActionList slot="content" :sections="actions"/>
            <PMessage
                slot="content"
                v-if="Object.keys(message).length > 0"
                :title="message.title"
                :description="message.description"
                :action="Object.keys(message).length > 0 ? message.action: {}"
                :link="Object.keys(message).length > 0 ? message.link : {}"
                :badge="message && message.badge ? message.badge : {}"
            />
        </PPopover>
    </div>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PActionList } from '../../../../components/PActionList';
    import { PPopover } from '../../../../components/PPopover';
    import { PMessage } from './components/PMessage';
    import { PVisuallyHidden } from '../../../../components/PVisuallyHidden';
    import { PIcon } from '../../../../components/PIcon';
    import { ActionListSection } from '../../../../types';
    import ArrayValidator from '../../../../utilities/validators/ArrayValidator';

    export default {
        name: 'PMenu',
        components: {
            PActionList, PPopover, PMessage, PVisuallyHidden, PIcon,
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
                ...ArrayValidator('actions', ActionListSection),
            },
            /**
             * Accepts a message that facilitates direct, urgent communication with the merchant through the menu
             */
            message: {
                type: Object,
                default: () => ({}),
            },
            /**
             * A boolean property indicating whether the menu is currently open
             */
            open: {
                type: Boolean,
                required: true,
            },
            /**
             * Icon to display on activator content
             */
            icon: {
                type: String,
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

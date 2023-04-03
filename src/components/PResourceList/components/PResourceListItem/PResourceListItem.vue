<template>
    <li class="Polaris-ResourceList__ItemWrapper">
        <div :class="className" :data-href="url">
            <a v-if="url" :aria-describedby="id" :aria-label="`View details for ${itemName}`"
               class="Polaris-ResourceItem__Link" :tabindex="tabIndex" id="PolarisResourceListItemOverlay3" :href="url"
               data-polaris-unstyled="true"/>
            <button v-else class="Polaris-ResourceItem__Button" ref="buttonOverlay"
                    :aria-label="`View details for ${itemName}`" :aria-controls="ariaControls"
                    :aria-expanded="ariaExpanded" :tabIndex="tabIndex"/>
            <div class="Polaris-ResourceItem__Container" :id="id">
                <div :class="ownedClassName">
                    <div class="Polaris-ResourceItem__Handle" v-if="selectable">
                        <div class="Polaris-ResourceItem__CheckboxWrapper" @click="stopPropagation">
                            <PCheckbox label="Select item" :checked="checked" labelHidden :id="checkboxId"
                                       @change="handleChange" :disabled="loading"></PCheckbox>
                        </div>
                    </div>
                    <div class="Polaris-ResourceItem__Media" v-if="isSlot($slots.media)">
                        <!-- @slot Content for the media area at the left of the item, usually an Avatar or Thumbnail -->
                        <slot name="media"/>
                    </div>
                </div>

                <div class="Polaris-ResourceItem__Content" v-if="isSlot($slots.default)">
                    <!-- @slot Content for the details area -->
                    <slot/>
                </div>

                <div
                    v-if="shortcutActions.length > 0 && !loading"
                >
                    <div
                        v-if="persistActions"
                        class="Polaris-ResourceItem__Actions"
                        @click="stopPropagation"
                    >
                        <PButtonGroup>
                            <PButton
                                plain
                                v-for="(shortcutAction, key) in shortcutActions"
                                :key="key"
                                @click="shortcutAction.onAction()"
                            >
                                {{ shortcutAction.content }}
                            </PButton>
                        </PButtonGroup>

                    </div>
                    <div v-else
                         class="Polaris-ResourceItem__Actions"
                         @click="stopPropagation"
                    >
                        <PButtonGroup segmented id="ShortcutActions">
                            <PButton
                                size="slim"
                                v-for="(shortcutAction, key) in shortcutActions"
                                :key="key"
                                @click="shortcutAction.onAction()"
                            >
                                {{ shortcutAction.content }}
                            </PButton>
                        </PButtonGroup>
                    </div>
                </div>
                <div
                    class="Polaris-ResourceItem__Disclosure"
                    @click="stopPropagation"
                >
                    <PPopover
                        :id="`popover${id}`"
                        :active="actionMenuVisible"
                        preferredAlignment="right"
                        @close="handlePopoverClick"
                    >
                        <template #activator>
                            <PButton
                                accessibilityLabel="Actions"
                                @click.stop="handlePopoverClick"
                                plain
                                icon="HorizontalDotsMinor"
                            />
                        </template>
                        <template #content>
                            <PActionList :items="shortcutActions"/>
                        </template>
                    </PPopover>
                </div>
            </div>
        </div>
    </li>
</template>


<script setup>
    import { computed, ref, useSlots } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { DisableableAction } from '../../../../types';
    import { PCheckbox } from '../../../../components/PCheckbox';
    import { PPopover } from '../../../../components/PPopover';
    import { PButton } from '../../../../components/PButton';
    import { PButtonGroup } from '../../../../components/PButtonGroup';
    import { PActionList } from '../../../../components/PActionList';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import ArrayValidator from '../../../../utilities/validators/ArrayValidator';
    import StringValidator from '../../../../utilities/validators/StringValidator';
    import { Alignment } from '../../../variables';

    let props = defineProps({
        // Deprecated Start
        checked: {
            type: Boolean,
            default: false,
        },
        // Deprecated End
        /**
         * Name of the resource, such as customers or products
         */
        resourceName: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('resourceName', {
                singular: {
                    type: String,
                    required: true,
                },
                plural: {
                    type: String,
                    required: true,
                },
            }),
        },
        /**
         * Visually hidden text for screen readers used for item link
         */
        accessibilityLabel: {
            type: String,
            default: null,
        },
        /**
         * Individual item name used by various text labels
         */
        name: {
            type: String,
            default: null,
        },
        /**
         * Renders a Select All button at the top of the list and checkboxes in front of each list item.
         * For use when bulkActions aren't provided.
         */
        selectable: {
            type: Boolean,
            default: false,
        },
        /**
         * Overlays item list with a spinner while a background action is being performed
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Set to activate the selectable items for small screen
         */
        selectMode: {
            type: Boolean,
            default: false,
        },
        /**
         * Id of the element the item onClick controls
         */
        ariaControls: {
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
         * Unique identifier for the item
         */
        id: {
            type: [String, Number],
            required: true,
        },
        /**
         * Makes the shortcut actions always visible
         */
        persistActions: {
            type: Boolean,
            default: false,
        },
        /**
         * 1 or 2 shortcut actions; must be available on the page linked to by url
         */
        shortcutActions: {
            type: Array,
            default: () => ([]),
            ...ArrayValidator('shortcutActions', DisableableAction),
        },
        /**
         * The order the item is rendered
         */
        sortOrder: {
            type: Number,
            default: null,
        },
        /**
         * URL for the resource’s details page (required unless onClick is provided)
         */
        url: {
            type: String,
            default: null,
        },
        /**
         * Allows url to open in a new tab
         */
        external: {
            type: Boolean,
            default: false,
        },
        /**
         * Adjust vertical alignment of elements
         */
        verticalAlignment: {
            type: String,
            default: null,
            ...StringValidator('verticalAlignment', Alignment),
        },
        /**
         * Prefetched url attribute to bind to the main element being returned
         */
        dataHref: {
            type: String,
            default: null,
        },
    });
    const emit = defineEmits(['change']);
    let slots = useSlots();

    let actionMenuVisible = ref(false);

    let className = computed(() => {
        return classNames(
            'Polaris-ResourceItem',
            props.selectable && 'Polaris-ResourceItem--selectable',
            props.selectMode && 'Polaris-ResourceItem--selectMode',
            props.persistActions && 'Polaris-ResourceItem--persistActions',
        );
    });

    let ownedClassName = computed(() => {
        return classNames(
            'Polaris-ResourceItem__Owned',
            !hasSlot(slots.media) && 'Polaris-ResourceItem__OwnedNoMedia',
        );
    });

    let checkboxId = computed(() => {
        return `ResourceListCheckBox--${props.id}`;
    });

    let tabIndex = computed(() => {
        return props.loading ? -1 : 0;
    });

    let itemName = computed(() => {
        return props.accessibilityLabel || (props.name || (Object.keys(props.resourceName).length > 0 ? props.resourceName.singular : '') || '');
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handleChange(event) {
        emit('change', props.id, event.checked);
    }

    function stopPropagation(event) {
        event.stopPropagation();
    }

    function handlePopoverClick() {
        actionMenuVisible.value = !actionMenuVisible.value;
    }
</script>

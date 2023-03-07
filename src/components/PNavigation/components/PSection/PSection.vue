<template>
    <ul :class="className">
        <li v-if="title" class="Polaris-Navigation__SectionHeading">
            <span class="Polaris-Navigation__Text">{{ title }}</span>
            <button
                v-if="Object.keys(action).length > 0"
                type="button"
                class="Polaris-Navigation__Action"
                :aria-label="action.accessibilityLabel"
                @click="action.onClick"
            >
                <PIcon :source="action.icon"/>
            </button>
        </li>
        <PItem
            v-for="(sectionItem, key) in sectionItems"
            :key="key"
            :label="sectionItem.label"
            :subNavigationItems="sectionItem.subNavigationItems"
            @click="handleClick(sectionItem.onClick, sectionItem.hasOwnProperty('subNavigationItems') ?
                            sectionItem.subNavigationItems.length > 0 : false)"
            v-bind="sectionItem"
            :location="location"
            :onNavigationDismiss="onNavigationDismiss"
        >
            <template v-slot:icon="slotProps">
                <slot name="icon" :item="slotProps ? slotProps.item : {}"/>
            </template>
        </PItem>
        <li
            v-if="Object.keys(rollup).length > 0 && additionalItems.length > 0"
            class="Polaris-Navigation__RollupSection"
        >
            <PCollapsible
                :id="`AdditionalItems#${isUuid}`"
                :open="expanded"
            >
                <ul
                    class="Polaris-Navigation__List"
                >
                    <PItem
                        v-for="(additionalItem, key) in additionalItems"
                        :key="key"
                        :label="additionalItem.label"
                        :subNavigationItems="additionalItem.subNavigationItems"
                        @click="handleClick(additionalItem.onClick,
            additionalItem.subNavigationItems ? additionalItem.subNavigationItems.length > 0 : false)"
                        v-bind="additionalItem"
                        :location="location"
                        :onNavigationDismiss="onNavigationDismiss"
                    >
                        <template v-slot:icon="slotProps">
                            <slot name="icon" :item="slotProps ? slotProps.item : {}"/>
                        </template>
                    </PItem>
                </ul>
            </PCollapsible>
            <div
                v-if="Object.keys(rollup).length > 0 && items.length > rollup.after"
                class="Polaris-Navigation__ListItem"
                :key="`List Item`"
            >
                <button
                    type="button"
                    class="Polaris-Navigation__Item Polaris-Navigation__RollupToggle"
                    @click="toggleExpanded"
                    :aria-label="Object.keys(rollup).length > 0 && (expanded ? rollup.view : rollup.hide)"
                    :aria-controls="`AdditionalItems#${isUuid}`"
                    :testID="`ToggleViewAll`"
                >
                    <span class="Polaris-Navigation__Icon">
                        <PIcon source="HorizontalDotsMinor"/>
                    </span>
                </button>
            </div>
        </li>
    </ul>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PItem } from '../../../../components/PNavigation/components/PItem';
    import { PIcon } from '../../../../components/PIcon';
    import { PCollapsible } from '../../../../components/PCollapsible';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import {Breakpoints, noWindowMatches, Rollup} from '../../../variables';

    let props = defineProps({
        items: {
            type: Array,
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
        title: {
            type: String,
            default: null,
        },
        fill: {
            type: Boolean,
            default: false,
        },
        rollup: {
            type: [Object, Rollup],
            default: () => ({}),
            ...ObjectValidator('rollup', Rollup),
        },
        action: {
            type: Object,
            default: () => ({}),
        },
        separator: {
            type: Boolean,
            default: false,
        },
        /*Navigation Props*/
        location: {
            type: String,
            default: null,
        },
        onNavigationDismiss: {
            type: Function,
        },
    });


    let animationFrame = ref(null);
    let itemsMarkup = ref(props.items);
    let expanded = ref(false);

    let className = computed(() => {
        return classNames(
            'Polaris-Navigation__Section',
            props.separator && 'Polaris-Navigation__Section--withSeparator',
            props.fill && 'Polaris-Navigation__Section--fill',
        );
    });

    let additionalItems = computed(() => {
        return Object.keys(props.rollup).length > 0 ? itemsMarkup.value.slice(props.rollup.after) : [];
    });

    let sectionItems = computed(() => {
        return Object.keys(props.rollup).length > 0 ? itemsMarkup.value.slice(0, props.rollup.after) : itemsMarkup.value;
    });

    let isUuid = computed(() => {
        return uuid();
    });

    function navigationBarCollapsed() {
        return typeof window === 'undefined' ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
    }

    function toggleExpanded() {
        expanded.value = !expanded.value;
    }

    function handleClick(onClick, hasSubNavItems) {
        if (onClick) {
            onClick();
        }

        if (animationFrame.value) {
            cancelAnimationFrame(animationFrame.value);
        }

        if (!hasSubNavItems || navigationBarCollapsed().matches) {
            animationFrame.value = requestAnimationFrame(() => {
                    expanded.value = false;
                },
            );
        }
    }

    watch(animationFrame, (value) => {
        return value && cancelAnimationFrame(value);
    });
</script>

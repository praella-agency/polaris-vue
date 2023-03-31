<template>
    <li role="presentation" :class="className">
        <button
            v-if="!to && !url"
            role="tab"
            :id="id"
            type="button"
            :tabindex="tabIndex"
            :aria-selected="selected"
            :aria-control="`${id}-panel`"
            :class="elementClassName"
            @click="emit('click', id, $event)"
        >
            <span v-if="Object.keys(icon).length > 0" class="Polaris-VerticalTabs__TabElement--icon">
                <PIcon v-bind="icon"/>
            </span>
            <span class="Polaris-VerticalTabs__Title">
                {{ content }}
            </span>
            <span v-if="Object.keys(badge).length > 0">
                <PBadge v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </button>

        <a
            v-else-if="url"
            :id="id"
            :href="url"
            :target="external ? '_blank' : ''"
            :tabindex="tabIndex"
            :class="elementClassName"
            :aria-selected="selected"
            :aria-control="`${id}-panel`"
            @click="emit('click', id, $event)"
        >
            <span v-if="Object.keys(icon).length > 0" class="Polaris-VerticalTabs__TabElement--icon">
                <PIcon v-bind="icon"/>
            </span>
            <span class="Polaris-VerticalTabs__Title">
                {{ content }}
            </span>
            <span v-if="Object.keys(badge).length > 0">
                <PBadge v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </a>

        <router-link
            v-else
            :tabindex="tabIndex"
            :active-class="activeClass"
            :class="elementClassName"
            :to="to"
            :aria-selected="selected"
            :aria-control="`${id}-panel`"
            @click.native="emit('click', id, $event)"
        >
            <span v-if="icon && Object.keys(icon).length > 0" class="Polaris-VerticalTabs__TabElement--icon">
                <PIcon v-bind="icon"/>
            </span>
            <span class="Polaris-VerticalTabs__Title">
                {{ content }}
            </span>
            <span v-if="badge && Object.keys(badge).length > 0">
                <PBadge v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </router-link>
    </li>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../PIcon/';
    import { PBadge } from '../../../PBadge';

    let props = defineProps({
        id: {
            type: [String, Number],
        },
        focused: {
            type: Boolean,
        },
        selected: {
            type: Boolean,
        },
        to: {
            type: [String, Object],
        },
        url: {
            type: String,
        },
        content: {
            type: String,
            default: null,
        },
        external: {
            type: Boolean,
        },
        activeClass: {
            type: String,
            default: 'Polaris-VerticalTabs__TabElement--selected',
        },
        badge: {
            type: Object,
            default: () => ({}),
        },
        icon: {
            type: Object,
            default: () => ({}),
        },
        tabsPosition: {
            type: String,
            default: 'left',
        },
    });
    const emit = defineEmits(['click']);

    let className = computed(() => {
        return classNames(
            props.tabsPosition === 'left' && 'Polaris-VerticalTabs__Tab',
            props.tabsPosition === 'right' && 'Polaris-VerticalTabs__Tab--Right',
            props.selected && 'Polaris-VerticalTabs__Tab--selected',
        );
    });

    let elementClassName = computed(() => {
        return classNames(
            props.tabsPosition === 'left' && 'Polaris-VerticalTabs__TabElement',
            props.tabsPosition === 'left' && props.selected && 'Polaris-VerticalTabs__TabElement--selected',
            props.tabsPosition === 'right' && 'Polaris-VerticalTabs__TabElement--Right',
            props.tabsPosition === 'right' && props.selected && 'Polaris-VerticalTabs__TabElement--Right--selected',
        );
    });

    let tabIndex = computed(() => {
        return props.selected ? 0 : -1;
    });
</script>

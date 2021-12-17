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
            @click="$emit('click', id, $event)"
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
            @click="$emit('click', id, $event)"
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
            @click.native="$emit('click', id, $event)"
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

<script>
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../PIcon/';
    import { PBadge } from '../../../PBadge';

    const Color = 'base' | 'subdued' | 'critical' | 'interactive' | 'warning' | 'highlight' | 'success' | 'primary';

    const Icon = {
        source: String | 'placeholder',
        color: Color,
        backdrop: Boolean,
        accessibilityLabel: String,
    }

    const Badge = {
        content: String,
        status: String,
        progress: String,
        background: String,
        color: String,
        size: String,
    }

    export default {
        name: 'PVerticalTab',
        components: {
            PIcon, PBadge,
        },
        props: {
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
            }
        },
        computed: {
            className() {
                return classNames(
                    this.tabsPosition === 'left' && 'Polaris-VerticalTabs__Tab',
                    this.tabsPosition === 'right' && 'Polaris-VerticalTabs__Tab--Right',
                    this.selected && 'Polaris-VerticalTabs__Tab--selected',
                );
            },
            elementClassName() {
                return classNames(
                    this.tabsPosition === 'left' && 'Polaris-VerticalTabs__TabElement',
                    this.tabsPosition === 'left' && this.selected && 'Polaris-VerticalTabs__TabElement--selected',
                    this.tabsPosition === 'right' && 'Polaris-VerticalTabs__TabElement--Right',
                    this.tabsPosition === 'right' && this.selected && 'Polaris-VerticalTabs__TabElement--Right--selected',
                );
            },
            tabIndex() {
                return this.selected ? 0 : -1;
            },
        }
    }
</script>

<style scoped>

</style>
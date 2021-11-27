<template>
    <li :class="tabContainerClassNames">
        <button
            v-if="!to && !url"
            :id="id"
            type="button"
            :tabIndex="tabIndex"
            :class="className"
            @click="$emit('click', id, $event)"
        >
            <span :class="tabTitleClassNames">
                {{ content }}
                <PBadge v-if="badge && Object.keys(badge).length > 0" v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </button>

        <a
            v-else-if="url"
            :id="id"
            :href="url"
            :target="external ? '_blank' : ''"
            :tabIndex="tabIndex"
            :class="className"
            @click="$emit('click', id, $event)"
        >
            <span :class="tabTitleClassNames">
                {{ content }}
                <PBadge v-if="badge && Object.keys(badge).length > 0" v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </a>

        <router-link
            v-else
            :id="id"
            :tabIndex="tabIndex"
            :active-class="activeClass"
            :class="className"
            :to="to"
            @click.native="$emit('click', id, $event)"
        >
            <span :class="tabTitleClassNames">
                {{ content }}
                <PBadge v-if="badge && Object.keys(badge).length > 0" v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </router-link>
    </li>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PBadge } from '../../../../components/PBadge';

    const Badge = {
        content: String,
        status: String,
        progress: String,
        background: String,
        color: String,
        size: String,
    }

    export default {
        name: 'PTab',
        components: {
            PBadge,
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
                default: 'Polaris-Tabs__Tab--selected',
            },
            badge: {
                type: Object,
                default: () => ({}),
            },
            siblingTabHasFocus: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Tabs__Tab',
                    this.selected && `Polaris-Tabs__Tab--selected`,
                );
            },
            tabContainerClassNames() {
                return classNames(
                    'Polaris-Tabs__TabContainer',
                );
            },
            tabTitleClassNames() {
                return classNames(
                    'Polaris-Tabs__Title',
                );
            },
            tabIndex() {
                if (this.selected && !this.siblingTabHasFocus) {
                    return 0;
                } else if (this.focused) {
                    return 0;
                }
                return -1;
            },
        },
    }
</script>

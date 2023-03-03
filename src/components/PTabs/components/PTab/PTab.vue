<template>
    <li :class="tabContainerClassNames">
        <button
            v-if="!to && !url"
            :id="id"
            type="button"
            :tabIndex="tabIndex"
            :class="className"
            @click="emit('click', id, $event)"
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
            @click="emit('click', id, $event)"
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
            :exact-active-class="activeClass"
            :class="className"
            :to="to"
            @click.native="emit('click', id, $event)"
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

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import { PBadge } from '../../../../components/PBadge';

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
    });

    let emit = defineEmits(['click']);

    let className = computed(() => {
        return classNames(
            'Polaris-Tabs__Tab',
            props.selected && `Polaris-Tabs__Tab--selected`,
        );
    });

    let tabContainerClassNames = computed(() => {
        return classNames(
            'Polaris-Tabs__TabContainer',
        );
    });

    let tabTitleClassNames = computed(() => {
        return classNames(
            'Polaris-Tabs__Title',
            props.selected && 'Polaris-Tab__Tab--selected-title',
        );
    });

    let tabIndex = computed(() => {
        if (props.selected && !props.siblingTabHasFocus) {
            return 0;
        } else if (props.focused) {
            return 0;
        }
        return -1;
    });
</script>

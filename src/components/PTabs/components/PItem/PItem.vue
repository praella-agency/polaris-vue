<template>
    <li>
        <button
            v-if="!to && !url"
            type="button"
            :id="id"
            ref="focusedNode"
            @click="handleClick"
            class="Polaris-Tabs__Item"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </button>

        <a
            v-else-if="url"
            :id="id"
            ref="focusedNode"
            @click="handleClick"
            class="Polaris-Tabs__Item"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </a>

        <router-link
            v-else
            tabindex="-1"
            ref="focusedNode"
            class="Polaris-Tabs__Item"
            :to="to"
            @click.native="handleClick"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </router-link>
    </li>
</template>

<script>
    export default {
        name: 'PItem',
        props: {
            id: {
                type: String,
                required: true
            },
            focused: {
                type: Boolean,
                required: true,
            },
            panelID: {
                type: String,
                default: null,
            },
            url: {
                type: String,
                default: null,
            },
            to: {
                type: [Object, String],
            },
            accessibilityLabel: {
                type: String,
                default: null,
            },
        },
        emits: ['click'],
        methods: {
            handleClick() {
                this.$emit('click');
            }
        },
        mounted() {
            if (
                (this.$refs.focusedNode) &&
                (this.$refs.focusedNode) instanceof HTMLElement &&
                this.focused
            ) {
                (this.$refs.focusedNode).focus();
            }
        },
        updated() {
            if (
                (this.$refs.focusedNode) &&
                (this.$refs.focusedNode) instanceof HTMLElement &&
                this.focused
            ) {
                (this.$refs.focusedNode).focus();
            }
        },
    }
</script>

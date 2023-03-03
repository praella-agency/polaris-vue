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

<script setup>
    import { ref, onMounted, onUpdated } from 'vue';

    let props = defineProps({
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
    });

    let focusedNode = ref(null);
    const emits = defineEmits(['click']);

    function handleClick() {
        emit('click');
    }

    onMounted(() => {
        focusedNode = focusedNode.value
        if ((focusedNode) && (focusedNode) instanceof HTMLElement && props.focused) {
            (focusedNode).focus();
        }
    });

    onUpdated(() => {
        if ((focusedNode) && (focusedNode) instanceof HTMLElement && this.focused) {
            (focusedNode).focus();
        }
    });
</script>

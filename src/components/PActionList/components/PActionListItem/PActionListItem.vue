<template>
    <li>
        <button
            @click="handleAction(action)"
            :disabled="disabled"
            :class="className">
            <template v-if="(icon || image) || isSlot($slots.media)">
                <span class="Polaris-ActionList__Content">
                    <span
                        role="presentation"
                        :class="mediaSlotClassName"
                        :style="{ backgroundImage: icon ? null : 'url('+image+')'}"
                    >
                        <slot name="media" :item="listValues">
                            <PIcon v-if="icon" :source="icon"/>
                        </slot>
                    </span>
                    <span class="Polaris-ActionList__Text">
                        <slot>
                            <slot name="content">
                                <span>{{ content }}</span>
                                <slot name="helpText">
                                    <span class="Polaris-TextStyle--variationSubdued"
                                          v-if="helpText">{{ helpText }}</span>
                                </slot>
                            </slot>
                        </slot>
                    </span>
                </span>
            </template>
            <template v-else>
                <slot>
                    <slot name="content">
                        <span>{{ content }}</span>
                        <slot name="helpText">
                            <span class="Polaris-TextStyle--variationSubdued" v-if="helpText">{{ helpText }}</span>
                        </slot>
                    </slot>
                </slot>
            </template>
        </button>
    </li>
</template>

<script setup>
    import { computed } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';

    let props = defineProps({
        content: {
            type: String,
        },
        helpText: {
            type: String,
        },
        action: {
            type: Object,
        },
        icon: {
            type: String,
        },
        image: {
            type: String,
        },
        disabled: {
            type: Boolean,
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-ActionList__Item',
        );
    });

    let mediaSlotClassName = computed(() => {
        return classNames(
            'Polaris-ActionList__Prefix',
        );
    });

    let listValues = computed(() => {
        return {
            content: props.content,
            helpText: props.helpText,
            action: props.action,
            icon: props.icon,
            image: props.image,
            disabled: props.disabled,
        };
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handleAction(action) {
        let res = true;
        if (action.onAction) {
            res = action.onAction();
        }
        if (res && action.url) {
            window.location.href = action.url;
        }
    }
</script>

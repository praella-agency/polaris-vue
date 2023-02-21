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

<script>
    import { defineComponent, computed } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PUnstyledLink } from '../../../../components/PUnstyledLink';
    import { PIcon } from '../../../../components/PIcon';

    export default defineComponent({
        name: 'PActionListItem',
        components: {
            PUnstyledLink, PIcon,
        },
        props: {
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
        },
        setup(props) {
            const className = computed(() => {
                return classNames(
                    'Polaris-ActionList__Item',
                );
            });
            const mediaSlotClassName = computed(() => {
                return classNames(
                    'Polaris-ActionList__Prefix',
                );
            });
            const listValues = computed(() => {
                return {
                    content: props.content,
                    helpText: props.helpText,
                    action: props.action,
                    icon: props.icon,
                    image: props.image,
                    disabled: props.disabled,
                };
            });
            const isSlot = computed(() => {
                return hasSlot;
            })

            function handleAction(action) {
                let res = true;
                if (action.onAction) {
                  res = action.onAction();
                }
                if (res && action.url) {
                  window.location.href = action.url;
                }
            }

            return { className, mediaSlotClassName, listValues, isSlot, handleAction }
        }
    })
</script>

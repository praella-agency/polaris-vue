<template>
    <li>
        <button
            @click="handleAction(action)"
            :disabled="disabled"
            :class="className">
            <template v-if="(icon || image) || hasSlot($slots.media)">
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
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PUnstyledLink } from '../../../../components/PUnstyledLink';
    import { PIcon } from '../../../../components/PIcon';

    export default {
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
        computed: {
            className() {
                return classNames(
                    'Polaris-ActionList__Item',
                );
            },
            mediaSlotClassName() {
                return classNames(
                    'Polaris-ActionList__Prefix',
                );
            },
            listValues() {
                return {
                    content: this.content,
                    helpText: this.helpText,
                    action: this.action,
                    icon: this.icon,
                    image: this.image,
                    disabled: this.disabled,
                };
            },
            hasSlot() {
                return hasSlot;
            },
        },
        methods: {
            handleAction(action) {
                let res = true;
                if (action.onAction) {
                    res = action.onAction();
                }
                if (res && action.url) {
                    window.location.href = action.url;
                }
            },
        }
    }
</script>

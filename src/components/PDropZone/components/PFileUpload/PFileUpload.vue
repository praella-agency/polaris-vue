<template>
    <div :class="className">
        <template v-if="(size === 'extraLarge' || size === 'large') && variableHeight">
            <PStack vertical spacing="tight">
                <PStackItem>
                    <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                        <div :class="buttonStyleClassName">
                            {{ actionTitle }}
                        </div>
                    </template>
                </PStackItem>
                <PStackItem>
                    <PCaption>
                        <PTextStyle variation="subdued">
                            {{ actionHint }}
                        </PTextStyle>
                    </PCaption>
                </PStackItem>
            </PStack>
        </template>
        <template v-else-if="size === 'extraLarge'">
            <PStack vertical>
                <PStackItem>
                    <PIcon source="UploadMajor" color="base" style="width: 40px; height: unset;"/>
                </PStackItem>
                <PStackItem>
                    <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                        <div :class="buttonStyleClassName" :disabled="disabled">
                            {{ actionTitle }}
                        </div>
                    </template>
                </PStackItem>
                <PStackItem>
                    <PTextStyle variation="subdued">
                        {{ actionHint }}
                    </PTextStyle>
                </PStackItem>
            </PStack>
        </template>
        <template v-else-if="size === 'large'">
            <PStack vertical spacing="tight">
                <PStackItem>
                    <PIcon source="UploadMajor" color="base" style="width: 40px; height: unset;"/>
                </PStackItem>
                <PStackItem>
                    <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                        <div :class="buttonStyleClassName">
                            {{ actionTitle }}
                        </div>
                    </template>
                </PStackItem>
                <PStackItem>
                    <PCaption>
                        <PTextStyle variation="subdued">
                            {{ actionHint }}
                        </PTextStyle>
                    </PCaption>
                </PStackItem>
            </PStack>
        </template>
        <!--        <template v-else-if="size === 'medium'">-->
        <!--            <PStack vertical spacing="tight">-->
        <!--                <PStackItem>-->
        <!--                    <div :class="actionTitleClassName">-->
        <!--                        {{ actionTitle }}-->
        <!--                    </div>-->
        <!--                </PStackItem>-->
        <!--                <PStackItem>-->
        <!--                    <PCaption>-->
        <!--                        <PTextStyle variation="subdued">-->
        <!--                            {{ actionHint }}-->
        <!--                        </PTextStyle>-->
        <!--                    </PCaption>-->
        <!--                </PStackItem>-->
        <!--            </PStack>-->
        <!--        </template>-->
        <!--        <template v-else-if="size === 'small'">-->
        <!--        <PIcon source="UploadMajor" color="base" style="width: 40px; height: unset;"/>-->
        <!--        </template>-->
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import { PStack } from '../../../../components/PStack';
    import { PStackItem } from '../../../../components/PStack/components/PStackItem';
    import { PCaption } from '../../../../components/PCaption';
    import { PTextStyle } from '../../../../components/PTextStyle';
    import { PIcon } from '../../../../components/PIcon';
    import { Context } from '../../context';

    let props = defineProps({
        actionTitle: {
            type: String,
        },
        actionHint: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: null
        },
        variableHeight: {
            type: Boolean,
            default: false,
        },
    });

    let measuring = ref(Context.measuring);
    let type = ref(Context.type);
    let focused = ref(Context.focused);
    let allowMultiple = ref(Context.allowMultiple);

    let className = computed(() => {
        return classNames(
            'Polaris-DropZone-FileUpload',
            measuring.value && 'Polaris-DropZone--measuring',
            // this.size === 'small' && 'Polaris-DropZone-FileUpload__FileUploadSmallView',
        );
    });

    let buttonStyleClassName = computed(() => {
        return (props.size === 'extraLarge' || props.size === 'large') ?
            classNames(
                'Polaris-DropZone-FileUpload__Button',
                (props.size && props.size !== 'extraLarge') && 'Polaris-DropZone-FileUpload--sizeSlim',
                focused.value && 'Polaris-DropZone-FileUpload--focused',
                props.disabled && 'Polaris-DropZone-FileUpload--disabled',
            ) : null;
    });

    let actionTitleClassName = computed(() => {
        return classNames('Polaris-DropZone-FileUpload__ActionTitle',
            focused.value && !props.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--focused',
            props.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--disabled',
        );
    });
</script>

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

<script>
    import { classNames } from '../../../../utilities/css';
    import { PStack } from '../../../../components/PStack';
    import { PStackItem } from '../../../../components/PStack/components/PStackItem';
    import { PCaption } from '../../../../components/PCaption';
    import { PTextStyle } from '../../../../components/PTextStyle';
    import { PIcon } from '../../../../components/PIcon';
    import { Context, createAllowMultipleKey, capitalize } from '../../../../components/PDropZone/context';

    export default {
        name: 'PFileUpload',
        components: {
            PStack, PCaption, PTextStyle, PStackItem, PIcon,
        },
        props: {
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
        },
        data() {
            return {
                measuring: Context.measuring,
                type: Context.type,
                focused: Context.focused,
                allowMultiple: Context.allowMultiple,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-DropZone-FileUpload',
                    this.measuring && 'Polaris-DropZone--measuring',
                    // this.size === 'small' && 'Polaris-DropZone-FileUpload__FileUploadSmallView',
                );
            },
            buttonStyleClassName() {
                return (this.size === 'extraLarge' || this.size === 'large') ?
                    classNames(
                        'Polaris-DropZone-FileUpload__Button',
                        (this.size && this.size !== 'extraLarge') && 'Polaris-DropZone-FileUpload--sizeSlim',
                        this.focused && 'Polaris-DropZone-FileUpload--focused',
                        this.disabled && 'Polaris-DropZone-FileUpload--disabled',
                    ) : null;
            },
            actionTitleClassName() {
                return classNames('Polaris-DropZone-FileUpload__ActionTitle',
                    this.focused && !this.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--focused',
                    this.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--disabled',
                );
            },
        },
    }
</script>

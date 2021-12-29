<template>
    <header class="Polaris-PreviewFrame__HeaderArea" aria-label="Polaris Preview Theme Header">
        <div class="Polaris-PreviewFrame__SkipToAction">
            <a href="#Polaris-PreviewFrame-SkipTarget" class="Polaris-PreviewFrame__SkipAnchor"
               aria-label="Set focus on this page's main content area.">
                Skip to main content
            </a>
        </div>
        <div :class="topBarClassName">
            <div :class="leftLayoutClassName">
                <slot name="header.left">
                    <PHeading>TopBar Left</PHeading>
                </slot>
            </div>

            <template v-if="!slimHeader">
                <div :class="centerLayoutClassName">
                    <slot name="header.center">
                        <PHeading>TopBar Center</PHeading>
                    </slot>
                </div>

                <div :class="rightLayoutClassName">
                    <div :class="rightLayoutChildClassName">
                        <template v-if="showPreviewOptions">
                            <PPopover
                                id="change_preview"
                                :active="isPreview"
                                @close="() => {this.isPreview = false;}"
                                preferred-alignment="left"
                            >
                                <PButton
                                    slot="activator"
                                    :icon="previewIcon"
                                    plainAction
                                    @click="() => {this.isPreview = !this.isPreview}"
                                />
                                <POptionList
                                    slot="content"
                                    :options="previewOptions"
                                    :selected="selectedOption"
                                    @click="handlePreviewClick"
                                >
                                    <template v-slot:media="{item}">
                                        <PIcon :source="item.icon"/>
                                    </template>
                                </POptionList>
                            </PPopover>
                            <PVerticalDivider/>
                        </template>
                        <template v-if="showUndoRedo">
                            <PButton
                                plainAction
                                icon="UndoMajor"
                                :disabled="undoActions.disabled"
                                v-on="(typeof undoActions.onAction === 'function') ? {click: undoActions.onAction} : {}"
                            />
                            <PButton
                                plainAction
                                icon="RedoMajor"
                                :disabled="redoActions.disabled"
                                v-on="redoActions.onAction ? { click: redoActions.onAction} : {}"
                            />
                            <PVerticalDivider/>
                        </template>
                    </div>

                    <div v-if="$slots['header.right']" :class="rightLayoutChildClassName">
                        <slot name="header.right">
                            <PHeading>Right Corner</PHeading>
                        </slot>
                    </div>
                </div>
            </template>

            <div class="Polaris-PreviewFrame__HeaderBlank"></div>
        </div>
    </header>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PHeading } from '../../../../components/PHeading';
    import { PButton } from '../../../../components/PButton';
    import { PPopover } from '../../../../components/PPopover';
    import { POptionList } from '../../../../components/POptionList';
    import { PIcon } from '../../../../components/PIcon';
    import { PVerticalDivider } from '../../../../components/PVerticalDivider';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    const UndoActions = {
        disabled: Boolean,
        onAction: Function,
    };

    const RedoActions = {
        disabled: Boolean,
        onAction: Function,
    };

    export default {
        name: 'PHeader',
        components: {
            PHeading, PButton, PPopover, POptionList, PIcon, PVerticalDivider,
        },
        props: {
            slimHeader: {
                type: Boolean,
                default: false,
            },
            showUndoRedo: {
                type: Boolean,
                default: false,
            },
            showPreviewOptions: {
                type: Boolean,
                default: false,
            },
            undoActions: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('undoActions', UndoActions),
            },
            redoActions: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('redoActions', RedoActions),
            },
        },
        data() {
            return {
                isPreview: false,
                selectedOption: ['desktop'],
                previewOptions: [
                    {
                        label: 'Mobile',
                        value: 'mobile',
                        icon: 'MobileMajor'
                    },
                    {
                        label: 'Desktop',
                        value: 'desktop',
                        icon: 'DesktopMajor'
                    },
                    {
                        label: 'Fullscreen',
                        value: 'fullscreen',
                        icon: 'ViewportWideMajor'
                    },
                ],
                previewIcon: 'DesktopMajor',
            };
        },
        computed: {
            topBarClassName() {
                return classNames(
                    'Polaris-PreviewFrame__TopBar',
                    this.slimHeader && 'Polaris-PreviewFrame__TopBar--slim',
                );
            },
            leftLayoutClassName() {
                return classNames(
                    'Polaris-PreviewFrame__LayoutGroup',
                    'Polaris-PreviewFrame__spacingBase',
                    !this.slimHeader && 'Polaris-PreviewFrame__LayoutGroup--shrink',
                    this.slimHeader && 'Polaris-PreviewFrame__LayoutGroup--paddedBoth Polaris-PreviewFrame__LayoutGroup--grow',
                );
            },
            centerLayoutClassName() {
                return classNames(
                    'Polaris-PreviewFrame__LayoutGroup',
                    'Polaris-PreviewFrame__spacingBase',
                    'Polaris-PreviewFrame__LayoutGroup--paddedBoth Polaris-PreviewFrame__LayoutGroup--grow',
                    'Polaris-PreviewFrame__LayoutGroup--shrink',
                    'Polaris-PreviewFrame__LayoutGroup--center',
                );
            },
            rightLayoutClassName() {
                return classNames(
                    'Polaris-PreviewFrame__LayoutGroup',
                    'Polaris-PreviewFrame__spacingBase',
                    'Polaris-PreviewFrame__LayoutGroup--paddedRight',
                );
            },
            rightLayoutChildClassName() {
                return classNames(
                    'Polaris-PreviewFrame__LayoutGroup',
                    'Polaris-PreviewFrame__spacingTight',
                );
            },
        },
        methods: {
            handlePreviewClick(selected, option) {
                this.selectedOption = selected;
                this.previewIcon = option.icon
                this.$emit('previewChange', this.selectedOption);
            }
        }
    }
</script>

<style scoped>

</style>
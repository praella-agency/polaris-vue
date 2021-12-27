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
                <slot name="leftTopBar">
                    <PHeading>TopBar Left</PHeading>
                </slot>
            </div>

            <template v-if="!slimHeader">
                <div :class="centerLayoutClassName">
                    <slot name="centerTopBar">
                        <PHeading>TopBar Center</PHeading>
                    </slot>
                </div>

                <div :class="rightLayoutClassName">
                    <div :class="rightLayoutChildClassName">
                        <slot name="rightTopBar">
                            <PHeading>Right TopBar</PHeading>
                        </slot>
                    </div>

                    <div :class="rightLayoutChildClassName">
                        <slot name="rightCorner">
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

    export default {
        name: 'PHeader',
        components: {
            PHeading,
        },
        props: {
            slimHeader: {
                type: Boolean,
                default: false,
            },
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
    }
</script>

<style scoped>

</style>
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
                <slot name="header.left"/>
            </div>

            <template v-if="!slimHeader">
                <div :class="centerLayoutClassName">
                    <slot name="header.center"/>
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
                                <template #activator>
                                    <PButton
                                        :icon="previewIcon"
                                        plainAction
                                        @click="() => {this.isPreview = !this.isPreview}"
                                    />
                                </template>
                                <template #content>
                                    <POptionList
                                        :options="previewOptions"
                                        :selected="selectedOption"
                                        @click="handlePreviewClick"
                                    >
                                        <template v-slot:media="{item}">
                                            <PIcon :source="item.icon"/>
                                        </template>
                                    </POptionList>
                                </template>
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

                    <div v-if="hasSlot($slots['header.right'])" :class="rightLayoutChildClassName">
                        <slot name="header.right"/>
                    </div>
                </div>
            </template>

            <div class="Polaris-PreviewFrame__HeaderBlank"></div>
        </div>
    </header>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PButton } from '../../../../components/PButton';
    import { PPopover } from '../../../../components/PPopover';
    import { POptionList } from '../../../../components/POptionList';
    import { PIcon } from '../../../../components/PIcon';
    import { PVerticalDivider } from '../../../../components/PVerticalDivider';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import { RedoActions, UndoActions } from '../../../variables';

    let props = defineProps({
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
    });
    const emit = defineEmits(['previewChange']);

    let isPreview = ref(false);
    let selectedOption = ref(['desktop']);
    let previewOptions = ref([
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
    ]);
    let previewIcon = ref('DesktopMajor');

    let topBarClassName = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__TopBar',
            props.slimHeader && 'Polaris-PreviewFrame__TopBar--slim',
        );
    });

    let leftLayoutClassName = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__LayoutGroup',
            'Polaris-PreviewFrame__spacingBase',
            !props.slimHeader && 'Polaris-PreviewFrame__LayoutGroup--shrink',
            props.slimHeader && 'Polaris-PreviewFrame__LayoutGroup--paddedBoth Polaris-PreviewFrame__LayoutGroup--grow',
        );
    });

    let centerLayoutClassName = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__LayoutGroup',
            'Polaris-PreviewFrame__spacingBase',
            'Polaris-PreviewFrame__LayoutGroup--paddedBoth Polaris-PreviewFrame__LayoutGroup--grow',
            'Polaris-PreviewFrame__LayoutGroup--shrink',
            'Polaris-PreviewFrame__LayoutGroup--center',
        );
    });

    let rightLayoutClassName = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__LayoutGroup',
            'Polaris-PreviewFrame__spacingBase',
            'Polaris-PreviewFrame__LayoutGroup--paddedRight',
        );
    });

    let rightLayoutChildClassName = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__LayoutGroup',
            'Polaris-PreviewFrame__spacingTight',
        );
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handlePreviewClick(selected, option) {
        selectedOption.value = selected;
        previewIcon.value = option.icon
        emit('previewChange', selectedOption.value);
    }
</script>

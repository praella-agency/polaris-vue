<template>
    <div :class="className">
        <PHeader
            :showUndoRedo="showUndoRedo"
            :slimHeader="slimHeader"
            :showPreviewOptions="showPreviewOptions"
            :undoActions="undoActions"
            :redoActions="redoActions"
            @previewChange="handlePreviewChange"
        >
            <template #header.left>
                <!-- @slot Add content or component to header left side -->
                <slot name="header.left"/>
            </template>
            <template #header.center>
                <!-- @slot Add content or component to header center -->
                <slot name="header.center"/>
            </template>
            <template #header.right>
                <!-- @slot Add content or component to header right side -->
                <slot name="header.right"/>
            </template>
        </PHeader>
        <PLeftSidebar
            v-if="!slimHeader"
            :leftSidebarTitle="leftSidebarTitle"
            :previewMode="previewOption"
            :responsiveRightSidebar="responsiveRightSidebar"
            :rightSidebarTitle="rightSidebarTitle"
            :openRightSidebar="openRightSidebar"
            @backClick="handleClick"
        >
            <template #sidebar.left.title>
                <!-- @slot Add content or component to left sidebar title -->
                <slot name="sidebar.left.title"/>
            </template>
            <template #sidebar.left.content>
                <!-- @slot Add content or component to left sidebar content -->
                <slot name="sidebar.left.content"/>
            </template>
            <template #sidebar.left.footer>
                <!-- @slot Add content or component to left sidebar footer -->
                <slot name="sidebar.left.footer"/>
            </template>

            <template #sidebar.right.title>
                <!-- @slot Add content or component to right sidebar title -->
                <slot name="sidebar.right.title"/>
            </template>
            <template #sidebar.right.content>
                <!-- @slot Add content or component to right sidebar content -->
                <slot name="sidebar.right.content"/>
            </template>
            <template #sidebar.right.footer>
                <!-- @slot Add content or component to right sidebar footer -->
                <slot name="sidebar.right.footer"/>
            </template>
        </PLeftSidebar>
        <PRightSidebar
            v-if="!responsiveRightSidebar"
            :rightSidebarTitle="rightSidebarTitle"
            :responsiveRightSidebar="responsiveRightSidebar"
            :previewMode="previewOption"
        >
            <template #sidebar.right.title>
                <!-- @slot Add content or component to right sidebar title -->
                <slot name="sidebar.right.title"/>
            </template>
            <template #sidebar.right.content>
                <!-- @slot Add content or component to right sidebar content -->
                <slot name="sidebar.right.content"/>
            </template>
            <template #sidebar.right.footer>
                <!-- @slot Add content or component to right sidebar footer -->
                <slot name="sidebar.right.footer"/>
            </template>
        </PRightSidebar>
        <PPreviewPanel :previewMode="previewOption">
            <!-- @slot The content to display inside the preview frame -->
            <slot/>
        </PPreviewPanel>
    </div>
</template>

<script setup>
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PHeader } from './components/PHeader';
    import { PLeftSidebar } from './components/PLeftSidebar';
    import { PRightSidebar } from './components/PRightSidebar';
    import { PPreviewPanel } from './components/PPreviewPanel';

    let props = defineProps({
        /**
         * Title for the left sidebar
         */
        leftSidebarTitle: {
            type: String,
            default: null,
        },
        /**
         * Title for the right sidebar
         */
        rightSidebarTitle: {
            type: String,
            default: null,
        },
        /**
         * Adjust frame content preview
         */
        showPreviewOptions: {
            type: Boolean,
            default: false,
        },
        /**
         * Displays Undo-Redo options for the header
         */
        showUndoRedo: {
            type: Boolean,
            default: false,
        },
        /**
         * Undo button actions
         */
        undoActions: {
            type: Object,
        },
        /**
         * Redo button actions
         */
        redoActions: {
            type: Object,
        },
        /**
         * Toggle preview of right sidebar when screen size collapsed.
         *
         * Use this prop with ".sync" to get two way binding.
         */
        openRightSidebar: {
            type: Boolean,
            default: false,
        },
    });
    const emit = defineEmits(['update:openRightSidebar']);

    let slimHeader = ref(false);
    let responsiveRightSidebar = ref(false);
    let previewOption = ref(null);

    let className = computed(() => {
        return classNames(
            'Polaris-PreviewFrame',
            slimHeader.value && 'Polaris-PreviewFrame__slimHeader'
        );
    });

    function headerMediaQuery() {
        slimHeader.value = window.innerWidth <= 666;
    }

    function rightSidebarMediaQuery() {
        responsiveRightSidebar.value = window.innerWidth < 1614;
    }

    function handlePreviewChange(option) {
        previewOption.value = option[0];
    }

    function handleClick() {
        /**
         * @ignore
         */
        emit('update:openRightSidebar', false)
    }

    onMounted(() => {
        window.addEventListener('resize', headerMediaQuery);
        headerMediaQuery();
        window.addEventListener('resize', rightSidebarMediaQuery);
        rightSidebarMediaQuery();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', headerMediaQuery);
        window.removeEventListener('resize', rightSidebarMediaQuery);
    });
</script>

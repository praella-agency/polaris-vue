<template>
    <div
        id="PFrame"
        :class="className"
        :data-polaris-layer="true"
        :data-has-navigation="isSlot($slots.navigation) || Object.keys(navigation).length > 0"
    >
        <div :class="skipClassName">
            <a
                ref="skipToContentTarget"
                href="javascript.void(0)"
                @focus="handleFocus"
                @blur="handleBlur"
                @click="handleClick"
            >
                Skip to content
            </a>
        </div>
        <div
            v-if="isSlot($slots.topBar) || Object.keys(topBar).length > 0"
            class="Polaris-Frame__TopBar"
            :data-polaris-layer="true"
            :data-polaris-top-bar="true"
            :id="APP_FRAME_TOP_BAR"
        >
            <slot name="topBar">
                <PTopBar
                    v-bind="topBar"
                />
            </slot>
        </div>
        <div
            v-if="isSlot($slots.navigation) || Object.keys(navigation).length > 0"
            class="Polaris-Frame__NavigationDisplay"
        >
            <transition
                enter-class="Polaris-Frame__Navigation--enter"
                enter-active-class="Polaris-Frame__Navigation--enterActive"
                enter-to-class="Polaris-Frame__Navigation--enterActive"
                leave-class="Polaris-Frame__Navigation--exit"
                leave-active-class="Polaris-Frame__Navigation--exitActive"
                @enter="enter"
            >
                <div
                    ref="navigationNode"
                    v-show="showMobileNavigation || !toggleMobileNavigation"
                    :class="`Polaris-Frame__Navigation ${showMobileNavigation ? navClassName: ''}`"
                    :aria-modal="ariaModal"
                    :role="role"
                    aria-label="Navigation"
                    @keydown="handleNavKeydown"
                    :id="APP_FRAME_NAV"
                    key="NavContent"
                    :hidden="mobileNavHidden"
                >
                    <slot name="navigation">
                        <PNavigation
                            v-bind="navigation"
                        />
                    </slot>
                    <button
                        v-if="showMobileNavigation"
                        type="button"
                        class="Polaris-Frame__NavigationDismiss"
                        @click="handleNavigationDismiss"
                        :aria-hidden="mobileNavHidden || (!useMediaQuery && !toggleMobileNavigation)"
                        aria-label="Close navigation"
                        :tabindex="mobileNavShowing ? 0 : -1"
                    >
                        <PIcon source="MobileCancelMajor"/>
                    </button>
                </div>
            </transition>
        </div>
        <div :class="contextualSaveBarClassName">
            <PContextualSaveBar
                v-if="contextualSaveBar.active"
                :alignContentFlush="contextualSaveBar.alignContentFlush"
                :message="contextualSaveBar.message"
                :saveAction="contextualSaveBar.saveAction"
                :discardAction="contextualSaveBar.discardAction"
                :fullWidth="contextualSaveBar.fullWidth"
                :logo="logo"
            >
                <template #contextControl>
                    <slot name="contextControl"/>
                </template>
            </PContextualSaveBar>
        </div>
        <PBackdrop
            v-if="showMobileNavigation && useMediaQuery()"
            belowNavigation
            @click="handleNavigationDismiss"
            @touchStart="handleNavigationDismiss"
        />
        <main
            class="Polaris-Frame__Main"
            :id="APP_FRAME_MAIN"
            :data-has-global-ribbon="Boolean(isSlot($slots.globalRibbon))"
        >
            <div class="Polaris-Frame__Content">
                <slot/>
            </div>
        </main>
        <div
            v-if="isSlot($slots.globalRibbon)"
            class="Polaris-Frame__GlobalRibbonContainer"
            ref="globalRibbonContainer"
        >
            <slot name="globalRibbon"/>
        </div>
        <PEventListener event="resize" :handler="handleResize"/>
    </div>
</template>

<script setup>
    import { ref, useSlots, computed, onUpdated, onMounted, onUnmounted } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PContextualSaveBar } from '../../../../components/PFrame/components/PContextualSaveBar';
    import { PEventListener } from '../../../../components/PEventListener';
    import { PIcon } from '../../../../components/PIcon';
    import { PBackdrop } from '../../../../components/PBackdrop';
    import { PTopBar } from '../../../../components/PTopBar/';
    import { PNavigation } from '../../../../components/PNavigation';

    let props = defineProps({
        showMobileNavigation: {
            type: Boolean,
            default: false,
        },
        onNavigationDismiss: {
            type: Function,
        },
        contextualSaveBar: {
            type: Object,
            default: () => ({}),
        },
        toggleContextualSaveBar: {
            type: Boolean,
            default: false,
        },
        /**
         * ContextualSaveBar Logo
         */
        logo: {
            type: Object,
            default: () => ({}),
        },
        /**
         * TopBar props
         */
        topBar: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Navigation props
         */
        navigation: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Frame offset value
         */
        frameOffset: {
            type: String,
            default: '0px',
        },
        /**
         * Set the frame position with it's internal components
         */
        positioning: {
            type: String,
            default: 'fixed',
        },
    });

    let slots = useSlots();
    let APP_FRAME_MAIN = ref('AppFrameMain');
    let APP_FRAME_NAV = ref('AppFrameNav');
    let APP_FRAME_TOP_BAR = ref('AppFrameTopBar');
    let toggleMobileNavigation = ref(props.showMobileNavigation);
    let mobileNavHidden = ref(useMediaQuery() && !toggleMobileNavigation.value);
    let mobileNavShowing = ref(useMediaQuery() && toggleMobileNavigation.value);
    let state = ref({
        skipFocused: false,
        globalRibbonHeight: 0,
        loadingStack: 0,
        toastMessages: [],
        showContextualSaveBar: false,
    });
    let globalRibbonContainer = ref(null);
    let skipToContentTarget = ref(null);

    let isSlot = computed(() => {
        return hasSlot;
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Frame',
            (hasSlot(slots.navigation) || Object.keys(props.navigation).length > 0)
            && 'Polaris-Frame--hasNav',
            (hasSlot(slots.topBar) || Object.keys(props.topBar).length > 0) && 'Polaris-Frame--hasTopBar',
        );
    });

    let contextualSaveBarClassName = computed(() => {
        return classNames(
            'Polaris-Frame__ContextualSaveBar Polaris-Frame-CSSAnimation--startFade',
            props.contextualSaveBar.active && ' Polaris-Frame-CSSAnimation--endFade',
        );
    });

    let skipClassName = computed(() => {
        return classNames(
            'Polaris-Frame__Skip',
            state.value.skipFocused && 'Polaris-Frame--focused',
        );
    });

    let navClassName = computed(() => {
        return classNames(
            toggleMobileNavigation.value && 'Polaris-Frame__Navigation--visible',
        );
    });

    let ariaModal = computed(() => {
        if (toggleMobileNavigation.value) {
            return true;
        }
    });

    let role = computed(() => {
        if (toggleMobileNavigation.value) {
            return 'dialog';
        }
    });

    function handleResize() {
        if (hasSlot(slots.globalRibbon)) {
            setGlobalRibbonHeight();
        }
    }

    function setGlobalRibbonRootProperty() {
        const { globalRibbonHeight } = state.value;
        setRootProperty(
            '--global-ribbon-height',
            `${globalRibbonHeight}px`,
            null,
        );
    }

    function setGlobalRibbonHeight() {
        if (globalRibbonContainer) {
            state.value.globalRibbonHeight = globalRibbonContainer.offsetHeight;
            setGlobalRibbonRootProperty();
        }
    }

    function setRootProperty(name, value, node) {
        if (document == null) {
            return;
        }

        const styleNode = node && node instanceof HTMLElement ? node : document.documentElement;
        /* tslint:disable-next-line */
        styleNode && styleNode.style.setProperty(name, value);
    }

    function useMediaQuery() {
        if (window.innerWidth <= 768) {
            toggleMobileNavigation.value = true;
            return true;
        }
        toggleMobileNavigation.value = false;
        return false;
    }

    function handleNavKeydown(event) {
        const {key} = event;
        const mobileNavShowing = useMediaQuery() && toggleMobileNavigation.value;
        if (mobileNavShowing && key === 'Escape') {
            handleNavigationDismiss();
        }
    }

    function handleNavigationDismiss() {
        if (props.onNavigationDismiss) {
            return props.onNavigationDismiss();
        }
    }

    function handleFocus() {
        state.value.skipFocused = true;
    }

    function handleBlur() {
        state.value.skipFocused = false;
    }

    function handleClick(event) {
        if (skipToContentTarget) {
            (skipToContentTarget).focus();
            event.preventDefault();
        }
    }

    function enter(el, done) {
        done();
    }

    onMounted(() => {
        globalRibbonContainer = globalRibbonContainer.value;
        skipToContentTarget = skipToContentTarget.value;
        window.addEventListener('resize', useMediaQuery);
        useMediaQuery();

        document.getElementById('PFrame').style.setProperty('--p-frame-offset', props.frameOffset);
        handleResize();
        if (hasSlot(slots.globalRibbon)) {
            return;
        }
        setGlobalRibbonRootProperty();
    });

    onUpdated(() => {
        setGlobalRibbonHeight();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', useMediaQuery);
    });
</script>

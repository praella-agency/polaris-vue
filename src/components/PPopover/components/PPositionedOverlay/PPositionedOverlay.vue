<template>
    <div
        :id="id"
        class="Polaris-PositionedOverlay"
        :style="containerStyle"
        v-show="active"
        ref="overlay"
    >
        <slot
            name="overlay"
            :measuring="measuring"
            :left="left"
            :right="right"
            :desired-height="height"
            :positioning="positioning"
            :tip-position="tipPosition"
        />
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

    let props = defineProps({
        id: {
            type: [String, Number],
        },
        active: {
            type: Boolean,
        },
        preferredPosition: {
            type: String,
        },
        preferredAlignment: {
            type: String, // right, left, center
        },
        activatorId: {
            type: String,
        },
        fullWidth: {
            type: Boolean,
        },
        activator: {
            type: [String, Number, Boolean, Array, Object],
        },
        scrollableElement: {
            type: [String, Number, Boolean, Array, Object],
        },
    });

    let measuring = ref(true);
    let left = ref(NaN);
    let right = ref(NaN);
    let top = ref(NaN);
    let height = ref(NaN);
    let width = ref(null);
    let positioning = ref('below');
    let zIndex = ref(null);
    let tipPosition = ref(null);
    let overlay = ref(null);

    let containerStyle = computed(() => {
        return {
            top: top.value == null || isNaN(top.value) ? undefined : `${top.value}px`,
            left: left.value == null || isNaN(left.value) ? undefined : `${left.value}px`,
            right: right.value == null || isNaN(right.value) ? undefined : `${right.value}px`,
            width: width.value ? (typeof width.value === 'number' ? `${width.value}px` : width.value) : undefined,
            zIndex: zIndex.value == null ? undefined : zIndex.value,
        };
    });

    function handleMeasurement() {
        const activator = document.getElementById(props.activatorId);
        if (!activator) {
            return;
        }
        const activatorRect = activator.getBoundingClientRect();

        const scrollableElement = (!props.scrollableElement || props.scrollableElement === document) ? document.body : props.scrollableElement;
        let scrollableContainerRect = scrollableElement.getBoundingClientRect();

        const overlayRect = getBoundingClientRect(overlay);
        if (props.fullWidth) {
            overlayRect.width = activatorRect.width;
        }

        if (scrollableElement === document.body) {
            scrollableContainerRect = {
                height: document.body.scrollHeight,
                width: scrollableContainerRect.width,
                top: scrollableContainerRect.top,
                bottom: scrollableContainerRect.bottom,
            };
        }

        const overlayMargins = overlay && overlay.firstElementChild ? getMarginsForNode(overlay.firstElementChild) : {activator: 0, container: 0, horizontal: 0};

        const containerRect = {
            top: window.scrollY,
            left: window.scrollX,
            height: window.innerHeight,
            width: window.innerWidth,
        };

        const zIndexForLayer = 400;
        const verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, props.preferredPosition);
        const horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, props.preferredAlignment,);

        measuring.value = false;
        left.value = props.preferredAlignment !== 'right' ? horizontalPosition : undefined;
        right.value = props.preferredAlignment === 'right' ? horizontalPosition : undefined;
        top.value = verticalPosition.top;
        height.value = verticalPosition.height;
        width.value = props.fullWidth ? 'max-content' : null;
        positioning.value = verticalPosition.positioning;
        zIndex.value = zIndexForLayer;
        tipPosition.value = activatorRect.left + (activatorRect.width / 2) - parseFloat(String(left.value));
    }

    function getMarginsForNode(node) {
        const styles = window.getComputedStyle(node);
        return {
            activator: parseFloat(styles.marginTop || ''),
            container: parseFloat(styles.marginBottom || ''),
            horizontal: parseFloat(styles.marginLeft || ''),
        };
    }

    function calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment) {
        const maximum = containerRect.width - overlayRect.width;

        if (preferredAlignment === 'left') {
            return Math.min(
                maximum,
                Math.max(0, activatorRect.left - overlayMargins.horizontal),
            );
        } else if (preferredAlignment === 'right') {
            const activatorRight =
                containerRect.width - (activatorRect.left + activatorRect.width);

            return Math.min(
                maximum,
                Math.max(0, activatorRight - overlayMargins.horizontal),
            );
        }

        const center = {
            x: activatorRect.left + (activatorRect.width / 2),
            y: activatorRect.top + (activatorRect.height / 2),
        };
        return Math.min(
            maximum,
            Math.max(0, center.x - overlayRect.width / 2),
        );
    }

    function calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition) {
        const activatorTop = activatorRect.top;
        const activatorBottom = activatorTop + activatorRect.height;
        const spaceAbove = activatorRect.top;
        const spaceBelow = containerRect.height - activatorRect.top - activatorRect.height;

        const desiredHeight = overlayRect.height;
        const verticalMargins = overlayMargins.activator + overlayMargins.container;
        const minimumSpaceToScroll = overlayMargins.container;
        const distanceToTopScroll = activatorRect.top - Math.max(scrollableContainerRect.top, 0);
        const distanceToBottomScroll = containerRect.top
            + Math.min(containerRect.height, scrollableContainerRect.top + scrollableContainerRect.height)
            - (activatorRect.top + activatorRect.height);

        const enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll;
        const enoughSpaceFromBottomScroll = distanceToBottomScroll >= minimumSpaceToScroll;

        const heightIfBelow = Math.min(spaceBelow, desiredHeight);
        const heightIfAbove = Math.min(spaceAbove, desiredHeight);

        const positionIfAbove = {
            height: heightIfAbove - verticalMargins,
            top: activatorTop + containerRect.top - heightIfAbove,
            positioning: 'above',
        };

        const positionIfBelow = {
            height: heightIfBelow - verticalMargins,
            top: activatorBottom + containerRect.top,
            positioning: 'below',
        };

        if (preferredPosition === 'above') {
            return ((enoughSpaceFromTopScroll ||
                    (distanceToTopScroll >= distanceToBottomScroll && !enoughSpaceFromBottomScroll)) &&
                (spaceAbove > desiredHeight || spaceAbove > spaceBelow))
                ? positionIfAbove
                : positionIfBelow;
        }

        if (preferredPosition === 'below') {
            return ((enoughSpaceFromBottomScroll ||
                    (distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll)) &&
                (spaceBelow > desiredHeight || spaceBelow > spaceAbove))
                ? positionIfBelow
                : positionIfAbove;
        }

        if (enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll) {
            return spaceAbove > spaceBelow
                ? positionIfAbove
                : positionIfBelow;
        }

        return distanceToTopScroll > minimumSpaceToScroll
            ? positionIfAbove
            : positionIfBelow;
    }

    function getBoundingClientRect(element) {
        if (!element) {
            return {};
        }
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        };
    }

    watch(() => props.active, () => {
        nextTick().then(handleMeasurement);
        setTimeout(handleMeasurement, 500);
    })

    onMounted(() => {
        overlay = overlay.value;
        window.addEventListener('resize', handleMeasurement);
        window.addEventListener('scroll', handleMeasurement);
        handleMeasurement();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleMeasurement);
        window.removeEventListener('scroll', handleMeasurement);
    });
</script>

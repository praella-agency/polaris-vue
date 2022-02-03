<template>
    <div
        :id="id"
        class="Polaris-PositionedOverlay"
        :style="containerStyle"
        v-if="active"
        ref="overlay">
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


<script>
    export default {
        name: 'PPositionedOverlay',
        props: {
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
        },
        data() {
            return {
                measuring: true,
                left: NaN,
                right: NaN,
                top: NaN,
                height: NaN,
                width: null,
                positioning: 'below',
                zIndex: null,
                outsideScrollableContainer: false,
                tipPosition: null,
                overlay: null,
            };
        },
        computed: {
            containerStyle() {
                return {
                    top: this.top == null || isNaN(this.top) ? undefined : this.top + 'px',
                    left: this.left == null || isNaN(this.left) ? undefined : this.left + 'px',
                    right: this.right == null || isNaN(this.right) ? undefined : this.right + 'px',
                    width: this.width ? (typeof this.width === 'number' ? this.width + 'px' : this.width) : undefined,
                    zIndex: this.zIndex == null ? undefined : this.zIndex,
                };
            },
            scrollableContainer() {
                const selector = '.Polaris-Scrollable';
                let closest = null;
                if (this.activator.closest) {
                    closest = this.activator.closest(selector);
                } else {
                    const matches = document.querySelectorAll(selector);
                    let i;
                    let el = this.activator;
                    do {
                        el = el.parentElement;
                        i = matches.length;
                    } while ((i < 0) && el);
                    closest = el;
                }

                return closest || document;
            },
        },
        methods: {
            handleMeasurement() {
                const activator = document.getElementById(this.activatorId);
                if (!activator) {
                    return;
                }
                const activatorRect = activator.getBoundingClientRect();

                const scrollableElement = (!this.scrollableElement || this.scrollableElement === document) ?
                    document.body : this.scrollableElement;
                let scrollableContainerRect = scrollableElement.getBoundingClientRect();

                const overlayRect = this.getBoundingClientRect(this.overlay);
                if (this.fullWidth) {
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

                const overlayMargins = this.overlay && this.overlay.firstElementChild
                    ? this.getMarginsForNode(this.overlay.firstElementChild)
                    : {activator: 0, container: 0, horizontal: 0};

                const containerRect = {
                    top: window.scrollY,
                    left: window.scrollX,
                    height: window.innerHeight,
                    width: window.innerWidth,
                };

                const zIndexForLayer = 400;
                const verticalPosition = this.calculateVerticalPosition(activatorRect,
                    overlayRect,
                    overlayMargins,
                    scrollableContainerRect,
                    containerRect,
                    this.preferredPosition);
                const horizontalPosition = this.calculateHorizontalPosition(
                    activatorRect,
                    overlayRect,
                    containerRect,
                    overlayMargins,
                    this.preferredAlignment,
                );
                this.measuring = false;
                // this.left = horizontalPosition;
                this.left = this.preferredAlignment !== 'right' ? horizontalPosition : undefined;
                this.right = this.preferredAlignment === 'right' ? horizontalPosition : undefined;
                this.top = verticalPosition.top;
                this.height = verticalPosition.height;
                this.width = this.fullWidth ? 'max-content' : null;
                this.positioning = verticalPosition.positioning;
                this.zIndex = zIndexForLayer;
                this.tipPosition = activatorRect.left + (activatorRect.width / 2) - parseFloat(String(this.left));
            },
            getMarginsForNode(node) {
                const styles = window.getComputedStyle(node);
                return {
                    activator: parseFloat(styles.marginTop || ''),
                    container: parseFloat(styles.marginBottom || ''),
                    horizontal: parseFloat(styles.marginLeft || ''),
                };
            },
            calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment) {
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
            },
            calculateVerticalPosition(activatorRect,
                                      overlayRect,
                                      overlayMargins,
                                      scrollableContainerRect,
                                      containerRect,
                                      preferredPosition) {
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
            },
            getBoundingClientRect(element) {
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
            },
        },
        watch: {
            active: function (val, oldVal) {
                this.$nextTick(this.handleMeasurement);
                setTimeout(this.handleMeasurement, 500);
            },
        },
        mounted() {
            window.addEventListener('resize', this.handleMeasurement);
            window.addEventListener('scroll', this.handleMeasurement);
            this.overlay = this.$refs.overlay;
            this.handleMeasurement();
        },
        updated() {
            this.overlay = this.$refs.overlay;
        },
        destroyed() {
            window.removeEventListener('resize', this.handleMeasurement);
            window.removeEventListener('scroll', this.handleMeasurement);
        },
    }
</script>

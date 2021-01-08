<template>
    <div class="Polaris-PositionedOverlay"
         :style="containerStyle"
         v-show="active"
         ref="overlay">
        <slot name="overlay"
              :measuring="measuring"
              :left="left"
              :desired-height="height"
              :positioning="positioning"
              :tip-position="tipPosition">
        </slot>
    </div>
</template>


<script lang="ts">
import {Component, Vue, Prop, Ref, Watch} from 'vue-property-decorator';
import PPositionedOverlay from '@/components/PPopover/components/PPositionedOverlay.vue';

@Component({
    components: { PPositionedOverlay },
})
export default class PPopoverOverlay extends Vue {

    @Prop(String) public id!: string;
    @Prop(Boolean) public active!: boolean;
    @Prop(String) public preferredPosition!: string;
    @Prop(String) public activatorId!: string;
    @Prop(Boolean) public fullWidth!: boolean;
    @Prop() public activator!: any;
    @Prop() public scrollableElement!: any;


    public measuring: boolean = true;
    public left: number = 0;
    public top: number = 0;
    public height: number = 0;
    public width: number | null = null;
    public positioning: string = 'below';
    public zIndex: number | null = null;
    public outsideScrollableContainer: boolean = false;
    public tipPosition: number | null = null;
    public overlay;

    public get containerStyle() {

        return {
            width: this.width ? this.width + 'px' : undefined,
            zIndex: this.zIndex == null ? undefined : this.zIndex,
        };
    }

    public get scrollableContainer() {
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
    }

    @Watch('active')
    public handleActiveChange() {
        this.$nextTick(this.handleMeasurement);
        setTimeout(this.handleMeasurement, 500);
    }

    public mounted() {
        window.addEventListener('resize', this.handleMeasurement);
        window.addEventListener('scroll', this.handleMeasurement);
        this.handleMeasurement();
        this.overlay = this.$refs.overlay;
    }

    public updated() {
        this.overlay = this.$refs.overlay;
    }

    public handleMeasurement() {
        const activator = document.getElementById(this.activatorId);
        if (!activator) { return; }

        const activatorRect = activator.getBoundingClientRect();
        const currentOverlayRect = this.overlay.getBoundingClientRect();
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

        const overlayMargins = this.overlay.firstElementChild
            ? this.getMarginsForNode(this.overlay.firstElementChild)
            : { activator: 0, container: 0, horizontal: 0 };

        const containerRect = {
            top: window.scrollY,
            left: window.scrollX,
            height: window.innerHeight,
            width: window.innerWidth,
        };

        const zIndexForLayer = 10;
        const verticalPosition = this.calculateVerticalPosition(activatorRect,
            overlayRect,
            overlayMargins,
            scrollableContainerRect,
            containerRect,
            this.preferredPosition);
        const horizontalPosition = this.calculateHorizontalPosition(activatorRect,
            overlayRect,
            containerRect);

        this.measuring = false;
        this.left = horizontalPosition;
        this.top = verticalPosition.top;
        this.height = verticalPosition.height;
        this.width = this.fullWidth ? overlayRect.width : null;
        this.positioning = verticalPosition.positioning;
        this.zIndex = zIndexForLayer;
        this.tipPosition = activatorRect.left + (activatorRect.width / 2) - parseFloat(String(this.left));
    }

    public getMarginsForNode(node) {
        const styles = window.getComputedStyle(node);
        return {
            activator: parseFloat(styles.marginTop || ''),
            container: parseFloat(styles.marginBottom || ''),
            horizontal: parseFloat(styles.marginLeft || ''),
        };
    }

    public calculateHorizontalPosition(activatorRect, overlayRect, containerRect) {
        const maximum = containerRect.width - overlayRect.width;
        const center = {
            x: activatorRect.left + (activatorRect.width / 2),
            y: activatorRect.top + (activatorRect.height / 2),
        };
        return Math.min(maximum, Math.max(0, center.x - (overlayRect.width / 2)));
    }

    public calculateVerticalPosition(activatorRect,
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
            positioning: 'bottom',
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

    public getBoundingClientRect(element: HTMLElement) {
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

}
</script>

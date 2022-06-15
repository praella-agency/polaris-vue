<template>
    <div
        class="Polaris-IndexTable-ScrollContainer"
        :ref="scrollableContainerRef"
        @scroll="handleScroll"
    >
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'PScrollContainer',
        props: {
            scrollableContainerRef: {
                type: HTMLDivElement,
            },
        },
        methods: {
            handleScroll() {
                if (!this.scrollableContainerRef) {
                    return;
                }

                const availableScrollAmount = this.scrollableContainerRef.scrollWidth -
                    this.scrollableContainerRef.offsetHeight;
                const canScrollLeft = this.scrollableContainerRef.scrollLeft > 0;
                const canScrollRight = this.scrollableContainerRef.scrollLeft < availableScrollAmount;

                this.$emit('onScroll', canScrollLeft, canScrollRight);
            },
        },
        watch: {
            scrollableContainerRef(value, oldValue) {
                if (!value) {
                    return;
                }

                this.scrollableContainerRef.dispatchEvent(new Event('scroll'));
            },
        },
    }
</script>

<template>
    <div
        class="Polaris-IndexTable-ScrollContainer"
        :ref="scrollableContainerRef"
        @scroll="handleScroll"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component({})
    export default class PScrollContainer extends Vue {
        @Prop() public scrollableContainerRef!: HTMLDivElement;

        @Watch('scrollableContainerRef')
        public onScrollableContainerRefChanged(value) {
            if (!value) {
                return;
            }

            this.scrollableContainerRef.dispatchEvent(new Event('scroll'));
        }

        public handleScroll() {
            if (!this.scrollableContainerRef) {
                return;
            }

            const availableScrollAmount = this.scrollableContainerRef.scrollWidth -
                this.scrollableContainerRef.offsetHeight;
            const canScrollLeft = this.scrollableContainerRef.scrollLeft > 0;
            const canScrollRight = this.scrollableContainerRef.scrollLeft < availableScrollAmount;

            this.$emit('onScroll', canScrollLeft, canScrollRight);
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="Polaris-Tabs Polaris-Tabs__TabMeasurer" ref="containerNode">
        <PEventListener event="resize" :handler="handleMeasurement" />
        <PTab
            v-for="(tab, index) in tabs"
            :key="`${index}-${tab.id}Hidden`"
            v-bind="tab"
        >
            {{ tab.content }}
        </PTab>
        <!-- @slot Activator content -->
        <slot/>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
    import { PTab } from '@/components/PTabs/components/PTab';
    import { TabDescriptor } from '@/components/PTabs/types';
    import { PEventListener } from '@/components/PEventListener';

    @Component({
        components: {
            PTab, PEventListener,
        },
    })
    export default class PTabMeasurer extends Vue {

        @Prop({type: Number, default: 0}) public tabToFocus!: number;
        @Prop({type: Boolean, default: false}) public siblingTabHasFocus!: boolean;
        @Prop({type: Number, default: 0}) public selected!: number;
        @Prop({type: Object, default: () => ({})}) public tabs!: TabDescriptor[];

        @Ref() public animationFrame!: number = null;

        public handleMeasurement() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }

            this.animationFrame = requestAnimationFrame(() => {
                if (!this.$refs.containerNode as HTMLDivElement) {
                    return;
                }

                const containerWidth = (this.$refs.containerNode as HTMLDivElement).offsetWidth;
                const hiddenTabNodes = (this.$refs.containerNode as HTMLDivElement).children;
                const hiddenTabNodesArray = Array.from(hiddenTabNodes);
                const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
                    return Math.ceil(node.getBoundingClientRect().width);
                });
                const disclosureWidth = hiddenTabWidths.pop() || 0;

                this.$emit('handleMeasurement', containerWidth, disclosureWidth, hiddenTabWidths);
            });
        }
    }
</script>

<style scoped>

</style>
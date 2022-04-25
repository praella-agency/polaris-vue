<template>
    <div class="Polaris-Tabs Polaris-Tabs__TabMeasurer" ref="containerNode">
        <PEventListener event="resize" :handler="handleMeasurement"/>
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

<script>
    import { PTab } from '../../../../components/PTabs/components/PTab';
    import { TabDescriptor } from '../../../../types/tabs';
    import { PEventListener } from '../../../../components/PEventListener';

    export default {
        name: 'PTabMeasurer',
        components: {
            PTab, PEventListener,
        },
        props: {
            tabToFocus: {
                type: Number,
                default: 0,
            },
            siblingTabHasFocus: {
                type: Boolean,
                default: false,
            },
            selected: {
                type: Number,
                default: 0,
            },
            tabs: {
                type: Array,
                default: () => ([]),
            },
        },
        data() {
            return {
                animationFrame: Number,
            };
        },
        emits: ['handleMeasurement'],
        methods: {
            handleMeasurement() {
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }

                this.animationFrame = requestAnimationFrame(() => {
                    const containerWidth = (this.$refs.containerNode).offsetWidth;
                    const hiddenTabNodes = (this.$refs.containerNode).children;
                    const hiddenTabNodesArray = Array.from(hiddenTabNodes);
                    hiddenTabNodesArray.shift();
                    const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
                        return Math.ceil(node.getBoundingClientRect().width);
                    });
                    const disclosureWidth = hiddenTabWidths.pop() || 0;

                    this.$emit('handleMeasurement', containerWidth, disclosureWidth, hiddenTabWidths);
                });
            },
        },
        mounted() {
            this.handleMeasurement();
        },
    }
</script>

<style scoped>

</style>
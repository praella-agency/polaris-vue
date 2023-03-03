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

<script setup>
    import { onMounted, ref } from 'vue';
    import { PTab } from '../../../../components/PTabs/components/PTab';
    import { PEventListener } from '../../../../components/PEventListener';

    let props = defineProps({
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
    });

    const emit = defineEmits(['handleMeasurement']);
    let animationFrame = Number;
    let containerNode = ref(null);

    function handleMeasurement() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        animationFrame = requestAnimationFrame(() => {
            const containerWidth = (containerNode).offsetWidth;
            const hiddenTabNodes = (containerNode).children;
            const hiddenTabNodesArray = Array.from(hiddenTabNodes);
            hiddenTabNodesArray.shift();
            const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
                return Math.ceil(node.getBoundingClientRect().width);
            });
            const disclosureWidth = hiddenTabWidths.pop() || 0;

            emit('handleMeasurement', containerWidth, disclosureWidth, hiddenTabWidths);
        });
    }

    onMounted(() => {
        containerNode = containerNode.value;
        handleMeasurement();
    })
</script>

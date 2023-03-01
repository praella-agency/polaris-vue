<template>
    <div aria-hidden class="Polaris-TextField__Resizer">
        <div ref="dummyInputDiv"
             class="Polaris-TextField__DummyInput"
             v-html="finalContents">
        </div>
        <div v-if="minimumLines"
             ref="minimumLinesDiv"
             class="Polaris-TextField__DummyInput"
             v-html="minimumLinesContent">
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue';

    const ENTITIES_TO_REPLACE = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\n': '<br>',
    };

    const REPLACE_REGEX = /[\n&<>]/g;

    let props = defineProps({
        contents: {
            type: String,
        },
        currentHeight: {
            type: Number,
        },
        minimumLines: {
            type: Number,
        },
    });

    const emit = defineEmits(['heightChange']);

    let dummyInputDiv = ref(null);
    let minimumLinesDiv = ref(null);

    let finalContents = computed(() => {
        return props.contents ? props.contents.replace(REPLACE_REGEX, replaceEntity) + '<br>' : '<br>';
    });

    let minimumLinesContent = computed(() => {
        let content = '';
        for (let line = 0; line < props.minimumLines; line++) {
            content += '<br>';
        }
        return content;
    });

    function handleHeightCheck() {
        if (dummyInputDiv === null || minimumLinesDiv === null) {
            return;
        }

        const dummyInput = dummyInputDiv;
        const minimumLines = minimumLinesDiv;

        const contentHeight = dummyInput.offsetHeight;
        const minimumHeight = minimumLines ? minimumLines.offsetHeight : 0;
        const newHeight = Math.max(contentHeight, minimumHeight);

        if (props.currentHeight !== newHeight) {
            emit('heightChange', newHeight);
        }
    }

    function replaceEntity(entity) {
        return ENTITIES_TO_REPLACE[entity] || entity;
    }

    onMounted(() => {
        dummyInputDiv = dummyInputDiv.value;
        minimumLinesDiv = minimumLinesDiv.value;
        handleHeightCheck();
    });

    watch(finalContents, () => {
        console.log('finalContents')
        handleHeightCheck();
    });
</script>

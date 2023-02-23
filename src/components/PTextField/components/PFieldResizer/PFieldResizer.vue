<template>
    <div aria-hidden class="Polaris-TextField__Resizer">
        <div ref="dummyInputDiv"
             class="Polaris-TextField__DummyInput"
             v-html="finalContents">
        </div>
        <div v-if="minimumLines"
             class="Polaris-TextField__DummyInput"
             v-html="minimumLinesContent">
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from "vue";

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

    const dummyInputDiv = ref(null);

    const finalContents = computed(() => {
        return props.contents ? props.contents.replace(REPLACE_REGEX, replaceEntity) + '<br>' : '<br>';
    });

    const minimumLinesContent = computed(() => {
        let content = '';
        for (let line = 0; line < props.minimumLines; line++) {
            content += '<br>';
        }
        return content;
    });

    function handleHeightCheck() {
        if (this.$refs.dummyInput === null || this.$refs.minimumLines === null) {
            return;
        }

        const dummyInput = this.$refs.dummyInput;
        const minimumLines = this.$refs.minimumLines;

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
        handleHeightCheck();
    });

    watch(finalContents, () => {
        handleHeightCheck();
    });
</script>

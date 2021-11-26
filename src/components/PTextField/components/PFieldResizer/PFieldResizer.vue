<template>
    <div aria-hidden class="Polaris-TextField__Resizer">
        <div ref="dummyInput"
             class="Polaris-TextField__DummyInput"
             v-html="finalContents">
        </div>
        <div v-if="minimumLines"
             class="Polaris-TextField__DummyInput"
             v-html="minimumLinesContent">
        </div>
    </div>
</template>

<script>
    const ENTITIES_TO_REPLACE = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\n': '<br>',
    };

    const REPLACE_REGEX = /[\n&<>]/g;

    export default {
        name: 'PFieldResizer',
        props: {
            contents: {
                type: String,
            },
            currentHeight: {
                type: Number,
            },
            minimumLines: {
                type: Number,
            },
        },
        computed: {
            finalContents() {
                return this.contents ? this.contents.replace(REPLACE_REGEX, this.replaceEntity) + '<br>' : '<br>';
            },
            minimumLinesContent() {
                let content = '';
                for (let line = 0; line < this.minimumLines; line++) {
                    content += '<br>';
                }
                return content;
            },
        },
        methods: {
            handleHeightCheck() {
                if (this.$refs.dummyInput === null || this.$refs.minimumLines === null) {
                    return;
                }

                const dummyInput = this.$refs.dummyInput;
                const minimumLines = this.$refs.minimumLines;

                const contentHeight = dummyInput.offsetHeight;
                const minimumHeight = minimumLines ? minimumLines.offsetHeight : 0;
                const newHeight = Math.max(contentHeight, minimumHeight);

                if (this.currentHeight !== newHeight) {
                    this.$emit('heightchange', newHeight);
                }
            },
            replaceEntity(entity) {
                return ENTITIES_TO_REPLACE[entity] || entity;
            },
        },
        mounted() {
            this.handleHeightCheck();
        },
        watch: {
            finalContents(value, oldValue) {
                this.handleHeightCheck();
            }
        },
    }
</script>

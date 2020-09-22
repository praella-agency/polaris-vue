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

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    const ENTITIES_TO_REPLACE = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\n': '<br>',
    };

    const REPLACE_REGEX = /[\n&<>]/g;

    @Component

    export default class PFieldResizer extends Vue {
        @Prop(String) public contents!: string;
        @Prop(Number) public currentHeight!: number;
        @Prop(Number) public minimumLines!: number;

        public handleHeightCheck() {
            if (this.$refs.dummyInput === null || this.$refs.minimumLines === null) {
                return;
            }

            const dummyInput: any = this.$refs.dummyInput;
            const minimumLines: any = this.$refs.minimumLines;

            const contentHeight = dummyInput.offsetHeight;
            const minimumHeight = minimumLines ? minimumLines.offsetHeight : 0;
            const newHeight = Math.max(contentHeight, minimumHeight);

            if (this.currentHeight !== newHeight) {
                this.$emit('heightchange', newHeight);
            }
        }

        public get finalContents() {
            return this.contents ? this.contents.replace(REPLACE_REGEX, this.replaceEntity) + '<br>' : '<br>';
        }

        public get minimumLinesContent() {
            let content = '';
            for (let line = 0; line < this.minimumLines; line++) {
                content += '<br>';
            }
            return content;
        }

        public mounted() {
            this.handleHeightCheck();
        }

        public replaceEntity(entity: string) {
            return ENTITIES_TO_REPLACE[entity] || entity;
        }

        @Watch('finalContents')
        public onFinalContentsChanged(val: string, oldVal: string) {
            this.handleHeightCheck();
        }
    }
</script>

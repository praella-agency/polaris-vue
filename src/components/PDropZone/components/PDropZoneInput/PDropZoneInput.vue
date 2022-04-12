<template>
    <div>
        <input
            ref="fileInputNode"
            :id="id"
            :accept="accept"
            :disabled="disabled"
            type="file"
            :multiple="multiple"
            autocomplete="off"
            @change="$emit('change', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
            :openFileDialog="openFileDialog"
            :onFileDialogClose="onFileDialogClose"
        />
        {{ type }}
    </div>
</template>

<script>
    export default {
        name: 'PDropZoneInput',
        props: {
            id: {
                type: [String, Number],
                default: null,
            },
            accept: {
                type: String,
                default: null,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'file',
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            openFileDialog: {
                type: Boolean,
                default: false,
            },
            onFileDialogClose: {
                type: Function,
            },
        },
        emits: ['change', 'focus', 'blur'],
        methods: {
            triggerFileDialog() {
                this.open();
                // tslint:disable-next-line:no-unused-expression
                this.onFileDialogClose && this.onFileDialogClose();
            },
            open() {
                if (!this.$refs.fileInputNode) {
                    return;
                }
                this.$refs.fileInputNode.click();
            },
        },
        mounted() {
            // tslint:disable-next-line:no-unused-expression
            this.openFileDialog && this.triggerFileDialog();
        },
        updated() {
            // tslint:disable-next-line:no-unused-expression
            this.openFileDialog && this.triggerFileDialog();
        },
    }
</script>

<style scoped>

</style>
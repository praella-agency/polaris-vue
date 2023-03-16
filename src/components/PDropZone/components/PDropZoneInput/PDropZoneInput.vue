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
            @change="emit('change', $event)"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
            :openFileDialog="openFileDialog"
            :onFileDialogClose="onFileDialogClose"
        />
        {{ type }}
    </div>
</template>

<script setup>
    import { ref, onMounted, onUpdated } from 'vue';

    let props = defineProps({
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
    });

    let emit = defineEmits(['change', 'focus', 'blur']);
    let fileInputNode = ref(null);

    function triggerFileDialog() {
        open();
        // tslint:disable-next-line:no-unused-expression
        props.onFileDialogClose && props.onFileDialogClose();
    }

    function open() {
        if (!fileInputNode) {
            return;
        }
        fileInputNode.click();
    }

    onMounted(() => {
        fileInputNode = fileInputNode.value;
        // tslint:disable-next-line:no-unused-expression
        props.openFileDialog && triggerFileDialog();
    });

    onUpdated(() => {
        // tslint:disable-next-line:no-unused-expression
        props.openFileDialog && triggerFileDialog();
    });
</script>

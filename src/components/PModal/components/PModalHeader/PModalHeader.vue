<template>
    <div class="Polaris-Modal-Header">
        <div :id="id" class="Polaris-Modal-Header__Title">
            <PDisplayText element="h2" size="small">
                <slot/>
            </PDisplayText>
        </div>
        <PModalCloseButton @click="$emit('close', $event)"/>
    </div>
</template>

<script setup>
    import { PDisplayText } from '../../../../components/PDisplayText';
    import { PModalCloseButton } from '../../../../components/PModal/components/PModalCloseButton';

    let props = defineProps({
        id: {
            type: [String, Number],
        },
    });

    const emit = defineEmits(['close']);
</script>

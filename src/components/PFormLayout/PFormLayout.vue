<template>
    <div class="Polaris-FormLayout" :id="id">
        <template v-for="(item, index) in items" :key="index">
            <PFormLayoutItem>
                <component :is="item" />
            </PFormLayoutItem>
        </template>
    </div>
</template>
<script setup>
    import { onMounted, ref, useSlots } from 'vue';
    import { PFormLayoutItem } from '../../components/PFormLayout/components/PFormLayoutItem';

    let props = defineProps({
        /**
         * Id for the element
         */
        id: {
            type: [String, Number],
            default: 'PFormLayout',
        },
    });
    let slots = useSlots();

    let items = ref(null);

    onMounted(() => {
        items.value = slots.default ? slots.default() : [];
    });
</script>

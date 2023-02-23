<template>
    <div class="Polaris-TextField__Spinner" aria-hidden="true" @click="onClick">
        <div
            role="button"
            class="Polaris-TextField__Segment"
            tabindex="-1"
            @click="handleStep(1)"
        >
            <div class="Polaris-TextField__SpinnerIcon">
                <PIcon source="CaretUpMinor"/>
            </div>
        </div>
        <div
            role="button"
            class="Polaris-TextField__Segment"
            tabindex="-1"
            @click="handleStep(-1)"
        >
            <div class="Polaris-TextField__SpinnerIcon">
                <PIcon source="CaretDownMinor"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { PIcon } from '../../../../components/PIcon';

    const emit = defineEmits(['click', 'change']);

    function onClick() {
        emit('click');
    }

    function handleStep(value) {
        emit('change', value);
    }
</script>

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

<script>
    import { PIcon } from '../../../../components/PIcon';

    export default {
        name: 'PSpinner',
        components: {
            PIcon,
        },
        methods: {
            onClick() {
                this.$emit('click');
            },
            handleStep(value) {
                this.$emit('change', value);
            },
        },
    }
</script>

<style scoped>

</style>

<template>

</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component({})
    export default class PLabelled extends Vue {
        /** A unique identifier for the label */
        @Prop({type: String, default: null}) public id!: string;

        /** Text for the label */
        @Prop({type: String, default: null}) public label!: string;

        /** Error to display beneath the label */
        @Prop({type: Boolean, default: false}) public error?: boolean;

        // /** An action */
        // action?: Action;
        // /** Additional hint text to display */
        // helpText?: React.ReactNode;
        // /** Content to display inside the connected */
        // children?: React.ReactNode;
        // /** Visually hide the label */
        // labelHidden?: boolean;
        // /** Visual required indicator for the label */
        // requiredIndicator?: boolean;

    }
</script>

<style scoped>

</style>
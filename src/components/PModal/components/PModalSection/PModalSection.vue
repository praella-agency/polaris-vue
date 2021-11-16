<template>
    <section :class="className"><slot /></section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';

    @Component
    export default class PModalSection extends Vue {
        @Prop(Boolean) public flush!: boolean;
        @Prop(Boolean) public subdued!: boolean;

        public get className() {
            return classNames(
                'Polaris-Modal-Section',
                this.flush && 'Polaris-Modal-Section--flush',
                this.subdued && 'Polaris-Modal-Section--subdued',
            );
        }
    }
</script>

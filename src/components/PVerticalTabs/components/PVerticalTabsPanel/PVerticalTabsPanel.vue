<template>
    <div
        :class="className"
        :id="`${id}-panel`"
        role="tabpanel"
        :aria-labelledby="id"
        :tabindex="-1"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';

    @Component
    export default class PVerticalTabsPanel extends Vue {

        @Prop([String, Number]) public id!: string | number;
        @Prop(Boolean) public hidden!: boolean;

        public get className() {
            return classNames(
                'Polaris-VerticalTabs__Panel',
                this.hidden && `Polaris-VerticalTabs__Panel--hidden`,
            );
        }
    }
</script>

<style scoped>

</style>
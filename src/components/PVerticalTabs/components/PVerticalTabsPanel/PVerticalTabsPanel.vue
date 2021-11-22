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

<script>
    import { classNames } from '../../../../utilities/css';

    export default {
        name: 'PVerticalTabsPanel',
        props: {
            id: {
                type: [String, Number],
            },
            hidden: {
                type: Boolean,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-VerticalTabs__Panel',
                    this.hidden && `Polaris-VerticalTabs__Panel--hidden`,
                );
            },
        },
    }
</script>

<style scoped>

</style>
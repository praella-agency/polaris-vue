<template>
    <PCollapsible
        :id="id || uid"
        :open="expanded"
        :transition="{duration: '0ms', timingFunction: 'linear'}"
    >
        <ul class="Polaris-Navigation__List">
            <slot/>
        </ul>
    </PCollapsible>
</template>

<script>
    import { uuid } from '../../../../../../ComponentHelpers';
    import { PCollapsible } from '../../../../../../components/PCollapsible';

    export default {
        name: 'PSecondary',
        components: {
            PCollapsible,
        },
        props: {
            id: {
                type: String,
                default: null
            },
            expanded: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                uid: `SecondaryNavigation${uuid()}`,
            };
        },
    }
</script>

<style scoped>

</style>
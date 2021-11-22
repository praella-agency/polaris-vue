<template>
    <section :class="className">
        <slot/>
    </section>
</template>

<script>
    import { classNames } from '../../../../utilities/css';

    export default {
        name: 'PModalSection',
        props: {
            flush: {
                type: Boolean,
            },
            subdued: {
                type: Boolean,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Modal-Section',
                    this.flush && 'Polaris-Modal-Section--flush',
                    this.subdued && 'Polaris-Modal-Section--subdued',
                );
            },
        },
    }
</script>

<template>
    <div
        :class="className"
        :id="id"
        :tabIndex="-1"
    >
        <slot/>
    </div>
</template>

<script>
    import { classNames } from '../../../../utilities/css';

    export default {
        name: 'PPanel',
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
                    'Polaris-Tabs__Panel',
                    this.hidden && `Polaris-Tabs__Panel--hidden`,
                );
            },
        },
    }
</script>

<template>
    <button :class="className" @click="$emit('click', $event)">
        <PIcon source="MobileCancelMajor" color="base"/>
    </button>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';

    export default {
        name: 'PModalCloseButton',
        components: {
            PIcon,
        },
        props: {
            title: {
                type: Boolean,
                default: true,
            },
        },
        emits: ['click'],
        computed: {
            className() {
                return classNames(
                    'Polaris-Modal-CloseButton',
                    !this.title && 'Polaris-Modal-CloseButton--withoutTitle',
                );
            },
        },
    }
</script>

<template>
    <div class="Polaris-Modal-Header">
        <div :id="id" class="Polaris-Modal-Header__Title">
            <PDisplayText element="h2" size="small">
                <slot/>
            </PDisplayText>
        </div>
        <PModalCloseButton @click="$emit('close', $event)"/>
    </div>
</template>

<script>
    import { PDisplayText } from '../../../../components/PDisplayText';
    import { PModalCloseButton } from '../../../../components/PModal/components/PModalCloseButton';

    export default {
        name: 'PModalHeader',
        components: {
            PDisplayText, PModalCloseButton,
        },
        props: {
            id: {
                type: [String, Number],
            },
        },
        emits: ['close'],
    }
</script>

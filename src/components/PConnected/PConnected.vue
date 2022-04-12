<template>
    <div class="Polaris-Connected">
        <PConnectedItem
            v-if="$slots.left || left"
            position="Left"
        >
            <slot name="left">
                {{ left }}
            </slot>
        </PConnectedItem>

        <PConnectedItem position="Primary">
            <slot>
                {{ children }}
            </slot>
        </PConnectedItem>

        <PConnectedItem
            v-if="$slots.right || right"
            position="Right"
        >
            <slot name="right">
                {{ right }}
            </slot>
        </PConnectedItem>
    </div>
</template>

<script>
    import { PConnectedItem } from '../../components/PConnected/components/PConnectedItem';

    export default {
        name: 'PConnected',
        components: {
            PConnectedItem,
        },
        props: {
            left: {
                type: String,
            },
            right: {
                type: String,
            },
            children: {
                type: String,
            },
        }
    }
</script>

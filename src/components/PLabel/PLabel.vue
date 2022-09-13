<template>
    <div :class="className">
        <label
            :id="id"
            :for="id"
            :class="labelClassName"
        >
            <slot/>
        </label>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';

    export default {
        name: 'PLabel',
        props: {
            /**
             * A unique identifier for the label
             */
            id: {
                type: [String, Number],
                required: true,
                default: 'polaris-label',
            },
            /**
             * Visually hide the label
             */
            hidden: {
                type: Boolean,
                default: false,
            },
            /**
             * Visual required indicator for the label
             */
            requiredIndicator: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Label',
                    this.hidden && 'Polaris-Label--hidden',
                );
            },
            labelClassName() {
                return classNames(
                    'Polaris-Label__Text',
                    this.requiredIndicator && 'Polaris-Label__RequiredIndicator',
                );
            },
        },
    }
</script>

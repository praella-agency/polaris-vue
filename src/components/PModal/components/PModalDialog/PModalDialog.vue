<template>
    <div class="Polaris-Modal-Dialog__Container" data-polaris-layer="true" data-polaris-overlay="true">
        <div>
            <div class="Polaris-Modal-Dialog" role="dialog" tabIndex="-1">
                <div :class="className">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { classNames } from '../../../../utilities/css';

    export default {
        name: 'PModalDialog',
        props: {
            large: {
                type: Boolean,
            },
            small: {
                type: Boolean,
            },
            limitHeight: {
                type: Boolean,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Modal-Dialog__Modal',
                    this.large && ' Polaris-Modal-Dialog--sizeLarge',
                    this.small && 'Polaris-Modal-Dialog--sizeSmall',
                    this.limitHeight && 'Polaris-Modal-Dialog--limitHeight',
                );
            },
        },
    }
</script>

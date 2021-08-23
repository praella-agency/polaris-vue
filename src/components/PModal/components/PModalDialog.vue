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

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';

    @Component
    export default class PModalDialog extends Vue {
        @Prop(Boolean) public large!: boolean;
        @Prop(Boolean) public small!: boolean;
        @Prop(Boolean) public limitHeight!: boolean;

        public get className() {
            return classNames(
                'Polaris-Modal-Dialog__Modal',
                this.large && ' Polaris-Modal-Dialog--sizeLarge',
                this.small && 'Polaris-Modal-Dialog--sizeSmall',
                this.limitHeight && 'Polaris-Modal-Dialog--limitHeight',
            );
        }
    }
</script>

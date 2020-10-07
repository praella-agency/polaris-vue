<template>
    <button :class="className" @click="$emit('click', $event)">
        <PIcon source="MobileCancelMajorMonotone" color="inkLighter" />
    </button>
</template>

<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {classNames} from '@/utilities/css';
    import {PIcon} from '@/components/PIcon';

    @Component({
        components: {
            PIcon,
        },
    })
    export default class PModalCloseButton extends Vue {

        @Prop({type: Boolean, default: true}) public title!: boolean;

        public get className() {
            return classNames(
                'Polaris-Modal-CloseButton',
                !this.title && 'Polaris-Modal-CloseButton--withoutTitle',
            );
        }
    }
</script>

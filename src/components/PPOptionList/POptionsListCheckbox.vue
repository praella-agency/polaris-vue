<template>
    <div :class="className">
        <input :id="id" :name="name" :value="value" type="checkbox" :disabled="disabled" class="Polaris-OptionList-Checkbox__Input" @change="$emit('change', $event)" />
        <div class="Polaris-OptionList-Checkbox__Backdrop"></div>
        <div class="Polaris-OptionList-Checkbox__Icon">
            <PIcon source="TickSmallMinor" />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';
    import { PIcon } from '@/components/PIcon';

    @Component({
        components: {
            PIcon,
        },
    })
    export default class POptionsListCheckbox extends Vue {

        @Prop(Boolean) public checked!: boolean;
        @Prop(Boolean) public disabled!: boolean;
        @Prop(Boolean) public active!: boolean;
        @Prop(String) public id!: string;
        @Prop(String) public name!: string;
        @Prop(String) public value!: string;

        public get className() {
            return classNames(
                'Polaris-OptionList-Checkbox',
                this.active && 'Polaris-OptionList-Checkbox--active',
            );
        }
    }
</script>

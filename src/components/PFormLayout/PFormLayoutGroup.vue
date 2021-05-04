<template>
    <div role="group"
         :class="className"
         :aria-labelledBy="title ? id+'Title' : null"
         :aria-describedby="helpText ? id+'HelpText' : null">
        <div v-if="title"
             :id="id"
             class="Polaris-FormLayout__Title">
            {{ title }}
        </div>
            <PFormLayoutGroupItemWrapper v-for="(slot,name) in $slots" :key="name">
                <!-- @slot Form group body -->
                <slot/>
            </PFormLayoutGroupItemWrapper>
        <div v-if="helpText || $slots.helpText"
             :id="id+'helpText'"
             class="Polaris-FormLayout__HelpText">
            <!-- @slot Form group helpText -->
            <slot name="helpText">
                <template v-html="helpText"/>
            </slot>
        </div>
    </div>
</template>


<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {classNames} from '@/utilities/css';
    import {PFormLayoutItem} from '@/components/PFormLayout/index';
    import PFormLayoutGroupItemWrapper from '@/components/PFormLayout/PFormLayoutGroupItemWrapper.vue';

    @Component({
        components: {
            PFormLayoutItem, PFormLayoutGroupItemWrapper,
        },
    })
    export default class PFormLayoutGroup extends Vue {

        /**
         * Form group title
         */
        @Prop(String) public title!: string;

        /**
         * Form group helpText
         */
        @Prop(String) public helpText!: string;

        /**
         * For very short inputs, the width of the inputs may be reduced in order to fit more fields in the row.
         */
        @Prop(Boolean) public condensed!: boolean;

        /**
         * Use field groups to arrange multiple fields in a row.
         */
        @Prop({type: Boolean, default: true}) public grouped!: boolean;

        /**
         * Form group Id
         */
        @Prop({type: String, default: `PolarisFormLayout${new Date().getUTCMilliseconds()}`}) public id!: string;

        public get className() {
            return classNames(
                this.condensed && 'Polaris-FormLayout--condensed',
                !this.condensed && 'Polaris-FormLayout--grouped',
            );
        }
    }
</script>

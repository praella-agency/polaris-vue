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
                <slot/>
            </PFormLayoutGroupItemWrapper>
        <div v-if="helpText || $slots.helpText"
             :id="id+'helpText'"
             class="Polaris-FormLayout__HelpText">
            <slot name="helpText">
                {{ helpText }}
            </slot>
        </div>
    </div>
</template>


<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {classNames} from "@/utilities/css";
    import {PFormLayoutItem} from "@/components/PFormLayout/index";
    import PFormLayoutGroupItemWrapper from "@/components/PFormLayout/PFormLayoutGroupItemWrapper.vue";

    @Component({
        components: {
            PFormLayoutItem,PFormLayoutGroupItemWrapper
        }
    })
    export default class PFormLayoutGroup extends Vue {

        @Prop(String) public children!: string;
        @Prop(String) public title!: string;
        @Prop(String) public helpText!: string;
        @Prop(Boolean) public condensed!: boolean;
        @Prop(Boolean) public grouped!: boolean;
        @Prop({type: String, default: `PolarisFormLayout${new Date().getUTCMilliseconds()}`}) public id!: string;


        public get className() {
            return classNames(
                this.condensed && 'Polaris-FormLayout--condensed',
                !this.condensed && 'Polaris-FormLayout--grouped',
            );
        }
    }
</script>

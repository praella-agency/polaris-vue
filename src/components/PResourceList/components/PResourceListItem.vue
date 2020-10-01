<template>
    <li class="Polaris-ResourceList__ItemWrapper">
        <div class="" :class="className" data-href="customers/341">
            <a v-if="url" :aria-describedby="id" aria-label="View details" class="Polaris-ResourceItem__Link" tabindex="0" id="PolarisResourceListItemOverlay3" :href="url" data-polaris-unstyled="true"></a>
            <div class="Polaris-ResourceItem__Container" :id="id">
                <div class="Polaris-ResourceItem__Owned">
                    <div class="Polaris-ResourceItem__Handle">
                        <div class="Polaris-ResourceItem__CheckboxWrapper" v-if="selectable">
                            <PCheckbox label="Select item" :checked="checked" labelHidden :id="checkboxId" @change="handleChange"></PCheckbox>
                        </div>
                    </div>
                </div>
                <div class="Polaris-ResourceItem__Content">
                    <slot/>
                </div>
            </div>
        </div>
    </li>
</template>


<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import { PCheckbox } from '@/components/PCheckbox';

    @Component({
        components: {
            PCheckbox
        },
    })
    export default class PResourceListItem extends Vue {

        @Prop({type: Number, required: true}) public id!: number;
        @Prop(String) public url!: string;
        @Prop({type: Boolean, default: false}) public checked!: boolean;
        @Prop({type: Boolean, default: false}) public selectable!: boolean;

        public get className() {
            return classNames(
                'Polaris-ResourceItem',
                this.selectable && 'Polaris-ResourceItem--selectable'
            );
        }

        public get checkboxId() {

            return 'ResourceListCheckBox--'+this.id
        }

        public handleChange(event) {

            this.$emit('change',this.id, event.checked)
        }

    }
</script>

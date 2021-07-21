<template>
    <li class="Polaris-ResourceList__ItemWrapper Polaris-ResourceItem--persistActions">
        <div :class="className" :data-href="url">
            <a v-if="url" :aria-describedby="id" aria-label="View details" class="Polaris-ResourceItem__Link" tabindex="0" id="PolarisResourceListItemOverlay3" :href="url" data-polaris-unstyled="true"></a>
            <div class="Polaris-ResourceItem__Container" :id="id">
                <div class="Polaris-ResourceItem__Owned">
                    <div class="Polaris-ResourceItem__Handle" v-if="selectable">
                        <div class="Polaris-ResourceItem__CheckboxWrapper">
                            <PCheckbox label="Select item" :checked="checked" labelHidden :id="checkboxId" @change="handleChange"></PCheckbox>
                        </div>
                    </div>
                    <div class="Polaris-ResourceItem__Media" v-if="$slots.media">
                        <slot name="media" />
                    </div>
                </div>
                <div class="Polaris-ResourceItem__Content">
                    <slot/>
                </div>
                <div class="Polaris-ResourceItem__Actions">
                  <PButtonGroup>
                    <PButton>Button 1</PButton>
                    <PButton>Button 2</PButton>
                    <PButton>Button 3</PButton>
                  </PButtonGroup>
                </div>
            </div>
        </div>
    </li>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import { PCheckbox } from '@/components/PCheckbox';
import { PAvatar } from '@/components/PAvatar';

@Component({
    components: {
        PCheckbox, PAvatar,
    },
})
export default class PResourceListItem extends Vue {

    @Prop({type: Number, required: true}) public id!: number;
    @Prop(String) public url!: string;
    @Prop(String) public image!: string;
    @Prop(String) public initials!: string;
    @Prop({type: Boolean, default: false}) public checked!: boolean;
    @Prop({type: Boolean, default: false}) public selectable!: boolean;

    public get className() {
        return classNames(
            'Polaris-ResourceItem',
            this.selectable && 'Polaris-ResourceItem--selectable',
        );
    }

    public get checkboxId() {

        return 'ResourceListCheckBox--' + this.id;
    }

    public handleChange(event) {

        this.$emit('change', this.id, event.checked);
    }

}
</script>

<template>
    <POptionalTag tag="li" :active="hasMultipleSections">
        <div :class="className">
            <p v-if="section.title" class="Polaris-ActionList__Title">
                {{ section.title }}
            </p>
            <ul class="Polaris-ActionList__Actions">
                <PActionListItem
                        v-for="(item, key) in section.items"
                        :key="key"
                        :content="item.content"
                        :icon="item.icon"
                        :helpText="item.helpText"
                        :action="wrapAction(item)"/>
            </ul>
        </div>
    </POptionalTag>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { POptionalTag } from '@/components/POptionalTag';
import PActionListItem from '@/components/PActionList/components/PActionListItem.vue';

interface SectionInterface {
    title: string;
    items: any[];
}

@Component({
    components: {
        PActionListItem,
        POptionalTag,
    },
})
export default class PActionListSection extends Vue {

    @Prop({default: {}}) public section!: SectionInterface;
    @Prop(Boolean) public hasMultipleSections!: boolean;

    public get className() {

        return classNames(
            'Polaris-ActionList__Section',
            !this.section.title && 'Polaris-ActionList__Section--withoutTitle',
        );
    }

    public wrapAction(action) {

        const old = action.onAction;
        const newAction = Object.assign({}, action);
        if (old) {
            newAction.onAction = () => {
                old();
                this.$emit('item-action', action);
            };
        }
        return newAction;
    }
}
</script>

<template>
    <PPopover :id="`Popover${this['_uid']}`" :active="Boolean(active)" preferredAlignment="left" hideOnPrint @close="handleClose">
        <PActionMenuMenuAction slot="activator" disclosure :content="title" :getOffsetWidth="getOffsetWidth" :icon="icon" :onAction="handleOpen" />
        <PActionList slot="content" :items="actions" @item-action="handleClose" />
        <div v-if="$slots.details" class="">
            <slot name="details" />
        </div>
    </PPopover>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {MenuGroupDescriptor, ActionListItemDescriptor} from '@/types';
import {PActionList} from '@/components/PActionList';
import {PPopover} from '@/components/PPopover/index.js';
import { PActionMenuMenuAction } from '@/components/PActionMenu/components/PActionMenuMenuAction';

export interface MenuGroupProps extends MenuGroupDescriptor {
    accessibilityLabel?: string;
    active?: boolean;
    onOpen(title: string): void;
    onClose(title: string): void;
}

@Component({
    components: {
        PPopover, PActionList, PActionMenuMenuAction,
    },
})
export default class PActionMenuMenuGroup extends Vue {

    @Prop(Boolean) public active!: boolean;
    @Prop(Array) public actions!: ActionListItemDescriptor[];
    @Prop(String) public title!: string;
    @Prop({type: String, default: null}) public icon!: string;
    @Prop(Function) public onAction!: any;
    @Prop(Function) public getOffsetWidth!: any;

    public handleClose() {
        this.onAction(this.title);
    }

    public handleOpen() {
        this.$emit('open', this.title);
    }
}
</script>

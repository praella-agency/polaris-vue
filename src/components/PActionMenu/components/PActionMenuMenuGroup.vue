<template>
    <PPopover :active="Boolean(active)" preferredAlignment="left" hideOnPrint @close="handleClose">
        <PActionMenuMenuAction slot="activator" disclosure :content="title" :icon="icon" :onAction="handleOpen" />
        <PActionList :items="actions" @item-action="handleClose" />
        <div v-if="$slots.details" class="">
            <slot name="details" />
        </div>
    </PPopover>
</template>

<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {MenuGroupDescriptor, ActionListItemDescriptor} from '@/types';
    import {PActionList} from '@/components/PActionList';
    import {PPopover} from '@/components/PPopover';
    import PActionMenuMenuAction from './PActionMenuMenuAction.vue';

    export interface MenuGroupProps extends MenuGroupDescriptor {
        accessibilityLabel?: string;
        active?: boolean;
        onOpen(title: string): void;
        onClose(title: string): void;
    }


    @Component({
        components: {
            PPopover,
            PActionList,
            PActionMenuMenuAction,
        }
    })
    export default class PActionMenuMenuGroup extends Vue {

        @Prop(Boolean) public active!: boolean;
        @Prop(Array) public actions!: ActionListItemDescriptor[];
        @Prop(String) public title!: string;
        @Prop(String) public icon!: string;
        @Prop(Function) public onAction!: any;

        public handleClose() {
            this.onAction(this.title);
        }

        public handleOpen() {
            this.$emit('open', this.title);
        }
    }
</script>

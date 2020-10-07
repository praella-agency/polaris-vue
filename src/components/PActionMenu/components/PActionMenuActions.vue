<template>
    <div class="Polaris-ActionMenu-Actions__ActionsLayout">
        <template v-for="(action, index) in overriddenActions">
            <template v-if="'title' in action">
                <div v-if="actions.length > 0" :key="`MenuGroup-${index}`">
                    <PActionMenuMenuGroup :title="action.title" :active="action.title === computedActiveMenuGroup" :actions="[...computedHiddenActions, ...actions]" v-bind="action" @open="handleMenuGroupToggle" @close="handleMenuGroupClose" />
                </div>
            </template>
            <PActionMenuMenuAction v-else :key="`MenuAction-${index}`" :content="action.content" v-bind="action" />
        </template>
    </div>
</template>

<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {MenuActionDescriptor, MenuGroupDescriptor} from '@/types';
    import {sortAndOverrideActionOrder} from '../utilities';
    import PActionMenuMenuGroup from './PActionMenuMenuGroup.vue';
    import PActionMenuMenuAction from './PActionMenuMenuAction.vue';

    interface Props {
        actions?: MenuActionDescriptor[];
        groups?: MenuGroupDescriptor[];
    }

    const ACTION_SPACING = 4;
    type MenuDescriptorWithIndex = (MenuActionDescriptor | MenuGroupDescriptor) & {
        index: number;
    };

    @Component({
        components: {
            PActionMenuMenuGroup,
            PActionMenuMenuAction,
        },
    })
    export default class PActionMenuActions extends Vue {

        @Prop(Array) public actions!: MenuActionDescriptor[];
        @Prop(Array) public groups!: MenuGroupDescriptor[];

        public activeMenuGroup = undefined;
        public hiddenActions = [];

        public get computedHiddenActions() {
            return this.hiddenActions;
        }
        public set computedHiddenActions(value: any) {
            this.hiddenActions = value;
        }

        public get computedActiveMenuGroup() {
            return this.activeMenuGroup;
        }
        public set computedActiveMenuGroup(value: any) {
            this.activeMenuGroup = value;
        }

        public get menuActions() {
            return [...this.actions, ...this.groups];
        }

        public get overriddenActions() {
            return sortAndOverrideActionOrder(this.menuActions);
        }

        public handleMenuGroupToggle(group: string) {
            this.computedActiveMenuGroup = this.computedActiveMenuGroup ? undefined : group;
        }

        public handleMenuGroupClose() {
            this.computedActiveMenuGroup = undefined;
        }

    }
</script>

<template>
    <div class="Polaris-ActionMenu-Actions__ActionsLayout">
        <template v-for="(action, index) in overriddenActions">
            <template v-if="'title' in action">
                <div v-if="actions.length > 0" :key="`MenuGroup-${index}`">
                </div>
            </template>
            <template v-else>
                <PActionMenuMenuAction :key="`MenuAction-${index}`" :content="action.content" v-bind="$attrs" onAction="action.onAction" />
            </template>
        </template>
    </div>
</template>

<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {classNames} from '@/utilities/css';
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

        public get menuActions() {
            return [...this.actions, ...this.groups];
        }

        public get overriddenActions() {
            return sortAndOverrideActionOrder(this.menuActions);
        }
    }
</script>

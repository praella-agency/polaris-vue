<template>
    <div :class="actionMenuClassNames">
      <PActionMenuRollupActions v-if="rollup" :items="actions" :sections="rollupSections" />
      <PActionMenuActions v-else :actions="actions" :groups="groups" />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {classNames, variationName} from '@/utilities/css';
import {ActionListSection, MenuActionDescriptor, MenuGroupDescriptor} from '@/types';
import {PActionMenuActions, PActionMenuRollupActions} from './components';

export interface ActionMenuProps {
    actions?: MenuActionDescriptor[];
    groups?: MenuGroupDescriptor[];
    rollup?: boolean;
}

export function hasGroupsWithActions(groups: ActionMenuProps['groups'] = []) {
    return groups.length === 0
        ? false
        : groups.some((group) => group.actions.length > 0);
}

@Component({
    components: {
        PActionMenuActions,
        PActionMenuRollupActions,
    },
})
export default class PActionMenu extends Vue {

    @Prop(Array) public actions!: MenuActionDescriptor[];
    @Prop(Array) public groups!: MenuGroupDescriptor[];
    @Prop({type: Boolean, default: false}) public rollup!: boolean;

    public get rollupSections() {
      console.log(this.groups.map((group) => this.convertGroupToSection(group)));
        return this.groups.map((group) => this.convertGroupToSection(group));
    }

    public convertGroupToSection({title, actions}: MenuGroupDescriptor): ActionListSection {
        return {title, items: actions};
    }

    public get actionMenuClassNames() {
        return classNames(
            'Polaris-ActionMenu',
            this.rollup && 'Polaris-ActionMenu--rollup',
        );
    }
}
</script>

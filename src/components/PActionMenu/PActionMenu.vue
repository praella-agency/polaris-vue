<template>
    <div :class="actionMenuClassNames">
      <PActionMenuRollupActions v-if="rollup" :items="actions" :sections="rollupSections" />
      <PActionMenuActions v-else :actions="actions" :groups="groups" />
    </div>
</template>

<script>
import {classNames} from '../../utilities/css';
import {MenuActionDescriptor, MenuGroupDescriptor} from '../../types';
import {PActionMenuRollupActions} from '../../components/PActionMenu/components/PActionMenuRollupActions';
import {PActionMenuActions} from '../../components/PActionMenu/components/PActionMenuActions';
import ArrayValidator from '../../utilities/validators/ArrayValidator';

export default {
  name: 'PActionMenu',
  components: {
    PActionMenuActions, PActionMenuRollupActions,
  },
  props: {
    actions: {
      type: Array,
      ...ArrayValidator('actions', MenuActionDescriptor)
    },
    groups: {
      type: Array,
      ...ArrayValidator('groups', MenuGroupDescriptor)
    },
    rollup: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    rollupSections() {
      return this.groups.map((group) => this.convertGroupToSection(group));
    },
    actionMenuClassNames() {
      return classNames(
          'Polaris-ActionMenu',
          this.rollup && 'Polaris-ActionMenu--rollup',
      );
    }
  },
  methods: {
    convertGroupToSection(MenuGroupDescriptor) {
      return {
        title: MenuGroupDescriptor.title,
        items: MenuGroupDescriptor.actions,
      };
    }
  },
}
</script>

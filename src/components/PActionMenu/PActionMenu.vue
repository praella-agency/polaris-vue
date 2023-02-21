<template>
    <div :class="actionMenuClassNames">
      <PActionMenuRollupActions v-if="rollup" :items="actions" :sections="rollupSections" />
      <PActionMenuActions v-else :actions="actions" :groups="groups" />
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import {classNames} from '../../utilities/css';
import {MenuActionDescriptor, MenuGroupDescriptor} from '../../types';
import {PActionMenuRollupActions} from '../../components/PActionMenu/components/PActionMenuRollupActions';
import {PActionMenuActions} from '../../components/PActionMenu/components/PActionMenuActions';
import ArrayValidator from '../../utilities/validators/ArrayValidator';

export default defineComponent({
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
  setup(props) {
    const rollupSections = computed(() => {
      return props.groups.map((group) => convertGroupToSection(group));
    });
    const actionMenuClassNames = computed(() => {
      return classNames(
          'Polaris-ActionMenu',
          props.rollup && 'Polaris-ActionMenu--rollup',
      );
    });

    function convertGroupToSection(MenuGroupDescriptor) {
      return {
        title: MenuGroupDescriptor.title,
        items: MenuGroupDescriptor.actions,
      };
    }

    return { rollupSections, actionMenuClassNames, convertGroupToSection };
  }
})
</script>

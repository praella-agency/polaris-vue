<template>
   <PPopover :id="`Popover${uuidVal}`" :active="rollupOpen" preferredAlignment="right" @close="toggleRollupOpen" hideOnPrint>
       <template #activator>
           <div class="Polaris-ActionMenu-RollupActions__RollupActivator">
               <PButton :plain="true" :outline="false" icon="HorizontalDotsMinor" type="button" @click="toggleRollupOpen" />
           </div>
       </template>
       <template #content>
           <PActionList :items="items" :sections="sections" @item-action="toggleRollupOpen" />
       </template>
   </PPopover>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { uuid } from '../../../../ComponentHelpers';
import {ActionListSection, ActionListItemDescriptor } from '../../../../types';
import {PPopover} from '../../../../components/PPopover';
import {PButton} from '../../../../components/PButton';
import {PActionList} from '../../../../components/PActionList';
import ArrayValidator from '../../../../utilities/validators/ArrayValidator';

export default defineComponent({
  name: 'PActionMenuRollupActions',
  components: {
    PPopover, PButton, PActionList,
  },
  props: {
    items: {
      type: Array,
      ...ArrayValidator('items', ActionListItemDescriptor)
    },
    sections: {
      type: Array,
      ...ArrayValidator('sections', ActionListSection)
    }
  },
  setup() {
      let rollupOpen = ref(false);
      const uuidVal = computed(() => {
        return uuid();
      });
      function toggleRollupOpen() {
        rollupOpen.value = !rollupOpen.value;
      }
      return { rollupOpen, uuidVal, toggleRollupOpen };
  },
  methods: {

  }
})
</script>

<template>
   <PPopover :id="`Popover${this['_uid']}`" :active="rollupOpen" preferredAlignment="right" @close="toggleRollupOpen" hideOnPrint>
       <div slot="activator" class="Polaris-ActionMenu-RollupActions__RollupActivator">
           <PButton :plain="true" :outline="false" icon="HorizontalDotsMinor" type="button" @click="toggleRollupOpen" />
       </div>
       <PActionList slot="content" :items="items" :sections="sections" @item-action="toggleRollupOpen" />
   </PPopover>
</template>

<script>
import {ActionListSection, ActionListItemDescriptor } from './../../../../types/types.js';
import {PPopover} from '@/components/PPopover';
import {PButton} from '@/components/PButton';
import {PActionList} from '@/components/PActionList';
import ArrayValidator from "./../../../../utilities/validators/ArrayValidator";

export default {
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
  data() {
    return {
      rollupOpen: false,
    }
  },
  methods: {
    toggleRollupOpen() {
      this.rollupOpen = !this.rollupOpen;
    }
  }
}
</script>

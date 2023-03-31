<template>
   <PPopover :id="`Popover${isUuid}`" :active="rollupOpen" preferredAlignment="right" @close="toggleRollupOpen" hideOnPrint>
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

<script setup>
import { ref, computed } from 'vue';
import { uuid } from '../../../../ComponentHelpers';
import {ActionListSection, ActionListItemDescriptor } from '../../../../types';
import {PPopover} from '../../../../components/PPopover';
import {PButton} from '../../../../components/PButton';
import {PActionList} from '../../../../components/PActionList';
import ArrayValidator from '../../../../utilities/validators/ArrayValidator';

let props = defineProps({
    items: {
        type: Array,
        ...ArrayValidator('items', ActionListItemDescriptor)
    },
    sections: {
        type: Array,
        ...ArrayValidator('sections', ActionListSection)
    }
});

let rollupOpen = ref(false);

let isUuid = computed(() => {
    return uuid();
});

function toggleRollupOpen() {
    rollupOpen.value = !rollupOpen.value;
}
</script>

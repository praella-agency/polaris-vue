<template>
   <PPopover :id="`Popover${this['_uid']}`" :active="rollupOpen" preferredAlignment="right" @close="toggleRollupOpen" hideOnPrint>
       <div slot="activator" class="Polaris-ActionMenu-RollupActions__RollupActivator">
           <PButton :plain="true" :outline="false" icon="HorizontalDotsMinor" type="button" @click="toggleRollupOpen" />
       </div>
       <PActionList slot="content" :items="items" :sections="sections" @item-action="toggleRollupOpen" />
   </PPopover>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {ActionListSection, ActionListItemDescriptor } from '@/types';
import {PPopover} from '@/components/PPopover';
import {PButton} from '@/components/PButton';
import {PActionList} from '@/components/PActionList';

@Component({
    components: {
        PPopover, PButton, PActionList,
    },
})
export default class PActionMenuRollupActions extends Vue {

    @Prop(Array) public items!: ActionListItemDescriptor[];
    @Prop(Array) public sections!: ActionListSection[];

    public rollupOpen = false;

    public toggleRollupOpen() {
        this.rollupOpen = !this.rollupOpen;
    }
}
</script>

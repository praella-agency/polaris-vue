<template>
    <PPopover
        :id="this['_uid']"
        :active="isVisible"
        @close="toggleMenuVisibility"
        preferInputActivator
    >
        <PBulkActionButton
            slot="activator"
            disclosure
            @action="toggleMenuVisibility"
            :content="title"
            :indicator="isNewBadgeInBadgeActions"
        />
        <PActionList
            slot="content"
            :items="actions"
            @item-action="toggleMenuVisibility"
        />
    </PPopover>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PPopover } from '@/components/PPopover/index.js';
  import { PActionList } from '@/components/PActionList';
  import { PBulkActionButton } from '@/components/PBulkActions/components/PBulkActionButton';

  @Component({
    components: {
      PBulkActionButton, PPopover, PActionList,
    },
  })
  export default class PBulkActionMenu extends Vue {
    @Prop({type: String, default: null}) public title!: string;
    @Prop({type: Array, default: () => ([])}) public actions!: [];
    @Prop({type: Boolean, default: false}) public isNewBadgeInBadgeActions!: boolean;

    public isVisible = false;

    public toggleMenuVisibility() {
      this.isVisible = !this.isVisible;
    }
  }
</script>

<style scoped>

</style>
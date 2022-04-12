<template>
    <PPopover :id="`Popover${new Date().getUTCMilliseconds()}`" :active="Boolean(active)" preferredAlignment="left" hideOnPrint @close="handleClose">
        <template #activator>
            <PActionMenuMenuAction disclosure :content="title" :getOffsetWidth="getOffsetWidth" :icon="icon" :onAction="handleOpen" />
        </template>
        <template #content>actionsLayoutRef
            <PActionList :items="actions" @item-action="handleClose" />
        </template>
        <div v-if="$slots.details" class="">
            <slot name="details" />
        </div>
    </PPopover>
</template>

<script>
import {MenuGroupDescriptor, ActionListItemDescriptor} from '../../../../types';
import {PActionList} from '../../../../components/PActionList';
import {PPopover} from '../../../../components/PPopover';
import { PActionMenuMenuAction } from '../../../../components/PActionMenu/components/PActionMenuMenuAction';
import ArrayValidator from '../../../../utilities/validators/ArrayValidator';

export default {
  name: 'PActionMenuMenuGroup',
  components: {
    PPopover, PActionList, PActionMenuMenuAction,
  },
  props: {
    active: {
      type: Boolean
    },
    title: {
      type: String
    },
    icon: {
      type: String,
      default: null,
    },
    onAction: {
      type: Function,
    },
    getOffsetWidth: {
      type: Function,
    },
    actions: {
      type: Array,
      ...ArrayValidator('actions', ActionListItemDescriptor)
    }
  },
  methods: {
    handleClose() {
      this.onAction(this.title);
    },
    handleOpen() {
      this.$emit('open', this.title);
    }
  },
}
</script>

<template>
    <PPopover :id="`Popover${this['_uid']}`" :active="Boolean(active)" preferredAlignment="left" hideOnPrint @close="handleClose">
        <PActionMenuMenuAction slot="activator" disclosure :content="title" :getOffsetWidth="getOffsetWidth" :icon="icon" :onAction="handleOpen" />
        <PActionList slot="content" :items="actions" @item-action="handleClose" />
        <div v-if="$slots.details" class="">
            <slot name="details" />
        </div>
    </PPopover>
</template>

<script>
import {MenuGroupDescriptor, ActionListItemDescriptor} from './../../../../types/types.js';
import {PActionList} from '@/components/PActionList';
import {PPopover} from '@/components/PPopover';
import { PActionMenuMenuAction } from './../../../../components/PActionMenu/components/PActionMenuMenuAction/index.js';
import ArrayValidator from "./../../../../utilities/validators/ArrayValidator";

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

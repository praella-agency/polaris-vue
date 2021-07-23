<template>
  <div>
  <PPopover
      :active="popoverActive"
      @close="onClose"
      fixed
      preferredAlignment="right"
  >
    <div class="Polaris-TopBar-Menu__ActivatorWrapper" slot="activator">
      <PButton
          class="Polaris-TopBar-Menu__Activator"
          @click="toggleActive"
      >
        <slot name="activatorContent">
        More Actions
        </slot>
      </PButton>
    </div>
    <PActionList slot="content" :items="items" />
  </PPopover>
    <PMessage
        v-if="Object.keys(message).length > 0"
        :title="message.title"
        :description="message.description"
        :action="{onAction: message.action.onAction,
                 content: message.action.content}"
        :link="{to: message.link.to,
                content: message.link.content}"
        :badge="message.badge"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PActionList } from '@/components/PActionList';
import { PPopover } from '@/components/PPopover';
import { PMessage } from './components/PMessage';
import {PButton} from '@/components/PButton';
import {classNames} from '@/utilities/css';

@Component({
  components: {
    PActionList,
    PPopover,
    PMessage,
    PButton
  },
})
export default class PMenu extends Vue {
  focused = true;
  popoverActive = false;

  @Prop({type: Array, default: () => ([])}) public items!: any[];
  @Prop({type: Object, default: () => ({})}) public message!: object;
  @Prop({type: Function, default: null}) public onOpen!: void;
  @Prop({type: Function, default: null}) public onClose!: void;


  public get className() {
    return classNames(
        'Polaris-Popover__Section',
        'Polaris-Popover__Section+ Polaris-Popover__Section'
    );
  }

  public toggleActive() {
    this.popoverActive = !this.popoverActive;
  }
}
</script>

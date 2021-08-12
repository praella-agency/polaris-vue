<template>
  <div>
    <PPopover
        :active="open"
        @close="onClose"
        fixed
        preferredAlignment="right"
    >
      <div class="Polaris-TopBar-Menu__ActivatorWrapper" slot="activator">
        <button
            type="button"
            class="Polaris-TopBar-Menu__Activator"
            @click="onOpen"
            :aria-label="accessibilityLabel"
        >
          <slot name="activatorContent"/>
        </button>
      </div>
      <PActionList slot="content" :sections="actions"/>
      <PMessage
          :title="message.title"
          :description="message.description"
          :action="{
            onClick: message.action.onClick,
            content: message.action.content
          }"
          :link="{
            to: message.link.to,
            content: message.link.content
          }"
          :badge="message && message.badge ? {
              content: message.badge.content,
              status: message.badge.status
          } : {}"
      />
    </PPopover>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { PActionList } from '@/components/PActionList';
  import { PPopover } from '@/components/PPopover';
  import { PMessage } from './components/PMessage';
  import { classNames } from '@/utilities/css';
  import { ActionListProps, MessageProps } from '@/types';

  @Component({
    components: {
      PActionList,
      PPopover,
      PMessage,
    },
  })
  export default class PMenu extends Vue {
    focused = true;
    popoverActive = false;

    /**
     * An array of action objects that are rendered inside of a popover triggered by this menu
     */
    @Prop({type: Array, default: () => ([])}) public actions!: ActionListProps['sections'];

    /**
     * Accepts a message that facilitates direct, urgent communication with the merchant through the menu
     */
    @Prop({type: Object, default: () => ({})}) public message!: MessageProps;

    /**
     * A boolean property indicating whether the menu is currently open
     */
    @Prop({type: Boolean, default: false}) public open!: boolean;

    /**
     * A callback function to handle opening the menu popover
     */
    @Prop({type: Function}) public onOpen!: void;

    /**
     * A callback function to handle closing the menu popover
     */
    @Prop({type: Function}) public onClose!: void;

    /** A string that provides the accessibility labeling */
    @Prop({type: String, default: null}) public accessibilityLabel!: string;

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

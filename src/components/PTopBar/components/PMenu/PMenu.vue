<template>
  <div>
    <PPopover
        :id="id"
        :active="open"
        :close="onClose"
        fixed
        :fullHeight="isFullHeight"
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
          slot="content"
          v-if="Object.keys(message).length > 0"
          :title="message.title"
          :description="message.description"
          :action="Object.keys(message).length > 0 ? {
            onClick: message.action !== undefined ? message.action.onClick : {},
            content: message.action !== undefined ? message.action.content : ''
          }: {}"
          :link="Object.keys(message).length > 0 ? {
            to: message.link !== undefined ? message.link.to : '',
            content: message.link !== undefined ? message.link.content : '',
            external: message.link !== undefined ? message.link.external : false,
          } : {}"
          :badge="message && message.badge ? {
              content: message.badge !== undefined ? message.badge.content : '',
              status: message.badge !== undefined ? message.badge.status : ''
          } : {}"
      />
    </PPopover>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PActionList } from '@/components/PActionList';
  import { PPopover } from '@/components/PPopover/index.js';
  import { PMessage } from './components/PMessage';
  import { ActionListProps, MessageProps } from '@/types';

  @Component({
    components: {
      PActionList, PPopover, PMessage,
    },
  })
  export default class PMenu extends Vue {
    /**
     * Id for the Menu
     */
    @Prop({type: String, required: true}) public id!: string;

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
    @Prop({type: Boolean}) public open!: boolean;

    /**
     * A callback function to handle opening the menu popover
     */
    /* tslint:disable-next-line */
    @Prop({type: Function, default: () => {}}) public onOpen!: void;

    /**
     * A callback function to handle closing the menu popover
     */
    @Prop({type: Function}) public onClose!: void;

    /**
     * A string that provides the accessibility labeling
     */
    @Prop({type: String, default: null}) public accessibilityLabel!: string;

    public focused = true;

    public get className() {
      return classNames(
        'Polaris-Popover__Section',
        'Polaris-Popover__Section+ Polaris-Popover__Section',
      );
    }

    public get isFullHeight() {
        return Object.keys(this.message).length > 0;
    }
  }
</script>

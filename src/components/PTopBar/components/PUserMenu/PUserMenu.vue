<template>
  <PMenu
    :open="open"
    :on-open="$emit('toggle')"
    :on-close="$emit('toggle')"
    :actions="actions"
    :message="message"
    :accessibility-label="accessibilityLabel"
  >
    <template v-slot="activatorContent">
      <PMessageIndicator :active="showIndicator">
        <PAvatar
            size="small"
            :source="avatar"
            :initials="initials && initials.replace(' ', '')"
        />
      </PMessageIndicator>
      <span class="Polaris-TopBar-UserMenu__Details">
        <p class="Polaris-TopBar-UserMenu__Name">{{ name }}</p>
        <p class="Polaris-TopBar-UserMenu__Detail">{{ detail }}</p>
      </span>
    </template>
  </PMenu>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PIcon } from '@/components/PIcon';
  import PMenu from '@/components/PTopBar/components/PMenu/PMenu.vue';
  import { PMessageIndicator } from '@/components/PMessageIndicator';
  import { PAvatar } from '@/components/PAvatar';
  import { MessageProps } from '@/types';

  type IconSource = 'placeholder' | string;

  export interface Action {
    /** Source of the icon */
    icon?: IconSource;
    /** A unique identifier for the action */
    id?: string;
    /** Content the action displays */
    content?: string;
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** A destination to link to, rendered in the action */
    url?: string;
    /** Forces url to open in a new tab */
    external?: boolean;

    /** Callback when an action takes place */
    onAction?(): void;

    /** Callback when mouse enter */
    onMouseEnter?(): void;

    /** Callback when element is touched */
    onTouchStart?(): void;
  }

  @Component({
    components: {
      PIcon,
      PMenu,
      PMessageIndicator,
      PAvatar,
    },
  })
  export default class PUserMenu extends Vue {
    /**
     * An array of action objects that are rendered inside of a popover triggered by this menu
     */
    @Prop({type: Array, default: null}) public actions!: { items: Action[] }[];

    /**
     * Accepts a message that facilitates direct, urgent communication with the merchant through the user menu
     */
    @Prop({type: Object, default: () => ({})}) public message!: MessageProps;

    /**
     * A string detailing the merchant’s full name to be displayed in the user menu \
     */
    @Prop({type: String, default: null}) public name!: string;

    /**
     * A string allowing further detail on the merchant’s name displayed in the user menu
     */
    @Prop({type: String, default: null}) public detail!: string;

    /**
     * A string that provides the accessibility labeling
     */
    @Prop({type: String, default: null}) public accessibilityLabel!: string;

    /**
     * The merchant’s initials, rendered in place of an avatar image when not provided
     */
    @Prop({type: String, default: null}) public initials!: string;

    /**
     * An avatar image representing the merchant
     */
    @Prop({type: String, default: null}) public avatar!: string;

    /**
     * A boolean property indicating whether the user menu is currently open
     */
    @Prop({type: Boolean, required: true}) public open!: boolean;

    public showIndicator = Boolean(this.message);
  }
</script>

<template>
<PMenu>
  <div slot="activatorContent">
  <PMessageIndicator :active="indicatorActive">
    <PAvatar
        size="small"
        :initials="initials && initials.replace(' ', '')"
    >
    </PAvatar>
  </PMessageIndicator>
  <span class="Polaris-TopBar-UserMenu__Details">
      <p class="Polaris-TopBar-UserMenu__Name">{{ name }}</p>
      <p class="Polaris-TopBar-UserMenu__Detail">{{ detail }}</p>
  </span>
  </div>
</PMenu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PIcon } from '@/components/PIcon';
import PMenu from '@/components/PTopBar/components/PMenu/PMenu.vue';
import {PMessageIndicator} from '@/components/PMessageIndicator';
import {PAvatar} from '@/components/PAvatar';

@Component({
  components: {
    PIcon,
    PMenu,
    PMessageIndicator,
    PAvatar,
  },
})
export default class PUserMenu extends Vue {

  @Prop({type: Boolean, default: false}) public open!: boolean;
  @Prop({type: Boolean, default: false}) public indicatorActive!: boolean;
  @Prop({type: String, default: "J"}) public initials!: string;
  @Prop() public name!: string;
  @Prop() public detail?: string;

}
</script>

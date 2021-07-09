<template>
  <div class="Polaris-TopBar">
    <PButton
        v-show="showNavigationToggle"
        :class="iconClassName"
        @click="onNavigationToggle"
        @focus="focused = true"
        @blur="focused = false"
    >
      <PIcon source="MobileHamburgerMajorMonotone" />
    </PButton>
    <div :class="className">
      <PUnstyledLink
          url="http://www.google.com"
          class="Polaris-TopBar__LogoLink"
          style="width: 140px"
      >
        <PImage source="https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999"
                alt="logo"
                class="Polaris-TopBar__Logo"
                style="width: 140px"
        />
      </PUnstyledLink>
    </div>
    <PTextField id="Polaris-Input-Filter"  connected labelHidden showPrefix showClearButton placeholder="resourceTitle" >
      <PIcon source="SearchMinor" slot="prefix"></PIcon>
    </PTextField>
    <PPopover
        :active="popoverActive"
        @close="popoverActive = !popoverActive"
        full-width
        preferredAlignment="right"
    >
      <PAvatar
          slot="activator"
          @click="popoverActive = !popoverActive"
      />
      <POptionList
          slot="content"
          :options="[
                      {label: 'Active Little Long Content', value: 1},
                      {label: 'In-Active', value: 0},
                  ]"
          :selected="status"
          @change="updateStatusFilter"
      ></POptionList>
    </PPopover>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';


import { PIcon } from '@/components/PIcon';
import { PButton } from '@/components/PButton';
import { PUnstyledLink } from '@/components/PUnstyledLink';
import { PImage } from '@/components/PImage';
import { PTextField } from '@/components/PTextField';
import { PPopover } from '@/components/PPopover';
import { POptionList } from '@/components/POptionList';
import { PAvatar } from '@/components/PAvatar';


@Component({
  components: { PIcon, PButton, PUnstyledLink, PImage, PTextField, PPopover, POptionList, PAvatar },
})
export default class PTopBar extends Vue {
  focused = true;
  popoverActive = false;

  @Prop({type: Boolean, default: true}) public showNavigationToggle!: boolean;
  @Prop({type: Function, default: null}) public onNavigationToggle!: void;

  public get className() {
    return classNames(
        'Polaris-TopBar__LogoContainer',
    );
  }

  public get iconClassName() {
    return classNames(
        'Polaris-TopBar__NavigationIcon',
        this.focused && 'Polaris-TopBar__NavigationIcon Polaris-TopBar--focused',
    );
  }
}
</script>

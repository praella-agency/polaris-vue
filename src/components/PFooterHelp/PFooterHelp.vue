<template>
  <div :class="className">
    <div class="Polaris-FooterHelp__Content">
      <slot name="icon">
        <div class="Polaris-FooterHelp__Icon">
          <PIcon color="teal" source="CircleInformationMajorMonotone" />
        </div>
      </slot>
      <div class="Polaris-FooterHelp__Text">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {classNames, variationName} from '@/utilities/css';
import {PIcon} from '@/components/PIcon';

@Component({
  components: { PIcon },
})

export default class PFooterHelp extends Vue {

  @Prop(String) public id!: string;
  @Prop(String) public url!: string;
  @Prop(String) public to!: string;
  @Prop(Boolean) public external!: boolean;
  @Prop(Boolean) public monochrome!: boolean;

  public get isStringSlot() {

    const slots = (this.$slots.default || []);
    return this.external && slots.length === 1 && slots[0].text;
  }

  public get className() {
    return classNames(
        'Polaris-FooterHelp',
    );
  }
}
</script>

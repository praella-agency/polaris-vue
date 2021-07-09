<template>
  <div :class="className">
    <div class="Polaris-FooterHelp__Content">
      <!-- @slot Icon content -->
      <slot name="icon">
        <div class="Polaris-FooterHelp__Icon">
          <PIcon color="teal" source="CircleInformationMajor" />
        </div>
      </slot>
      <div class="Polaris-FooterHelp__Text">
        <!-- @slot Default content -->
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

  /**
   * Id for the element
   */
  @Prop({type: String, default: null}) public id!: string;

  /**
   * Url for the footer
   */
  @Prop({type: String, default: null}) public url!: string;

  /**
   * Set to for router link
   */
  @Prop({type: String, default: null}) public to!: string;

  /**
   * Makes the link open in a new tab.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public external!: boolean;

  /**
   * Makes the link color the same as the current text color and adds an underline.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public monochrome!: boolean;

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

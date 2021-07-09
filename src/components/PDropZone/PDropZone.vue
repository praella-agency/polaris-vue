<template>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import { PIcon } from '@/components/PIcon';
import { UploadMajor, CircleAlertMajor } from '@/assets/shopify-polaris-icons/index';
import { PStack } from '@/components/PStack';
import { PCaption } from '@/components/PCaption';
import { PDisplayText } from '@/components/PDisplayText';

type Type = 'file' | 'image';

@Component({
  components: {
    PIcon,
  },
})
export default class PDropZone extends Vue {
  @Prop({ type: String, default: 'file' }) public type!: Type;
  @Prop({ type: Boolean, default: true }) public outline!: boolean;
  @Prop({ type: Boolean, default: true }) public overlay!: boolean;
  @Prop({ type: Boolean, default: true }) public allowMultiple!: boolean;
  @Prop(Boolean) public focused!: boolean;
  @Prop(Boolean) public active!: boolean;
  @Prop(Boolean) public disabled!: boolean;
  @Prop(Boolean) public size!: boolean;

  public get className() {
    return classNames(
      'Polaris-DropZone',
      this.outline && 'Polaris-DropZone--hasOutline',
      // this.spacing && `Polaris-DropZone--${variationName('spacing', this.spacing)}`,
    );
  }

  public capitalize(word = '') {
    const wordLower = word.toLowerCase();
    return wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
  }
}
</script>

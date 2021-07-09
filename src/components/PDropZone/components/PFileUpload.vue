<template>
    <div :class="className">
        <template v-if="size === 'extraLarge'">
            <PStack vertical>
                <PStackItem>
                    <img src="../images/upload-arrow.svg" width="40" alt="" />
                </PStackItem>
                <PStackItem>
                    <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                        <div :class="buttonStyleClassName">
                            {{ actionTitle }}
                        </div>
                    </template>
                </PStackItem>
                <PStackItem>
                    <PTextStyle variation="subdued">
                        {{ actionHint }}
                    </PTextStyle>
                </PStackItem>
            </PStack>
        </template>
        <template v-else-if="size === 'large'">
            <PStack vertical spacing="tight">
                <PStackItem>
                    <img src="../images/upload-arrow.svg" width="40" alt="" />
                </PStackItem>
                <PStackItem>
                    <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                        <div :class="buttonStyleClassName">
                            {{ actionTitle }}
                        </div>
                    </template>
                </PStackItem>
                <PStackItem>
                    <PCaption>
                        <PTextStyle variation="subdued">
                            {{ actionHint }}
                        </PTextStyle>
                    </PCaption>
                </PStackItem>
            </PStack>
        </template>
        <template v-else-if="size === 'medium'">
            <PStack vertical spacing="tight">
                <PStackItem>
                    <div :class="actionTitleClassName">
                        {{ actionTitle }}
                    </div>
                </PStackItem>
                <PStackItem>
                    <PCaption>
                        <PTextStyle variation="subdued">
                            {{ actionHint }}
                        </PTextStyle>
                    </PCaption>
                </PStackItem>
            </PStack>
        </template>
        <template v-else-if="size === 'small'">
            <img src="../images/upload-arrow.svg" width="20" alt="" />
        </template>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';
import {PStack, PStackItem} from '../../PStack/index';
import {PCaption} from '../../PCaption/index';
import {PTextStyle} from '../../PTextStyle/index';

export interface FileUploadProps {
  actionTitle?: string;
  actionHint?: string;
}

interface DropZoneContextType {
  disabled: boolean;
  focused: boolean;
  measuring: boolean;
  allowMultiple: boolean;
  size: string;
  type: string;
}

export const DropZoneContext = {
  disabled: false,
  focused: false,
  size: 'extraLarge',
  type: 'file',
  measuring: false,
  allowMultiple: true,
} as DropZoneContextType;

@Component({
  components: {
    PStack, PCaption, PTextStyle, PStackItem,
  },
})
export default class PFileUploads extends Vue {
  // @Prop({type: String, default: null}) actionTitle!: FileUploadProps['actionTitle'];
  // @Prop({type: String, default: null}) actionHint!: FileUploadProps['actionHint'];

  public size = DropZoneContext.size;
  public measuring = DropZoneContext.measuring;
  public type = DropZoneContext.type;
  public focused = DropZoneContext.focused;
  public disabled = DropZoneContext.disabled;
  public allowMultiple = DropZoneContext.allowMultiple;

  public typeSuffix = this.capitalize(this.type);
  public allowMultipleKey = this.createAllowMultipleKey(this.allowMultiple);

  public get className() {
    return classNames('Polaris-DropZone-FileUpload',
      this.measuring && 'Polaris-DropZone--measuring',
      this.size === 'small' && 'Polaris-DropZone-FileUpload__FileUploadSmallView',
    );
  }

  public get buttonStyleClassName() {
    return classNames(
      (this.size === 'extraLarge' || this.size === 'large')
        ? 'Polaris-DropZone-FileUpload__Button ' + ((this.size && this.size !== 'extraLarge')
        && 'Polaris-DropZone-FileUpload--sizeSlim') + (this.focused && 'Polaris-DropZone-FileUpload--focused')
        + (this.disabled && 'Polaris-DropZone-FileUpload--disabled')
        : null,
    );
  }

  public get actionTitleClassName() {
    return classNames('Polaris-DropZone-FileUpload__ActionTitle',
      this.focused && !this.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--focused',
      this.disabled && 'Polaris-DropZone-FileUpload__ActionTitle--disabled',
    );
  }

  public get actionTitle() {
    return `Polaris.DropZone.${this.allowMultipleKey}.actionTitle${this.typeSuffix}`;
  }

  public get actionHint() {
    return `Polaris.DropZone.${this.allowMultipleKey}.actionHint${this.typeSuffix}`;
  }

  public capitalize(word = '') {
    const wordLower = word.toLowerCase();
    return wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
  }

  public createAllowMultipleKey(allowMultiple: boolean) {
    return allowMultiple ? 'allowMultiple' : 'single';
  }
}
</script>

<style scoped>

</style>
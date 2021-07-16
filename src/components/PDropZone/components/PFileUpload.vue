<template>
    <div :class="className">
        <template v-if="size === 'extraLarge'">
            <PStack vertical>
                <PStackItem>
                    <img src="../images/upload-arrow.svg" width="40" alt=""/>
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
                    <img src="../images/upload-arrow.svg" width="40" alt=""/>
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
            <img src="../images/upload-arrow.svg" width="20" alt=""/>
        </template>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import {classNames} from '@/utilities/css';
  import {PStack, PStackItem} from '../../PStack/index';
  import {PCaption} from '../../PCaption/index';
  import {PTextStyle} from '../../PTextStyle/index';
  import {Context, createAllowMultipleKey, capitalize} from '../context';

  @Component({
    components: {
      PStack, PCaption, PTextStyle, PStackItem,
    },
  })
  export default class PFileUploads extends Vue {
    @Prop({
      type: String,
      default: `Add files`
    }) public actionTitle!: string;

    @Prop({
      type: String,
      default: `or drop files to upload`
    }) public actionHint!: string;

    public size = Context.size;
    public measuring = Context.measuring;
    public type = Context.type;
    public focused = Context.focused;
    public disabled = Context.disabled;
    public allowMultiple = Context.allowMultiple;

    public typeSuffix = capitalize(this.type);
    public allowMultipleKey = createAllowMultipleKey(this.allowMultiple);

    public get className() {
      return classNames(
        'Polaris-DropZone-FileUpload',
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
  }
</script>

<style scoped>

</style>
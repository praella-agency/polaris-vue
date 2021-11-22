<template>
    <div :class="className">
        <template v-if="(size === 'extraLarge' || size === 'large') && variableHeight">
            <PStack vertical spacing="tight">
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
        <template v-else-if="size === 'extraLarge'">
            <PStack vertical>
                <PStackItem>
                    <PIcon source="UploadMajor" color="base" style="width: 40px; height: unset;"/>
                </PStackItem>
                <PStackItem>
                    <template v-if="(size === 'extraLarge' || size === 'large') && buttonStyleClassName">
                        <div :class="buttonStyleClassName" :disabled="disabled">
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
                    <PIcon source="UploadMajor" color="base" style="width: 40px; height: unset;"/>
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
<!--        <template v-else-if="size === 'medium'">-->
<!--            <PStack vertical spacing="tight">-->
<!--                <PStackItem>-->
<!--                    <div :class="actionTitleClassName">-->
<!--                        {{ actionTitle }}-->
<!--                    </div>-->
<!--                </PStackItem>-->
<!--                <PStackItem>-->
<!--                    <PCaption>-->
<!--                        <PTextStyle variation="subdued">-->
<!--                            {{ actionHint }}-->
<!--                        </PTextStyle>-->
<!--                    </PCaption>-->
<!--                </PStackItem>-->
<!--            </PStack>-->
<!--        </template>-->
<!--        <template v-else-if="size === 'small'">-->
<!--        <PIcon source="UploadMajor" color="base" style="width: 40px; height: unset;"/>-->
<!--        </template>-->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PStack } from '@/components/PStack';
import { PStackItem } from '@/components/PStack/components/PStackItem';
import { PCaption } from '@/components/PCaption';
import { PTextStyle } from '@/components/PTextStyle';
import { PIcon } from '@/components/PIcon/index.js';
import { Context, createAllowMultipleKey, capitalize } from '@/components/PDropZone/context';

@Component({
  components: {
    PStack, PCaption, PTextStyle, PStackItem, PIcon,
  },
})
export default class PFileUploads extends Vue {
  @Prop({
    type: String,
  }) public actionTitle!: string;

  @Prop({
    type: String,
  }) public actionHint!: string;

  @Prop({
    type: Boolean,
    default: false,
  }) public disabled!: boolean;

  @Prop({
    type: String,
    default: false,
  }) public size!: string;

  @Prop({
    type: Boolean,
    default: false,
  }) public variableHeight!: boolean;

  public measuring = Context.measuring;
  public type = Context.type;
  public focused = Context.focused;
  public allowMultiple = Context.allowMultiple;

  public get className() {
    return classNames(
      'Polaris-DropZone-FileUpload',
      this.measuring && 'Polaris-DropZone--measuring',
      // this.size === 'small' && 'Polaris-DropZone-FileUpload__FileUploadSmallView',
    );
  }

  public get buttonStyleClassName() {
    return (this.size === 'extraLarge' || this.size === 'large') ?
      classNames(
        'Polaris-DropZone-FileUpload__Button',
        (this.size && this.size !== 'extraLarge') && 'Polaris-DropZone-FileUpload--sizeSlim',
        this.focused && 'Polaris-DropZone-FileUpload--focused',
        this.disabled && 'Polaris-DropZone-FileUpload--disabled',
      ) : null;
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
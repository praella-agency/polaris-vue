<template>
  <PCard>
    <div :class="className">
      <div class="Polaris-MediaCard__MediaContainer Polaris-MediaCard--sizeSmall">
        <PImage v-if="imageSrc" width="100%" height="100%" style="object-fit: cover; object-position: center center;"
                :src="imageSrc"/>
        <vue-plyr>
          <video
              controls
              crossorigin
              playsinline
              :data-poster="videoThumbSrc"
          >
          <source
              v-for="(video, key) in videoSrc" :key="key"
              controls
              crossorigin
              playsinline
              :size="video.size"
              :src="video.src"
              :type="video.type"
          />
          </video>
        </vue-plyr>
      </div>
      <div class="Polaris-MediaCard__InfoContainer">
        <div class="Polaris-Card__Section">
          <!--          <div class="Polaris-MediaCard__Popover">
                      <div>
                       <PButton plain icon="HorizontalDotsMinor"/>
                      </div>
                    </div>-->
          <PStack vertical>
            <PStackItem>
              <div class="Polaris-MediaCard__Heading">
                <PHeading element="h2">{{ title }}</PHeading>
              </div>
            </PStackItem>
            <PStackItem>
              <!-- @slot Default slot -->
              <slot/>
            </PStackItem>
            <PStackItem v-if="hasAction">
              <PButtonGroup>
                <div class="Polaris-MediaCard__PrimaryAction">
                  <PButton v-bind="primaryAction" @click="primaryAction.onAction">
                    {{ primaryAction.content }}
                  </PButton>
                </div>
                <div class="Polaris-MediaCard__SecondaryAction" v-if="secondaryAction">
                  <PButton v-bind="secondaryAction" plain @click="secondaryAction.onAction">
                    {{ secondaryAction.content }}
                  </PButton>
                </div>
              </PButtonGroup>
            </PStackItem>
          </PStack>
        </div>
      </div>
    </div>
  </PCard>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';
import {PCard} from '@/components/PCard';
import {DestructableAction, DisableableAction, IconableAction, LoadableAction, Video} from '@/types';
import VuePlyr from '@hulkapps/vue-plyr';
import '@hulkapps/vue-plyr/dist/vue-plyr.css';
import {PStack, PStackItem} from '@/components/PStack';
import {PHeading} from '@/components/PHeading';
import {PImage} from '@/components/PImage';
import {PButtonGroup} from '@/components/PButtonGroup';

type Size = 'small' | 'medium';

interface PrimaryAction
    extends DestructableAction,
        DisableableAction,
        LoadableAction,
        IconableAction {
  primary?: boolean;
}

@Component({
  components: {
    PCard,
    VuePlyr,
    PStack,
    PStackItem,
    PHeading,
    PImage,
    PButtonGroup,
  },
})
export default class PTag extends Vue {

  /**
   * Heading content.
   */
  @Prop({type: String, default: null}) public title!: string;
  /**
   * Body content
   */
  @Prop({type: String, default: null}) public description!: string;
  /**
   * Whether or not card content should be laid out vertically.
   */
  @Prop({type: Boolean, default: false}) public portrait!: boolean;
  /**
   * Size of the visual media in the card.
   * @values small | medium
   */
  @Prop({type: String, default: 'small'}) public size!: Size;
  /**
   * Main call action, rendered as basic button.
   */
  @Prop({type: Object, default: []}) public primaryAction!: PrimaryAction;
  /**
   * Secondary call action, rendered as plain button.
   */
  @Prop({type: Object, default: []}) public secondaryAction!: PrimaryAction;
  /**
   * Source of image.
   */
  @Prop({type: String, default: null}) public imageSrc!: string;
  /**
   * Source of thumbnail video.
   */
  @Prop({type: String, default: null}) public videoThumbSrc!: string;
  /**
   * Source of video.
   */
  @Prop({type: Array, default: []}) public videoSrc!: Video[];

  public get hasAction() {
    return this.primaryAction || this.secondaryAction;
  }

  public get className() {
    return classNames(
        'Polaris-MediaCard',
        this.portrait && `Polaris-MediaCard--portrait`,
    );
  }
}
</script>

<style scoped lang="scss">

</style>

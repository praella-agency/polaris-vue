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
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
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

  @Prop(String) public title!: string;
  @Prop(String) public description!: string;
  @Prop(Boolean) public portrait!: boolean;
  @Prop(String) public size!: Size;
  @Prop(Object) public primaryAction!: PrimaryAction;
  @Prop(Object) public secondaryAction!: PrimaryAction;
  @Prop(String) public imageSrc!: string;
  @Prop(String) public videoThumbSrc!: string;
  @Prop(Array) public videoSrc!: Video[];

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

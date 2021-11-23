<template>
  <div :class="pageTitleClassName">
    <div v-if="source">
      <PThumbnail size="medium" :source="source" :alt="alt"/>
    </div>
    <div class="Polaris-Header-Title__TitleAndSubtitleWrapper" v-if="title || subtitle">
      <div class="Polaris-Header-Title__TitleWithMetadataWrapper">
        <PDisplayText element="h1" v-html="title" class="Polaris-Header-Title" />
        <div class="Polaris-Header-Title__TitleMetadata" v-if="titleMetadata || $slots.hasOwnProperty('titleMetadata')">
          <template v-if="titleMetadata">{{titleMetadata}}</template>
          <slot v-else name="titleMetadata" />
        </div>
      </div>
      <div v-if="subtitle" class="Polaris-Header-Title__SubTitle">
        <p>{{subtitle}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {PDisplayText} from '@/components/PDisplayText/index.js';
import {PTextStyle} from '@/components/PTextStyle/index.js';
import {classNames} from '@/utilities/css';
import {PThumbnail} from '@/components/PThumbnail/index.js';

export interface PPageHeaderTitleProps {
  title?: string;
  subtitle?: string;
  titleMetadata?: string;
}

@Component({
  components: {
    PDisplayText,
    PTextStyle,
    PThumbnail,
  },
})
export default class PPageHeaderTitle extends Vue {

  @Prop(String) public title!: string;
  @Prop(String) public source!: string;
  @Prop(String) public alt!: string;
  @Prop(String) public subtitle!: string;
  @Prop(String) public titleMetadata!: string;

  public get pageTitleClassName() {
    return classNames(
        this.source && 'Polaris-Header-Title--hasThumbnail',
    );
  }

  public hasThumbnailSlot() {
    return !!this.$slots.thumbnail;
  }
}
</script>

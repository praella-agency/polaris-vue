<template>
  <div>
    <div class="Polaris-Header-Title__TitleAndSubtitleWrapper">
      <div v-if="title" class="Polaris-Header-Title">
        <PDisplayText size="large" element="h1">
          {{ title }}
        </PDisplayText>
      </div>
      <div v-if="subtitle" class="Polaris-Header-Title__Subtitle">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import { PDisplayText } from '@/components/PDisplayText';

@Component({
  components: { PDisplayText },
})
export default class PPageHeaderTitle extends Vue {
  @Prop(String) public title!: string;
  @Prop(String) public subtitle!: string;

  public get className() {
    return classNames(
      'Polaris-Header-Title',
    );
  }
}
</script>

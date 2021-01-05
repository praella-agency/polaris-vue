<template>
  <ExampleContainer title="Page">
    <ExampleContent :code="example1">
      <PPage
              separator
              :primaryAction="primaryAction"
              :secondaryActions="[
                {
                  content: 'Duplicate',
                  accessibilityLabel: 'Secondary action label',
                  onAction: triggerSecondaryAction1,
                },
                {
                  content: 'View on your store',
                  onAction: triggerSecondaryAction2,
                },
              ]"

              :pagination="{
                hasPrevious: true,
                hasNext: true,
                onNext: handleNext,
                onPrevious: handlePrevious
              }"
              title="Page Title " subtitle="Sub title" :breadcrumbs="[{content: 'Products', url: '/products'}]">
        <PBadge slot="titleMetadata">Title MetaData</PBadge>
        <PThumbnail source="https://cdn.hipwallpaper.com/i/39/4/V2YikX.jpg" slot="thumbnail"></PThumbnail>
        <PAvatar initials="HA" slot="additionalNavigation"></PAvatar>
        Page Content
      </PPage>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import { ExampleContainer, ExampleContent } from '@/examples/components';
  import { PHeading } from '@/components/PHeading';
  import { PTextContainer } from '@/components/PTextContainer';
  import { PTextStyle } from '@/components/PTextStyle';
  import {PBreadcrumbs} from "@/components/PBreadcrumbs";
  import {PPage} from "@/components/PPage";
  import {PBadge} from "@/components/PBadge";
  import {PImage} from "@/components/PImage";
  import {PThumbnail} from "@/components/PThumbnail";
  import {PAvatar} from "@/components/PAvatar";

  @Component({
    components: {
      ExampleContainer, ExampleContent,
      PPage, PBadge, PThumbnail, PAvatar
    },
  })
  export default class TitlesAndTextExample extends Vue {
    public example1 = `
      <PPage
        separator
        :primaryAction="primaryAction"
        :secondaryActions="[
          {
            content: 'Duplicate',
            accessibilityLabel: 'Secondary action label',
            onAction: triggerSecondaryAction1,
          },
          {
            content: 'View on your store',
            onAction: triggerSecondaryAction2,
          },
        ]"

        :pagination="{
          hasPrevious: true,
          hasNext: true,
          onNext: handleNext,
          onPrevious: handlePrevious
        }"
        title="Page Title" subtitle="Sub title" :breadcrumbs="[{content: 'Products', url: '/products'}]">
        <PBadge slot="titleMetadata">Title MetaData</PBadge>
        <PThumbnail source="https://cdn.hipwallpaper.com/i/39/4/V2YikX.jpg" slot="thumbnail"></PThumbnail>
        <PAvatar initials="HA" slot="additionalNavigation"></PAvatar>
        Page Content
      </PPage>
  `;

    public primaryAction = {
      content:'Primary Action',
      onAction: this.onClick,
    };

    public secondaryActions = [{
      content: 'Secondary Action',
      onAction: this.onClick,
    }];

    public onClick() {

      alert('Primary Action Triggered');
    };

    public triggerSecondaryAction1() {

      alert('SecondaryAction1 Triggered');
    };

    public triggerSecondaryAction2() {

      alert('SecondaryAction2 Triggered');
    };

    public handleNext() {
      alert('Clicked Next');
    }

    public handlePrevious() {

      alert('Clicked Previous');
    }
  }
</script>

<style lang="scss" scoped>

</style>

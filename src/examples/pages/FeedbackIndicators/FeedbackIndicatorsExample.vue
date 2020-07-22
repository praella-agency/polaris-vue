<template>
  <ExampleContainer title="Feedback Indicators">
    <ExampleContent :code="bannerExample1">
      <PBanner title="Order archived" @dismiss="onDismiss()">
        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
      </PBanner>
    </ExampleContent>

    <ExampleContent :code="bannerExample2">
      <PBanner
        title="Some of your product variants are missing weights"
        status="warning"
        :action="{content: 'Edit variant weights'}"
        @dismiss="onDismiss()">
        <p>
          Add weights to show accurate rates at checkout and when buying shipping
          labels in Shopify.
        </p>
      </PBanner>
    </ExampleContent>

    <ExampleContent :code="bannerExample3">
      <PBanner
        title="Your shipping label is ready to print."
        status="success"
        :action="{content: 'Print label'}"
        @dismiss="onDismiss()"/>
    </ExampleContent>

    <ExampleContent :code="spinnerExample1">
      <PSpinner size="small" color="teal"></PSpinner>
      <PSpinner size="large" color="teal"></PSpinner>
    </ExampleContent>

    <ExampleContent :code="skeletonExample1">
      <PSkeletonBodyText/>
    </ExampleContent>

    <ExampleContent :code="skeletonExample2">
      <PSkeletonDisplayText/>
    </ExampleContent>

    <ExampleContent :code="skeletonExample3">
      <PSkeletonThumbnail/>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PBanner } from '@/components/PBanner';
import { PSpinner } from '@/components/PSpinner';
import { PSkeletonBodyText } from '@/components/PSkeletonBodyText';
import { PSkeletonDisplayText } from '@/components/PSkeletonDisplayText';
import { PSkeletonThumbnail } from '@/components/PSkeletonThumbnail';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PBanner,
    PSpinner,
    PSkeletonBodyText,
    PSkeletonDisplayText,
    PSkeletonThumbnail,
  },
})
export default class FeedbackIndicatorsExample extends Vue {
  public bannerExample1 = `
  <PBanner title="Order archived" @dismiss="onDismiss()">
    <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
  </PBanner>
  `;

  public bannerExample2 = `
  <PBanner
    title="Some of your product variants are missing weights"
    status="warning"
    :action="{content: 'Edit variant weights'}"
    @dismiss="onDismiss()">
    <p>
      Add weights to show accurate rates at checkout and when buying shipping
      labels in Shopify.
    </p>
  </PBanner>
  `;

  public bannerExample3 = `
  <PBanner
    title="Your shipping label is ready to print."
    status="success"
    :action="{content: 'Print label'}"
    @dismiss="onDismiss()"/>
  `;

  public spinnerExample1 = `
  <PSpinner size="small" color="teal"></PSpinner>
  <PSpinner size="large" color="teal"></PSpinner>
  `;

  public skeletonExample1 = `
  <PSkeletonBodyText/>
  `;

  public skeletonExample2 = `
  <PSkeletonDisplayText/>
  `;

  public skeletonExample3 = `
  <PSkeletonThumbnail/>
  `;

  public onDismiss() {
    alert('banner dismissed test');
  }
}
</script>

<style lang="scss" scoped>

</style>

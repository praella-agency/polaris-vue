<template>
  <div
      :class="className"
      role="status"
      aria-label="Page loading"
  >
    <div class="Polaris-SkeletonPage__Header">
      <div
          v-if="breadcrumbs"
          class="Polaris-SkeletonPage__BreadcrumbAction"
          style="width: 60px;"
      >
        <PSkeletonBodyText :lines="1"/>
      </div>
      <div class="Polaris-SkeletonPage__TitleAndPrimaryAction">
        <div class="Polaris-SkeletonPage__TitleWrapper">
          <h1 v-if="title !== null" class="Polaris-SkeletonPage__Title">
            {{ title }}
          </h1>
          <div v-else class="Polaris-SkeletonPage__SkeletonTitle" />
        </div>
        <div
            v-if="primaryAction"
            class="Polaris-SkeletonPage__PrimaryAction"
        >
          <PSkeletonDisplayText size="large"/>
        </div>
      </div>
      <div
          v-if="secondaryActions !== 0"
          class="Polaris-SkeletonPage__Actions"
      >
        <div
            v-for="renderSecondaryAction in renderSecondaryActions(secondaryActions)"
            :key="renderSecondaryAction.key"
            class="Polaris-SkeletonPage__Action"
            :style="renderSecondaryAction.width"
        >
          <PSkeletonBodyText :lines="1"/>
        </div>
      </div>
    </div>
    <div class="Polaris-SkeletonPage__Content">
      <!-- @slot The child elements to render in the skeleton page -->
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PSkeletonBodyText } from '../PSkeletonBodyText';
  import { PSkeletonDisplayText } from '../PSkeletonDisplayText';

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">Skeleton page is used with other skeleton loading components to provide a low fidelity representation
   *  of the user interface (UI) before content appears on the page. It improves load times perceived by merchants.</h4>
   */
  @Component({
    components: {
      PSkeletonBodyText, PSkeletonDisplayText,
    },
  })
  export default class PSkeletonPage extends Vue {
    /**
     * Page title, in large type
     */
    @Prop({type: String, default: null}) public title!: string;

    /**
     * Remove the normal max-width on the page
     */
    @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

    /**
     * Decreases the maximum layout width. Intended for single-column layouts
     */
    @Prop({type: Boolean, default: false}) public narrowWidth!: boolean;

    /**
     * Shows a skeleton over the primary action
     */
    @Prop({type: Boolean, default: false}) public primaryAction!: boolean;

    /**
     * Number of secondary page-level actions to display
     */
    @Prop({type: Number}) public secondaryActions!: number;

    /**
     * Shows a skeleton over the breadcrumb
     */
    @Prop({type: Boolean, default: false}) public breadcrumbs!: boolean;

    public get className() {
      return classNames(
        'Polaris-SkeletonPage__Page',
        this.fullWidth && 'Polaris-SkeletonPage--fullWidth',
        this.narrowWidth && 'Polaris-SkeletonPage--narrowWidth',
      );
    }

    public renderSecondaryActions(actionCount: number) {
      const actions: any = [];
      for (let i = 0; i < actionCount; i++) {
        const width = Math.round(Math.random() * 40 + 60);
        actions.push(
          {
            width: {
              /* tslint:disable-next-line */
              'width': `${width}px`,
            },
            key: i,
          },
        );
      }

      return actions;
    }
  }
</script>

<style scoped>

</style>
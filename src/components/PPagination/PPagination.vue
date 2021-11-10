<template>
    <nav :class="className">
        <PUnstyledLink v-if="previousURL" :class="previousClassName" :url="previousURL">
            <PIcon source="ArrowLeftMinor"/>
        </PUnstyledLink>
        <button v-else type="button" :class="previousClassName" :disabled="!hasPrevious" @click="onPrevious()">
            <PIcon source="ArrowLeftMinor"/>
        </button>
        <div v-if="label" class="Polaris-Pagination__Label">
            <PTextStyle v-if="hasNext && hasPrevious">{{label}}</PTextStyle>
            <PTextStyle v-else variation="subdued">{{label}}</PTextStyle>
        </div>
        <PUnstyledLink v-if="nextURL" :class="nextClassName" :url="nextURL">
            <PIcon source="ArrowRightMinor"/>
        </PUnstyledLink>
        <button v-else type="button" :class="nextClassName" :disabled="!hasNext" @click="onNext()">
            <PIcon source="ArrowRightMinor"/>
        </button>
    </nav>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PUnstyledLink } from '@/components/PUnstyledLink';
  import { PIcon } from '@/components/PIcon';
  import { PTextStyle } from '@/components/PTextStyle';

  export interface PPaginationDescriptor {
    nextTooltip?: string;
    previousTooltip?: string;
    nextURL?: string;
    previousURL?: string;
    hasNext?: boolean;
    hasPrevious?: boolean;
    accessibilityLabel?: string;

    onNext?(): void;

    onPrevious?(): void;
  }

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">Use pagination to let merchants move through an ordered collection of items that has been split
   *  into pages. On the web, pagination uses buttons to move back and forth between pages. On iOS and Android,
   *  pagination uses infinite scrolling.</h4>
   */
  @Component({
    components: {
      PUnstyledLink,
      PIcon,
      PTextStyle,
    },
  })
  export default class PPagination extends Vue {

    /**
     * The URL of the next page
     */
    @Prop(String) public nextURL!: string;

    /**
     * Keyboard shortcuts for the previous button
     */
    @Prop(String) public previousURL!: string;

    /**
     * Text to provide more context in between the arrow buttons
     */
    @Prop(String) public label!: string;

    /**
     * Whether there is a next page to show
     */
    @Prop(Boolean) public hasNext!: boolean;

    /**
     * Whether there is a previous page to show
     */
    @Prop(Boolean) public hasPrevious!: boolean;

    /**
     * Callback when previous button is clicked
     */
    @Prop({type: Function, default: null}) public onPrevious!: void;

    /**
     * Callback when next button is clicked
     */
    @Prop({type: Function, default: null}) public onNext!: void;

    public get className() {
      return classNames(
        'Polaris-Pagination',
      );
    }

    public get previousClassName() {
      return classNames(
        'Polaris-Pagination__Button',
        !this.label && 'Polaris-Pagination__PreviousButton',
      );
    }

    public get nextClassName() {
      return classNames(
        'Polaris-Pagination__Button',
        !this.label && 'Polaris-Pagination__NextButton',
      );
    }
  }
</script>

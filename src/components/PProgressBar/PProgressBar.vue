<template>
  <div :class="className">
    <progress class="Polaris-ProgressBar__Progress" :value="parsedProgress" max="100"/>
    <div class="Polaris-ProgressBar__Indicator" :style="{width: `${parsedProgress}%`}">
      <span class="Polaris-ProgressBar__Label">{{ parsedProgress }}%</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Size = 'small' | 'medium' | 'large';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">The progress bar component is used to visually represent the completion of a task or operation. It
 *  shows how much of the task has been completed and how much is still left.</h4>
 */
@Component
export default class PProgressBar extends Vue {

  /**
   * The progression of certain tasks
   */
  @Prop({type: Number, default: 10}) public progress!: number;

  /**
   * Size of Progressbar
   * @values small, medium, large
   */
  @Prop({type: String, default: 'medium'}) public size!: Size;

  public get className() {
    return classNames(
        'Polaris-ProgressBar',
        this.size && `Polaris-ProgressBar--${variationName('size', this.size)}`,
    );
  }

  public get parsedProgress() {

    let progressWidth;

    if (this.progress < 0) {
      progressWidth = 0;
    } else if (this.progress > 100) {
      progressWidth = 100;
    } else {
      progressWidth = this.progress;
    }

    return progressWidth;
  }
}
</script>

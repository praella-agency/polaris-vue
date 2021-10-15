<template>
  <div
      class="Polaris-Frame-Loading"
      :aria-valuenow="progress"
      :aria-valuemin="0"
      :aria-valuemax="100"
      role="progressbar"
      aria-label="Page loading bar"
  >
    <div
        class="Polaris-Frame-Loading__Level"
        :style="customStyles"
        :ontransitionend="animating = false"
    />
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';

  const STUCK_THRESHOLD = 99;

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">The loading component is used to indicate to merchants that a page is loading or an upload is
   *  processing.</h4>
   */
  @Component({
    components: {}
  })
  export default class PLoading extends Vue {
    public progress: number = 0;
    public animating: boolean = false;

    public mounted() {
      if (this.progress >= STUCK_THRESHOLD || this.animating) {
        return;
      }

      this.updateProgress();
    }

    public updateProgress() {
      window.requestAnimationFrame(() => {
        const step = Math.max((STUCK_THRESHOLD - this.progress) / 10, 1);
        this.animating = true;
        this.progress = this.progress + step;
      });
    }

    public get customStyles() {
      return {
        transform: `scaleX(${Math.floor(this.progress) / 100})`,
      };
    }

    @Watch('progress')
    public onProgressChanged(value) {
      if(value >= STUCK_THRESHOLD) {
        return;
      }

      window.requestAnimationFrame(() => {
        const step = Math.max((STUCK_THRESHOLD - value) / 10, 1);
        this.animating = true;
        this.progress = value + step;
      });
    }
  }
</script>

<style scoped>

</style>
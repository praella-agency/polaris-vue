<template>
  <span :class="className" :style="{'background-color': background, 'color': color}">
    <span v-if="progress" class="Polaris-Badge__Pip">
      <span class="Polaris-VisuallyHidden">{{ progress }}</span>
    </span>
    <span class="Polaris-Badge__Content">
      <!-- @slot The content to display inside the badge -->
      <slot/>
    </span>
  </span>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';

    type Status = 'success' | 'info' | 'attention' | 'warning' | 'new' | 'critical';
    type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
    type Size = 'small' | 'medium';

    const PROGRESS_LABELS: {[key in Progress]: Progress} = {
        incomplete: 'incomplete',
        partiallyComplete: 'partiallyComplete',
        complete: 'complete',
    };

    const STATUS_LABELS: {[key in Status]: Status} = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        attention: 'attention',
        new: 'new',
        critical: 'critical',
    };

    const DEFAULT_SIZE = 'medium';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Badges are used to inform merchants of the status of an object or of an action that’s been taken.
     *  </h4>
     */
    @Component
    export default class PBadge extends Vue {

        /**
         * Set the color of the badge for the given status.
         * @values info | success | warning | attention | critical | new
         */
        @Prop({type: String, default: null}) public status!: Status;

        /**
         * Render a pip showing the progress of a given task.
         * @values incomplete | partiallyComplete | complete
         */
        @Prop({type: String, default: null}) public progress!: Progress;

        /**
         * Set Background color
         */
        @Prop({type: String, default: null}) public background!: string;

        /**
         * Set font color
         */
        @Prop({type: String, default: null}) public color!: string;

        /**
         * Set size of badge
         * @values small | medium
         */
        @Prop({ type: String, default: 'medium' }) public size!: Size;

        public get className() {
            return classNames(
                'Polaris-Badge',
                !this.color && !this.background && this.status && `Polaris-Badge--${variationName('status', this.status)}`,
                this.progress && `Polaris-Badge--${variationName('progress', this.progress)}`,
                this.size && this.size !== DEFAULT_SIZE && `Polaris-Badge--${variationName('size', this.size)}`,
            );
        }
    }
</script>

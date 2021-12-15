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

<script>
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';

    const Status = ['success', 'info', 'attention', 'warning', 'new', 'critical', null, ''];
    const Progress = ['incomplete', 'partiallyComplete', 'complete', null, ''];
    const Size = ['small', 'medium'];

    const DEFAULT_SIZE = 'medium';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Badges are used to inform merchants of the status of an object or of an action that’s been taken.
     *  </h4>
     */
    export default {
        name: 'PBadge',
        props: {
          /**
           * Set the color of the badge for the given status.
           * @values info | success | warning | attention | critical | new
           */
          status: {
            type: String,
            default: null,
            ...StringValidator('status', Status)
          },

          /**
           * Render a pip showing the progress of a given task.
           * @values incomplete | partiallyComplete | complete
           */
          progress: {
            type: String,
            default: null,
            ...StringValidator('progress', Progress)
          },

          /**
           * Set Background color.
           */
          background: {
            type: String,
            default: null,
          },

          /**
           * Set font color.
           */
          color: {
            type: String,
            default: null,
          },

          /**
           * Set size of badge.
           * @values small | medium
           */
          size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', Size)
          }
        },
        computed: {
          className() {
              return classNames(
                  'Polaris-Badge',
                  !this.color && !this.background && this.status && `Polaris-Badge--${variationName('status', this.status)}`,
                  this.progress && `Polaris-Badge--${variationName('progress', this.progress)}`,
                  this.size && this.size !== DEFAULT_SIZE && `Polaris-Badge--${variationName('size', this.size)}`,
              );
          }
        }
    }
</script>

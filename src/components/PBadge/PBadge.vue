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

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { BadgeStatus, BadgeProgress, BadgeSize, DEFAULT_SIZE } from '../variables'
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Badges are used to inform merchants of the status of an object or of an action that’s been taken.
     *  </h4>
     */
    let props = defineProps({
        /**
         * Set the color of the badge for the given status.
         */
        status: {
            type: String,
            default: null,
            ...StringValidator('status', BadgeStatus)
        },

        /**
         * Render a pip showing the progress of a given task.
         */
        progress: {
            type: String,
            default: null,
            ...StringValidator('progress', BadgeProgress)
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
         */
        size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', BadgeSize)
        }
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Badge',
            !props.color && !props.background && props.status && `Polaris-Badge--${variationName('status', props.status)}`,
            props.progress && `Polaris-Badge--${variationName('progress', props.progress)}`,
            props.size && props.size !== DEFAULT_SIZE && `Polaris-Badge--${variationName('size', props.size)}`,
        );
    });
</script>

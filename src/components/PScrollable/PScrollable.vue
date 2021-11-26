<template>
    <div
        ref="scrollArea"
        :class="finalClassName"
        :data-polaris-scrollable="true"
        :tabindex="focusable ? 0 : undefined"
    >
        <!-- @slot Content to display in scrollable area -->
        <slot/>
    </div>
</template>

<script>
    import { classNames } from '@/utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The scrollable component is a container for long form content, such as terms of service, that allows
     *  for scrolling so merchants can expose more text as they read.</h4>
     */
    export default {
      name: 'PScrollable',
      props: {
        /**
         * Scroll content vertically
         */
        vertical: {
          type: Boolean,
          default: false
        },

        /**
         * Scroll content horizontally
         */
        horizontal: {
          type: Boolean,
          default: false
        },

        /**
         * Add a shadow when content is scrollable
         */
        shadow: {
          type: Boolean,
          default: false
        },

        /**
         * Slightly hints content upon mounting when scrollable
         */
        hint: {
          type: Boolean,
          default: false
        },

        /**
         * Adds a tabIndex to scrollable when children are not focusable
         */
        focusable: {
          type: Boolean,
          default: false
        },
      },
      data() {
        return {
          topShadow: false,
          bottomShadow: false,
          scrollPosition: 0,
          canScroll: false,
        }
      },
      computed: {
        finalClassName() {
          return classNames(
              'Polaris-Scrollable',
              this.vertical && 'Polaris-Scrollable--vertical',
              this.horizontal && 'Polaris-Scrollable--horizontal',
              this.topShadow && 'Polaris-Scrollable--hasTopShadow',
              this.bottomShadow && 'Polaris-Scrollable--hasBottomShadow',
              this.vertical && this.canScroll && 'Polaris-Scrollable--verticalHasScrolling',
          );
        }
      },
      methods: {
        handleScroll() {
          if (this.$refs.scrollArea == null) {
            return;
          }

          const {scrollTop, clientHeight, scrollHeight} = (this.$refs.scrollArea);
          const shouldBottomShadow = Boolean(this.shadow && !(scrollTop + clientHeight >= scrollHeight));
          const shouldTopShadow = Boolean(this.shadow && scrollTop > 0 && this.scrollPosition > 0);

          const canScroll = scrollHeight > clientHeight;
          const hasScrolledToBottom = scrollHeight - scrollTop <= clientHeight + 2;

          if (canScroll && hasScrolledToBottom) {
            /**
             * Called when scrolled to the bottom of the scroll area
             */
            this.$emit('scrolledToBottom');
          }

          this.topShadow = shouldTopShadow;
          this.bottomShadow = shouldBottomShadow;
          this.scrollPosition = scrollTop;
          this.canScroll = true;
        },

        scrollHint() {
          if (this.$refs.scrollArea == null) {
            return;
          }

          const {clientHeight, scrollHeight} = (this.$refs.scrollArea);
          if (this.prefersReducedMotion || this.scrollPosition > 0 || scrollHeight <= clientHeight) {
            return;
          }

          const scrollDistance = scrollHeight - clientHeight;
          this.toggleLock();

          this.scrollPosition = scrollDistance > 100 ? 100 : scrollDistance;
          window.requestAnimationFrame(this.scrollStep);
        },
        prevent(event) {
          event.preventDefault();
        },
        prefersReducedMotion() {
          try {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          } catch (err) {
            return false;
          }
        },
        scrollStep() {
          const delta = this.scrollPosition * 0.2;
          this.scrollPosition = delta < 0.2 ? 0 : this.scrollPosition - delta;

          if (this.scrollPosition > 0) {
            window.requestAnimationFrame(this.scrollStep);
          } else {
            this.toggleLock(false);
          }
        },
        toggleLock(shouldLock = true) {
          if (this.$refs.scrollArea == null) {
            return;
          }

          ['scroll', 'touchmove', 'wheel'].forEach((eventName) => {
            if (shouldLock) {
              (this.$refs.scrollArea).addEventListener(eventName, this.prevent);
            } else {
              (this.$refs.scrollArea).removeEventListener(eventName, this.prevent);
            }
          });
        }
      },
      mounted() {
        if (this.$refs.scrollArea == null) {
          return;
        }
        (this.$refs.scrollArea).addEventListener('scroll', () => {
          window.requestAnimationFrame(this.handleScroll);
        });
        window.addEventListener('resize', this.handleScroll);
        window.requestAnimationFrame(() => {
          this.handleScroll();
          if (this.hint) {
            this.scrollHint();
          }
        });
      },
      destroyed() {
        if (this.$refs.scrollArea == null) {
          return;
        }

        (this.$refs.scrollArea).removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleScroll);
      },
      updated() {
        if (this.scrollPosition && (this.$refs.scrollArea) && this.scrollPosition > 0) {
          (this.$refs.scrollArea).scrollTop = this.scrollPosition;
        }
      },
    }
</script>

<style scoped>

</style>
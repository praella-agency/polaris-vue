<template>
  <span :class="className" :aria-label="accessibilityLabel" @click="handleClick" :style="clickable">
    <div v-if="sourceType === 'placeholder'" class="Polaris-Icon__Placeholder"/>
    <img
        v-else-if="sourceType === 'external'"
        class="Polaris-Icon__Img"
        :src="`data:image/svg+xml;utf8,${encodedSource}`"
        alt=""
        aria-hidden="true"
    />
    <div
        v-else
        v-html="enhancedSource"
    />
  </span>
</template>

<script>
    import { DeprecatedIcons } from './index';
    import * as Icon from '../../assets/shopify-polaris-icons';
    import { classNames, variationName } from '../../utilities/css';
    import { encode as encodeSVG } from '../../utilities/svg';
    import StringValidator from '../../utilities/validators/StringValidator';

    const Color = ['base', 'subdued', 'critical', 'interactive', 'warning', 'highlight', 'success', 'primary', null, ''];

    export default {
        name: 'PIcon',
        props: {
            /**
             * Icon to display
             * @see https://polaris-icons.shopify.com/?icon=AbandonedCartMajor available icon list.
             */
            source: {
                type: String,
                default: null
            },

            /**
             * Icon color
             */
            color: {
                type: String,
                default: null,
                ...StringValidator('color', Color),
            },

            /**
             * Show a backdrop behind the icon
             */
            backdrop: {
                type: Boolean,
                default: false
            },

            /**
             * Descriptive text to be read to screenreaders
             */
            accessibilityLabel: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                clickable: {}
            }
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Icon',
                    this.color && (typeof this.color === 'string') && `Polaris-Icon--${variationName('color', this.color)}`,
                    this.color && 'Polaris-Icon--applyColor',
                    this.backdrop && 'Polaris-Icon--hasBackdrop',
                );
            },
            encodedSource() {
                return encodeSVG(this.source);
            },
            sourceType() {
                if (this.source === 'function' || Object.keys(Icon).filter((icon) => icon === this.source).length > 0) {
                    return 'function';
                } else if (this.source === 'placeholder') {
                    return 'placeholder';
                } else {
                    return 'external';
                }
            },
            enhancedSource() {
                if (DeprecatedIcons.indexOf(this.source) > -1) {
                    // tslint:disable-next-line:no-console
                    console.error(this.source + '` this icon has been removed, please use new ' +
                        'instead of this. Refer this link to get updated icons ' +
                        'https://polaris-vue.hulkapps.com/?path=/story/images-icons-icon--icon');
                }

                const sourceIcon = Icon[this.source];
                if (!sourceIcon) {
                    return this.source.replace('<svg', '<svg class="Polaris-Icon__Svg"');
                }
                return sourceIcon.replace('<svg', '<svg class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"');
            }
        },
        methods: {
            handleClick() {
                /**
                 * Handle click event
                 */
                this.$emit('click', event);
            }
        },
        mounted() {
            if (this.$listeners.click) {
                this.clickable = {
                    cursor: 'pointer',
                };
            }
        }
    }
</script>

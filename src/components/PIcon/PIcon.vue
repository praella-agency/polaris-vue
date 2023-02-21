<template>
  <span :class="className" :aria-label="accessibilityLabel" @click="handleClick" :style="clickableStyles">
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
    import { defineComponent, ref, computed, onMounted } from 'vue';
    import { DeprecatedIcons } from './index';
    import * as Icon from '../../assets/shopify-polaris-icons';
    import { classNames, variationName } from '../../utilities/css';
    import { encode as encodeSVG } from '../../utilities/svg';
    import StringValidator from '../../utilities/validators/StringValidator';

    const Color = ['base', 'subdued', 'critical', 'interactive', 'warning', 'highlight', 'success', 'primary', null, ''];

    export default defineComponent({
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
            },

            /**
             * Shows pointer cursor on icon for clickable.
             */
            clickable: {
                type: Boolean,
                default: true
            }
        },
        emits: ['click'],
        setup(props) {
            let clickableStyles = ref({});

            onMounted(() => {
                if (props.clickable) {
                    clickableStyles = {
                        cursor: 'pointer',
                    };
                }
            });

            const className = computed(() => {
                return classNames(
                    'Polaris-Icon',
                    props.color && (typeof props.color === 'string') && `Polaris-Icon--${variationName('color', props.color)}`,
                    props.color && 'Polaris-Icon--applyColor',
                    props.backdrop && 'Polaris-Icon--hasBackdrop',
                );
            });

            const encodedSource = computed(() => {
              console.log('props.source --> ', props.source)
                return encodeSVG(props.source);
            });

            const sourceType = computed(() => {
                if (props.source === 'function' || Object.keys(Icon).filter((icon) => icon === props.source).length > 0) {
                    return 'function';
                } else if (props.source === 'placeholder') {
                    return 'placeholder';
                } else {
                    return 'external';
                }
            });

            const enhancedSource = computed(() => {
                if (DeprecatedIcons.indexOf(props.source) > -1) {
                    // tslint:disable-next-line:no-console
                    console.error(props.source + '` this icon has been removed, please use new ' +
                        'instead of this. Refer this link to get updated icons ' +
                        'https://polaris-vue.hulkapps.com/?path=/story/images-icons-icon--icon');
                }

                const sourceIcon = Icon[props.source];
                if (!sourceIcon) {
                    return props.source.replace('<svg', '<svg class="Polaris-Icon__Svg"');
                }
                return sourceIcon.replace('<svg', '<svg class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"');
            });

            function handleClick() {
                /**
                 * Handle click event
                 */
                emit('click', event);
            }

            function attrs () {
                const onRE = /^on[^a-z]/
                const attributes = {}
                const listeners = {}
                const { $attrs } = this

                for (const property in $attrs) {
                    if (onRE.test(property)) {
                        listeners[property] = $attrs[property]
                    } else {
                        attributes[property] = $attrs[property]
                    }
                }

                return { attributes, listeners }
            }

            return { clickableStyles, className, encodedSource, sourceType, enhancedSource, handleClick, attrs };
        }
    })
</script>

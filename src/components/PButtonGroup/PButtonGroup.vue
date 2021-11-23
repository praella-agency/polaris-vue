<script>
    import { classNames } from '../../utilities/css';
    import ComponentHelpers from '../../ComponentHelpers';
    import { PButtonGroupItem } from '../../components/PButtonGroup/components/PButtonGroupItem/index.js';

    const Spacing = 'extraTight' | 'tight' | 'loose';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Button group displays multiple related actions stacked or in a horizontal row to help with arrangement
     *  and spacing.</h4>
     */
    export default {
        name: 'PButtonGroup',
        components: {
            PButtonGroupItem,
        },
        props: {
            /**
             * Remove top left and right border radius
             * @values true | false
             */
            segmented: {
                type: Boolean,
                default: false,
            },
            /**
             * Buttons will stretch/shrink to occupy the full width
             * @values true | false
             */
            fullWidth: {
                type: Boolean,
                default: false,
            },
            /**
             * Remove top left and right border radius
             * @values true | false
             */
            connectedTop: {
                type: Boolean,
                default: false,
            },
            /**
             * Remove top left and right border radius
             * @values loose, tight, extraTight
             */
            spacing: {
                type: [String, Spacing],
                default: null,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-ButtonGroup',
                    this.segmented && 'Polaris-ButtonGroup--segmented',
                    this.fullWidth && 'Polaris-ButtonGroup--fullWidth',
                    this.connectedTop && 'Polaris-ButtonGroup--connectedTop',
                    this.spacing && `Polaris-ButtonGroup--${this.spacing}`,
                );
            },
        },
        render(createElement) {
            return createElement('div', {
                    class: this.className,
                    attrs: {
                        'data-buttongroup-segmented': this.segmented,
                        'data-buttongroup-full-width': this.fullWidth,
                        'data-buttongroup-connected-top': this.connectedTop,
                    },

                },
                ComponentHelpers.wrapNodesWithComponent(createElement,
                    this.$slots.default || [], PButtonGroupItem),
            );
        },
    }
</script>

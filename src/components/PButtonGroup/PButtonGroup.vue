<script>
    import { vue3 } from '../../ComponentHelpers';
    import utils from '../../utilities';
    import { classNames } from '../../utilities/css';
    import { wrapNodesWithComponent } from '../../ComponentHelpers';
    import { PButtonGroupItem } from '../../components/PButtonGroup/components/PButtonGroupItem';

    const Spacing = 'extraTight' | 'tight' | 'loose';

    let render = {};
    if (utils.isVue3) {
        render = function render() {
            return vue3.h('div', {
                    class: this.className,
                    'data-buttongroup-segmented': this.segmented,
                    'data-buttongroup-full-width': this.fullWidth,
                    'data-buttongroup-connected-top': this.connectedTop,
                },
                wrapNodesWithComponent(
                    vue3.h,
                    this.$slots.default() || [], PButtonGroupItem
                ),
            );
        }
    } else {
        render = function render(createElement) {
            return createElement('div', {
                    class: this.className,
                    attrs: {
                        'data-buttongroup-segmented': this.segmented,
                        'data-buttongroup-full-width': this.fullWidth,
                        'data-buttongroup-connected-top': this.connectedTop,
                    },
                },
                wrapNodesWithComponent(
                    createElement,
                    this.$slots.default || [], PButtonGroupItem
                ),
            );
        }
    }

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
             */
            segmented: {
                type: Boolean,
                default: false,
            },
            /**
             * Buttons will stretch/shrink to occupy the full width
             */
            fullWidth: {
                type: Boolean,
                default: false,
            },
            /**
             * Remove top left and right border radius
             */
            connectedTop: {
                type: Boolean,
                default: false,
            },
            /**
             * Remove top left and right border radius
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
        render,
    }
</script>

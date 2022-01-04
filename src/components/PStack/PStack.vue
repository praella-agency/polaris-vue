<template>
    <div :class="className">
        <!-- @slot Elements to display inside stack -->
        <slot/>
    </div>
</template>
<script>
    import { classNames, variationName } from '../../utilities/css';

    /**
     * @requires PStackItem
     */
    import { PStackItem } from './components/PStackItem';
    import StringValidator from '../../utilities/validators/StringValidator';

    const Spacing = ['extraTight', 'tight', 'loose', 'extraLoose', 'none'];
    const Alignment = ['leading', 'trailing', 'center', 'fill', 'baseline'];
    const Distribution = ['equalSpacing', 'leading', 'trailing', 'center', 'fill', 'fillEvenly'];

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to lay out a horizontal row of components or to achieve no-fuss vertical centering. A stack is made
     *  of flexible items that wrap each of the stack’s children. Options provide control of the wrapping, spacing, and
     *  relative size of the items in the stack.</h4>
     */
    export default {
        name: 'PStack',
        components: {
            PStackItem,
        },
        props: {
            /**
             * Set it true of you need items in vertical.
             */
            vertical: {
                type: Boolean,
            },
            /**
             * Set it true for Word-Wrap.
             */
            wrap: {
                type: Boolean,
                default: true,
            },
            /**
             * Space between two items.
             */
            spacing: {
                type: String,
                default: null,
                ...StringValidator('spacing', Spacing),
            },
            /**
             * Distribution of free space among items.
             */
            distribution: {
                type: String,
                default: null,
                ...StringValidator('distribution', Distribution),
            },
            /**
             * Alignment of items.
             */
            alignment: {
                type: String,
                default: null,
                ...StringValidator('alignment', Alignment),
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Stack',
                    this.vertical && 'Polaris-Stack--vertical',
                    this.spacing && `Polaris-Stack--${variationName('spacing', this.spacing)}`,
                    this.distribution && `Polaris-Stack--${variationName('distribution', this.distribution)}`,
                    this.alignment && `Polaris-Stack--${variationName('alignment', this.alignment)}`,
                    !this.wrap && 'Polaris-Stack--noWrap',
                );
            },
        },
    }
</script>

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
             * Set it true of you need items in vertical
             * @values true | false
             */
            vertical: {
                type: Boolean,
            },
            /**
             * Set it true for Word-Wrap
             * @values true | false
             */
            wrap: {
                type: Boolean,
                default: true,
            },
            /**
             * Space between two items -
             * @values extraTight | tight | loose | extraLoose | none
             */
            spacing: {
                type: String,
                default: null,
                ...StringValidator('spacing', Spacing),
            },
            /**
             * Distribution of free space among items
             * @values equalSpacing | leading | trailing | center | fill | fillEvenly
             */
            distribution: {
                type: String,
                default: null,
                ...StringValidator('distribution', Distribution),
            },
            /**
             * Alignment of items
             * @values leading | trailing | center | fill | baseline
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

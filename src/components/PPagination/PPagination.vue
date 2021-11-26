<template>
    <nav :class="className">
        <PUnstyledLink v-if="previousURL" :class="previousClassName" :url="previousURL">
            <PIcon source="ArrowLeftMinor"/>
        </PUnstyledLink>
        <button v-else type="button" :class="previousClassName" :disabled="!hasPrevious" @click="onPrevious()">
            <PIcon source="ArrowLeftMinor"/>
        </button>
        <div v-if="label" class="Polaris-Pagination__Label">
            <PTextStyle v-if="hasNext && hasPrevious">{{ label }}</PTextStyle>
            <PTextStyle v-else variation="subdued">{{ label }}</PTextStyle>
        </div>
        <PUnstyledLink v-if="nextURL" :class="nextClassName" :url="nextURL">
            <PIcon source="ArrowRightMinor"/>
        </PUnstyledLink>
        <button v-else type="button" :class="nextClassName" :disabled="!hasNext" @click="onNext()">
            <PIcon source="ArrowRightMinor"/>
        </button>
    </nav>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PUnstyledLink } from '../../components/PUnstyledLink';
    import { PIcon } from '../../components/PIcon';
    import { PTextStyle } from '../../components/PTextStyle';

    export const PPaginationDescriptor = {
        nextTooltip: String,
        previousTooltip: String,
        nextURL: String,
        previousURL: String,
        hasNext: Boolean,
        hasPrevious: Boolean,
        accessibilityLabel: String,

        onNext: Function,
        onPrevious: Function,
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use pagination to let merchants move through an ordered collection of items that has been split
     *  into pages. On the web, pagination uses buttons to move back and forth between pages. On iOS and Android,
     *  pagination uses infinite scrolling.</h4>
     */
    export default {
        name: 'PPagination',
        components: {
            PUnstyledLink, PIcon, PTextStyle,
        },
        props: {
            /**
             * The URL of the next page
             */
            nextURL: {
                type: String,
            },
            /**
             * Keyboard shortcuts for the previous button
             */
            previousURL: {
                type: String,
            },
            /**
             * Text to provide more context in between the arrow buttons
             */
            label: {
                type: String,
            },
            /**
             * Whether there is a next page to show
             */
            hasNext: {
                type: Boolean,
            },
            /**
             * Whether there is a previous page to show
             */
            hasPrevious: {
                type: Boolean,
            },
            /**
             * Callback when previous button is clicked
             */
            onPrevious: {
                type: Function,
                default: null,
            },
            /**
             * Callback when next button is clicked
             */
            onNext: {
                type: Function,
                default: null,
            }
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Pagination',
                );
            },
            previousClassName() {
                return classNames(
                    'Polaris-Pagination__Button',
                    !this.label && 'Polaris-Pagination__PreviousButton',
                );
            },
            nextClassName() {
                return classNames(
                    'Polaris-Pagination__Button',
                    !this.label && 'Polaris-Pagination__NextButton',
                );
            },
        },
    }
</script>

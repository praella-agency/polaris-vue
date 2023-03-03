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

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PUnstyledLink } from '../../components/PUnstyledLink';
    import { PIcon } from '../../components/PIcon';
    import { PTextStyle } from '../../components/PTextStyle';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use pagination to let merchants move through an ordered collection of items that have been split
     *  into pages. On the web, pagination uses buttons to move back and forth between pages. On iOS and Android,
     *  pagination uses infinite scrolling.</h4>
     */

    let props = defineProps({
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
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Pagination',
        );
    });

    let previousClassName = computed(() => {
        return classNames(
            'Polaris-Pagination__Button',
            !props.label && 'Polaris-Pagination__PreviousButton',
        );
    });

    let nextClassName = computed(() => {
        return classNames(
            'Polaris-Pagination__Button',
            !props.label && 'Polaris-Pagination__NextButton',
        );
    });
</script>

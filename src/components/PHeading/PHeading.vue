<template>
    <component :is="element" class="Polaris-Heading">
        <!-- @slot The content to display inside the heading -->
        <slot/>
    </component>
</template>

<script>
    import StringValidator from '../../utilities/validators/StringValidator';

    const HeadingTagName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Headings are used as the titles of each major section of a page in the interface. For example,
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/structure-card--card">card components</a>
     *  generally use headings as their title.</h4>
     */
    export default {
        name: 'PHeading',
        props: {
            /**
             * The element name to use for the heading
             */
            element: {
                type: String,
                default: 'h2',
                ...StringValidator('element', HeadingTagName)
            }
        },
    }
</script>

<template>
    <div class="Polaris-Layout">
        <template v-if="sectioned">
            <PLayoutSection>
                <!-- @slot The content to display inside the layout -->
                <slot/>
            </PLayoutSection>
        </template>
        <template v-else>
            <!-- @slot The content to display inside the layout -->
            <slot/>
        </template>
    </div>
</template>

<script>
    import { PLayoutSection } from '../../components/PLayout/components/PLayoutSection';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The layout component is used to create the main layout on a page. Layouts sections come in three
     *  main configurations: one-column, two-column, and annotated. One and two column layouts can be combined in the
     *  same page. Annotated layouts should be used on their own and only on settings pages.</h4>
     */
    export default {
        name: 'PLayout',
        components: {
            PLayoutSection,
        },
        props: {
            /**
             * Automatically adds sections to layout.
             */
            sectioned: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>


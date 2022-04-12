<template>
    <div
        :class="className"
        role="status"
        aria-label="Page loading"
    >
        <div class="Polaris-SkeletonPage__Header">
            <div
                v-if="breadcrumbs"
                class="Polaris-SkeletonPage__BreadcrumbAction"
                style="width: 60px;"
            >
                <PSkeletonBodyText :lines="1"/>
            </div>
            <div class="Polaris-SkeletonPage__TitleAndPrimaryAction">
                <div class="Polaris-SkeletonPage__TitleWrapper">
                    <h1 v-if="title !== null" class="Polaris-SkeletonPage__Title">
                        {{ title }}
                    </h1>
                    <div v-else class="Polaris-SkeletonPage__SkeletonTitle"/>
                </div>
                <div
                    v-if="primaryAction"
                    class="Polaris-SkeletonPage__PrimaryAction"
                >
                    <PSkeletonDisplayText size="large"/>
                </div>
            </div>
            <div
                v-if="secondaryActions !== 0"
                class="Polaris-SkeletonPage__Actions"
            >
                <div
                    v-for="renderSecondaryAction in renderSecondaryActions(secondaryActions)"
                    :key="renderSecondaryAction.key"
                    class="Polaris-SkeletonPage__Action"
                    :style="renderSecondaryAction.width"
                >
                    <PSkeletonBodyText :lines="1"/>
                </div>
            </div>
        </div>
        <div class="Polaris-SkeletonPage__Content">
            <!-- @slot The child elements to render in the skeleton page -->
            <slot/>
        </div>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PSkeletonBodyText } from '../../components/PSkeletonBodyText';
    import { PSkeletonDisplayText } from '../../components/PSkeletonDisplayText';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Skeleton page is used with other skeleton loading components to provide a low fidelity representation
     *  of the user interface (UI) before content appears on the page. It improves load times perceived by merchants.</h4>
     */
    export default {
        name: 'PSkeletonPage',
        components: {
            PSkeletonBodyText, PSkeletonDisplayText,
        },
        props: {
            /**
             * Page title, in large type
             */
            title: {
                type: String,
                default: null
            },

            /**
             * Remove the normal max-width on the page
             */
            fullWidth: {
                type: Boolean,
                default: false
            },

            /**
             * Decreases the maximum layout width. Intended for single-column layouts
             */
            narrowWidth: {
                type: Boolean,
                default: false
            },

            /**
             * Shows a skeleton over the primary action
             */
            primaryAction: {
                type: Boolean,
                default: false
            },

            /**
             * Number of secondary page-level actions to display
             */
            secondaryActions: {
                type: Number,
            },

            /**
             * Shows a skeleton over the breadcrumb
             */
            breadcrumbs: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-SkeletonPage__Page',
                    this.fullWidth && 'Polaris-SkeletonPage--fullWidth',
                    this.narrowWidth && 'Polaris-SkeletonPage--narrowWidth',
                );
            },
        },
        methods: {
            renderSecondaryActions(actionCount) {
                if (typeof actionCount === 'number') {
                    const actions = [];
                    for (let i = 0; i < actionCount; i++) {
                        const width = Math.round(Math.random() * 40 + 60);
                        actions.push(
                            {
                                width: {
                                    /* tslint:disable-next-line */
                                    'width': `${width}px`,
                                },
                                key: i,
                            },
                        );
                    }

                    return actions;
                }
            }
        }
    }
</script>

<style scoped>

</style>
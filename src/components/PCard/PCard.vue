<template>
    <div :class="className">
        <template
            v-if="$slots.hasOwnProperty('title') || title || $slots.hasOwnProperty('short_description') || shortDescription">
            <PCardHeader :actions="actions">
                <!-- @slot Title content for the card -->
                <slot slot="title" name="title" v-if="$slots.hasOwnProperty('title') || title">
                    <PHeading>{{ title }}</PHeading>
                </slot>
                <!-- @slot Short Description content for the card -->
                <slot slot="short_description" name="short_description"
                      v-if="$slots.hasOwnProperty('short_description') || shortDescription">
                    <PCaption>{{ shortDescription }}</PCaption>
                </slot>
                <template slot="children" v-if="$slots.hasOwnProperty('children')">
                    <!-- @slot Inner content of the card -->
                    <slot name="children"/>
                </template>
            </PCardHeader>
        </template>

        <template v-if="$slots.hasOwnProperty('default')">
            <template v-if="sectioned">
                <PCardSection>
                    <!-- @slot Body content for the card -->
                    <slot name="default"/>
                </PCardSection>
            </template>
            <template v-else>
                <!-- @slot Body content for the card -->
                <slot name="default"/>
            </template>
        </template>
        <div v-else>
            <slot/>
        </div>

        <template v-if="$slots.hasOwnProperty('footer')">
            <PCardFooter>
                <!-- @slot Footer content for the card -->
                <slot name="footer"/>
            </PCardFooter>
        </template>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PCardHeader } from '../../components/PCard/components/PCardHeader';
    import { PCardSection } from '../../components/PCard/components/PCardSection';
    import { PCardFooter } from '../../components/PCard/components/PCardFooter';
    import { PHeading } from '../../components/PHeading';
    import { PCaption } from '../../components/PCaption';
    import { PButtonGroup } from '../../components/PButtonGroup/index.js';
    import { PLink } from '../../components/PLink/index.js';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Cards are used to group similar concepts and tasks together to make Shopify easier for merchants to
     *  scan, read, and get things done.</h4>
     */
    export default {
        name: 'PCard',
        components: {
            PCardFooter, PCardHeader, PCardSection, PHeading, PCaption, PButtonGroup, PLink,
        },
        props: {
            /**
             * Title content for the card. **Deprecated** Actions will be removed on future releases,
             * use PCardHeader instead props.
             */
            title: {
                type: String,
                default: null,
            },
            /**
             * Card description. **Deprecated** ShortDescription will be removed on future releases,
             * use PCardHeader instead props.
             */
            shortDescription: {
                type: String,
                default: null,
            },
            /**
             * A less prominent card
             * @values true | false
             */
            subdued: {
                type: Boolean,
                default: false,
            },
            /**
             * Auto wrap content in section
             * @values true | false
             */
            sectioned: {
                type: Boolean,
                default: false,
            },
            /**
             * Actions for Header. **Deprecated** Actions will be removed on future releases,
             * use PCardHeader instead props.
             */
            actions: {
                type: [Array, String],
                default: null,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Card',
                    this.subdued && 'Polaris-Card__Section--subdued',
                );
            },
        },
    }
</script>


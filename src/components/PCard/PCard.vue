<template>
    <div :class="className">
      <template v-if="$slots.hasOwnProperty('title') || title || $slots.hasOwnProperty('short_description') || shortDescription">
        <PCardHeader :actions="actions">
          <!-- @slot Title content for the card -->
          <slot slot="title" name="title" v-if="$slots.hasOwnProperty('title') || title">
            <PHeading>{{title}}</PHeading>
          </slot>
          <!-- @slot Short Description content for the card -->
          <slot slot="short_description" name="short_description" v-if="$slots.hasOwnProperty('short_description') || shortDescription">
            <PCaption>{{shortDescription}}</PCaption>
          </slot>
          <template slot="children" v-if="$slots.hasOwnProperty('children')">
            <!-- @slot Inner content of the card -->
            <slot name="children" />
          </template>
        </PCardHeader>
      </template>

        <template v-if="$slots.hasOwnProperty('default')">
            <template v-if="sectioned">
                <PCardSection>
                    <!-- @slot Body content for the card -->
                    <slot name="default" />
                </PCardSection>
            </template>
            <template v-else>
                <!-- @slot Body content for the card -->
                <slot name="default" />
            </template>
        </template>
        <div v-else>
            <slot/>
        </div>

        <template v-if="$slots.hasOwnProperty('footer')">
            <PCardFooter>
                <!-- @slot Footer content for the card -->
                <slot name="footer" />
            </PCardFooter>
        </template>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';

    import PCardHeader from './PCardHeader.vue';
    import PCardSection from './PCardSection.vue';
    import PCardFooter from '@/components/PCard/PCardFooter.vue';
    import { PHeading } from '@/components/PHeading';
    import { PCaption } from '@/components/PCaption';
    import { PButtonGroup } from '@/components/PButtonGroup';
    import { PLink } from '@/components/PLink';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Cards are used to group similar concepts and tasks together to make Shopify easier for merchants to
     *  scan, read, and get things done.</h4>
     */
    @Component({
        components: {
            PCardFooter, PCardHeader, PCardSection, PHeading, PCaption, PButtonGroup, PLink,
        },
    })
    export default class PCard extends Vue {

        /**
         * Title content for the card. **Deprecated** Actions will be removed on future releases,
         * use PCardHeader instead props.
         */
        @Prop({type: String, default: null}) public title!: string;

        /**
         * Card description. **Deprecated** ShortDescription will be removed on future releases,
         * use PCardHeader instead props.
         */
        @Prop({type: String, default: null}) public shortDescription!: string;

        /**
         * A less prominent card
         * @values true | false
         */
        @Prop({type: Boolean, default: false}) public subdued!: boolean;

        /**
         * Auto wrap content in section
         * @values true | false
         */
        @Prop({type: Boolean, default: false}) public sectioned!: boolean;

        /**
         * Actions for Header. **Deprecated** Actions will be removed on future releases,
         * use PCardHeader instead props.
         */
        @Prop({type: [Array, String], default: null}) public actions!: [];

        public get className() {
            return classNames(
                'Polaris-Card',
                this.subdued && 'Polaris-Card__Section--subdued',
            );
        }
    }
</script>


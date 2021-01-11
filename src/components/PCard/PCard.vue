<template>
  <div :class="className">
    <template v-if="$slots.hasOwnProperty('title') || title || $slots.hasOwnProperty('short_description') || shortDescription">
      <PCardHeader>
        <!-- @slot Title content for the card -->
        <slot slot="title" name="title" v-if="$slots.hasOwnProperty('title') || title">
          <PHeading>{{title}}</PHeading>
        </slot>
        <!-- @slot Short Description content for the card -->
        <slot slot="short_description" name="short_description" v-if="$slots.hasOwnProperty('short_description') || shortDescription">
          <PCaption>{{shortDescription}}</PCaption>
        </slot>
      </PCardHeader>
    </template>

    <div v-if="$slots.hasOwnProperty('default') && $slots.default.length === 1">
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
    </div>
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

    @Component({
        components: {
            PCardFooter,
            PCardHeader, PCardSection, PHeading, PCaption,
        },

    })
    export default class PCard extends Vue {

        /**
         * Title content for the card
         */
        @Prop(String) public title!: string;

        /**
         * Card description
         */
        @Prop(String) public shortDescription!: string;

        /**
         * A less prominent card
         */
        @Prop(Boolean) public subdued!: boolean;

        /**
         * Auto wrap content in section
         */
        @Prop(Boolean) public sectioned!: boolean;

        public get className() {
            return classNames(
                'Polaris-Card',
                this.subdued && 'Polaris-Card--subdued',
            );
        }
    }
</script>


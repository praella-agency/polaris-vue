<template>
  <div class="Polaris-Layout">
    <template v-if="sectioned">
      <PLayoutSection v-bind="$props">
        <slot/>
      </PLayoutSection>
    </template>
    <template v-else>
      <slot/>
    </template>
  </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';

    import PLayoutSection from './PLayoutSection.vue';

    @Component({
        components: {
            PLayoutSection,
        },
    })
    export default class PLayout extends Vue {


      /**
       * Automatically adds sections to layout.
       .
       * @values true | false
       */
      @Prop({type: Boolean, default: false}) public sectioned!: boolean;
      /**
       * Set it true to make it full width.
       * @values true | false
       */
      @Prop({type: Boolean, default: false}) public fullWidth!: boolean;
      /**
       * Set it true to make it one half.
       * @values true | false
       */
      @Prop({type: Boolean, default: false}) public oneHalf!: boolean;
      /**
       * Set it true to make it one third.
       * @values true | false
       */
      @Prop({type: Boolean, default: false}) public oneThird!: boolean;
      /**
       * Set it true to make it secondary.
       * @values true | false
       */
      @Prop({type: Boolean, default: false}) public secondary!: boolean;
    }
</script>


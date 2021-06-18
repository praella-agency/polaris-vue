<template>
  <div class="Polaris-Layout">
    <template v-if="sectioned">
      <PLayoutSection>
        <!-- @slot Content for the layout  -->
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
       * @values true | false
       */
      @Prop({type: Boolean, default: false}) public sectioned!: boolean;

    }
</script>


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
        @Prop(Boolean) public sectioned!: boolean;
        @Prop(Boolean) public fullWidth!: boolean;
        @Prop(Boolean) public oneHalf!: boolean;
        @Prop(Boolean) public oneThird!: boolean;
        @Prop(Boolean) public secondary!: boolean;
    }
</script>


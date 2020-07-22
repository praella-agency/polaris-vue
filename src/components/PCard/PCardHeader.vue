<template>
  <div class="Polaris-Card__Header">
    <slot name="title" />
    <span class="Polaris-Card__TagLine">
      <template>
        <slot name="short_description"/>
      </template>
    </span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';

  import { PHeading } from '@/components/PHeading';

  @Component({
    components: { PHeading },
  })
  export default class PCardHeader extends Vue {
  }
</script>

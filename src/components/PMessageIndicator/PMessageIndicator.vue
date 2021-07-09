<template>
  <div class="Polaris-MessageIndicator__MessageIndicatorWrapper">
    <div v-show="active" class="Polaris-MessageIndicator" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class PMessageIndicator extends Vue {

  @Prop({type: Boolean, default: true}) public active!: boolean;

}
</script>

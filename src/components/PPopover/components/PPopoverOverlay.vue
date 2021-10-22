<template>
  <PPositionedOverlay
      :id="id"
      :fullWidth="fullWidth"
      :active="active"
      :preferredPosition="preferredPosition"
      :preferredAlignment="preferredAlignment"
      :activatorId="activatorId"
      @scrollout="handleScrollOut">
    <template slot="overlay" slot-scope="props">
      <slot name="overlay" :data="props"></slot>
    </template>
  </PPositionedOverlay>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import PPositionedOverlay from '@/components/PPopover/components/PPositionedOverlay.vue';

@Component({
  components: {PPositionedOverlay},
})
export default class PPopoverOverlay extends Vue {
  @Prop([String, Number]) public id!: string | number;
  @Prop(Boolean) public active!: boolean;
  @Prop(Boolean) public preventAutofocus!: boolean;
  @Prop(String) public preferredAlignment!: string;
  @Prop(Boolean) public sectioned!: boolean;
  @Prop(Boolean) public fullWidth!: boolean;
  @Prop(String) public preferredPosition!: string;
  @Prop(String) public activatorId!: string;

  public handleScrollOut() {
    this.$emit('scrollout');
  }
}
</script>
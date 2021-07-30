<template>
  <PItem
    :url="url"
    :label="label"
    :disabled="disabled"
    :new="this.new"
    @click="onClick"
  />
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PItem } from '@/components/PNavigation/components/PItem';

  @Component({
    components: {
      PItem,
    }
  })
  export default class PSubNavigationItem extends Vue {
    @Prop({type: String, required: true}) public url!: string;
    @Prop({type: String, required: true}) public label!: string;
    @Prop({type: Boolean, default: false}) public disabled!: boolean;
    @Prop({type: Boolean, default: false}) public new!: boolean;
    @Prop({type: Function}) public onClick!: any;
  }
</script>

<style scoped>

</style>
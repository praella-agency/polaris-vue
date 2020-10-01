<template>
    <div v-if="title"  class="Polaris-Modal-Header">
        <div  class="Polaris-Modal-Header__Title">
            <h2 class="Polaris-DisplayText Polaris-DisplayText--sizeSmall">{{ title }}</h2>
        </div>
        <PButton plain @click="$emit('click', $event)" icon="MobileCancelMajorMonotone"></PButton>
    </div>
    <div style="z-index: 1000" v-else>
        <button v-on:click="$emit('click', $event)" class="Polaris-Modal-CloseButton Polaris-Modal-CloseButton--withoutTitle" aria-label="Close">
            <span class="Polaris-Icon Polaris-Icon--colorInkLighter Polaris-Icon--isColored">
                <PIcon source="MobileCancelMajorMonotone"/>
            </span>
        </button>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import { PButton } from '@/components/PButton';
  import { PIcon } from '@/components/PIcon';

  @Component({
    components: {PButton, PIcon},
  })
  export default class PModelHeader extends Vue {
    @Prop(String) public title!: string;
  }
</script>

<style scoped>

</style>

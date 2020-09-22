<template>
    <div class="Polaris-Labelled__Error">
        <div id="PolarisTextField6Error" class="Polaris-InlineError">
            <div class="Polaris-InlineError__Icon">
                <PIcon source="AlertMinor" />
            </div>{{error}}
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import { PIcon } from '@/components/PIcon';
  @Component({
    components: { PIcon },
  })
  export default class PFieldError extends Vue {
    @Prop(String) public error!: string;
  }
</script>

<style scoped>

</style>

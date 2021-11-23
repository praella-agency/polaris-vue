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
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PIcon } from './../../components/PIcon/index.js';

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">Field errors are brief, in-context messages that tell merchants something went wrong with a single
   *  or group of inputs in a form. Use field errors to help merchants understand why a form input may not be valid and
   *  how to fix it.</h4>
   */
  @Component({
    components: {
        PIcon,
    },
  })
  export default class PFieldError extends Vue {
    @Prop({type: String, default: null}) public error!: string;
  }
</script>

<style scoped>

</style>

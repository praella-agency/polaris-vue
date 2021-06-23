<template>
    <p class="Polaris-Caption" :id="id">
        <!-- @slot Caption content -->
        <slot/>
    </p>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component

    export default class PCaption extends Vue {

      /**
       * Id for the element
       */
      @Prop({type: String, default: null}) public id!: string;
    }
</script>

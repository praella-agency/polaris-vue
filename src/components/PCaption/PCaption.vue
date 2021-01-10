<template>
    <p class="Polaris-Caption"><slot/></p>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component

    export default class PCaption extends Vue {
    }
</script>

<template>
    <li class="Polaris-List__Item">
        <slot/>
    </li>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class PListItem extends Vue {}
</script>

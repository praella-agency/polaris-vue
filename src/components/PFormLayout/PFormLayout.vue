<template>
    <div class='Polaris-FormLayout'>
        <slot/>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PFormLayout extends Vue {
}
</script>

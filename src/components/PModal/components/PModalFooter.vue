<template>
    <div class="Polaris-Modal-Footer">
        <div class="Polaris-Modal-Footer__FooterContent">
            <div class="Polaris-Stack Polaris-Stack--alignmentCenter">
                <div class="Polaris-Stack__Item Polaris-Stack__Item--fill"></div>
                <div class="Polaris-Stack__Item">
                    <div class="Polaris-ButtonGroup">
                        <div class="Polaris-ButtonGroup__Item">
                            <PButton v-for="secondaryAction in secondaryActions"
                                    @click="secondaryAction.onAction">
                                {{ secondaryAction.content }}</PButton>
                        </div>
                        <div class="Polaris-ButtonGroup__Item">
                            <PButton
                                    primary
                                    @click="primaryAction.onAction">
                                {{ primaryAction.content }}</PButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import { PButton } from '@/components/PButton';

  @Component({
    components: {PButton},
  })
  export default class PModelFooter extends Vue {
    @Prop(Object) public primaryAction!: object;
    @Prop(Array) public secondaryActions!: [];
  }
</script>

<style scoped>

</style>

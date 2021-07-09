<!--<template>-->
<!--  <div class="Polaris-Menu-Message__Section">-->

<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { Component, Vue, Prop } from 'vue-property-decorator';-->

<!--import { PActionList } from '@/components/PActionList';-->
<!--import { PPopover } from '@/components/PPopover';-->
<!--import {ComplexAction} from '@/types';-->
<!--import {classNames} from '@/utilities/css';-->


<!--@Component({-->
<!--  components: {-->
<!--    PActionList,-->
<!--    PPopover,-->
<!--    PMessage,-->
<!--  },-->
<!--})-->
<!--export default class PMessage extends Vue {-->
<!--  focused = true;-->
<!--  popoverActive = false;-->

<!--  @Prop({type: Boolean, default: true}) public open!: boolean;-->
<!--  @Prop({type: String, default: null}) public accessibilityLabel!: string;-->
<!--  @Prop({type: Function, default: null}) public onOpen!: void;-->
<!--  @Prop({type: Function, default: null}) public onClose!: void;-->
<!--  @Prop({type: Object, default: () => ({})}) public action!: ComplexAction;-->
<!--  @Prop({type: Object, default: {} }) public link!: {to: string; content: string};-->

<!--  public get className() {-->
<!--    return classNames(-->
<!--        'Polaris-Popover__Section',-->
<!--        'Polaris-Popover__Section+ Polaris-Popover__Section'-->
<!--    );-->
<!--  }-->

<!--}-->
<!--</script>-->

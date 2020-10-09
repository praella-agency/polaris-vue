<template>
  <div>
      <div v-if="open">
          <PModalDialog :large="large" :limitHeight="limitHeight">
              <PModalHeader v-if="title" @close="$emit('close', $event)">{{title}}</PModalHeader>
              <PModalCloseButton v-else :title="false" @click="$emit('close', $event)" />
              <div class="Polaris-Modal__BodyWrapper">
                  <iframe v-if="src" :name="iFrameName" :src="src" class="Polaris-Modal__IFrame" />
                  <div v-else class="Polaris-Modal__Body">
                      <div v-if="loading" class="Polaris-Modal__Spinner">
                          <PSpinner />
                      </div>
                      <template v-else>
                          <PModalSection v-if="sectioned"><slot /></PModalSection>
                          <slot v-else />
                      </template>
                  </div>
              </div>
              <slot name="footer" v-if="$slots.footer && !primaryAction && !secondaryActions" />
              <PModalFooter v-else :primaryAction="primaryAction" :secondaryActions="secondaryActions" />
          </PModalDialog>
      </div>
      <div v-if="open" class="Polaris-Backdrop"></div>
  </div>
</template>

<script lang="ts">

  import {Vue, Component, Prop} from 'vue-property-decorator';
  import {classNames} from '@/utilities/css';
  import {PSpinner} from '@/components/PSpinner';
  import PModalDialog from './PModalDialog.vue';
  import PModalHeader from './PModalHeader.vue';
  import PModalFooter from './PModalFooter.vue';
  import PModalSection from './PModalSection.vue';
  import PModalCloseButton from './PModalCloseButton.vue';

  @Component({
    components: {
        PSpinner,
        PModalDialog,
        PModalHeader,
        PModalFooter,
        PModalSection,
        PModalCloseButton
    },
  })
  export default class PModel extends Vue {

    @Prop(Boolean) public large!: boolean;
    @Prop(Boolean) public limitHeight!: boolean;
    @Prop(Boolean) public instant!: boolean;
    @Prop(Boolean) public loading!: boolean;
    @Prop(Boolean) public open!: boolean;
    @Prop(Boolean) public sectioned!: boolean;
    @Prop(String) public src!: string;
    @Prop(String) public iFrameName!: string;
    @Prop(Object) public primaryAction!: object;
    @Prop(Array) public secondaryActions!: [];
    @Prop(String) public title!: string;

    public get sizeClassName() {
      return classNames(
              'Polaris-Modal-Dialog__Modal',
              this.large && 'Polaris-Modal-Dialog--sizeLarge',
      );
    }


  }
</script>

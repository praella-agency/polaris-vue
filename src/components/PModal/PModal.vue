<template>
  <div style="--top-bar-background:#00848e; --top-bar-background-lighter:#1d9ba4; --top-bar-color:#f9fafb; --p-frame-offset:0px;">
      <slot name="activator"></slot>
      <template v-if="open">
        <div >
          <div class="Polaris-Modal-Dialog__Container" data-polaris-layer="true" data-polaris-overlay="true">
            <div>
              <div role="dialog" aria-labelledby="Polarismodal-header10" tabindex="-1" class="Polaris-Modal-Dialog" style="outline: none;">
                <div :class="sizeClassName" >
                  <PModalHeader :title="title" @click="onClose.onAction" ></PModalHeader>
                  <div class="Polaris-Modal__BodyWrapper">
                    <div class="Polaris-Modal__Body Polaris-Scrollable Polaris-Scrollable--vertical" data-polaris-scrollable="true">
                      <section class="Polaris-Modal-Section">
                        <slot name="body"></slot>
                      </section>
                    </div>
                  </div>
                  <PModalFooter :primaryAction="primaryAction" :secondaryActions="secondaryActions"></PModalFooter>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Polaris-Backdrop"></div>
      </template>

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import PModalHeader from './components/PModalHeader.vue';
  import PModalFooter from './components/PModalFooter.vue';
  import { PIcon } from '@/components/PIcon';
  import { PButton } from '@/components/PButton';
  import {classNames} from '@/utilities/css';
  @Component({
    components: {PButton, PIcon, PModalHeader, PModalFooter },
  })
  export default class PModel extends Vue {
    @Prop(String) public label!: string;
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop(String) public labelClass!: string;
    @Prop(Boolean) public open!: boolean;
    @Prop(String) public title!: boolean;
    @Prop(Object) public onClose!: object;
    @Prop(Object) public primaryAction!: object;
    @Prop(Array) public secondaryActions!: [];
    @Prop(Boolean) public large!: boolean;

    public handleAction(action: any) {
      console.log(action);
      if (action.onAction) {
        action.onAction();
      }
    }

    public get sizeClassName() {
      return classNames(
              'Polaris-Modal-Dialog__Modal',
              this.large && 'Polaris-Modal-Dialog--sizeLarge',
      );
    }


  }
</script>

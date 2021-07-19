<template>
  <div :class="className">
    <div style="background: rgb(255, 255, 255)">
      <div class="Polaris-TopBar-Search__Results">
        <slot>This is default search</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

@Component({
  components: {},
})
export default class PSearch extends Vue {

  @Prop({type: Boolean, default: true}) public visible!: boolean;

  public get className() {
    return classNames(
        'Polaris-TopBar-Search',
        this.visible && 'Polaris-TopBar-Search--visible'
    );
  }

}
</script>

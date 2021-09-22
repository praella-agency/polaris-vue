<template>
    <div :class="className">
        <label
                :id="id"
                :for="id"
                :class="labelClassName"
        >
            <slot />
        </label>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';

@Component({})
export default class PLabel extends Vue {
  /**
   * A unique identifier for the label
   */
  @Prop({type: [String, Number], required: true, default: 'polaris-label'}) public id!: string | number;

  /**
   * Visually hide the label
   */
  @Prop({type: Boolean, default: false}) public hidden!: boolean;

  /**
   * Visual required indicator for the label
   */
  @Prop({type: Boolean, default: false}) public requiredIndicator!: boolean;

  public get className() {
    return classNames(
      'Polaris-Label',
      this.hidden && 'Polaris-Label--hidden',
    );
  }

  public get labelClassName() {
    return classNames(
      'Polaris-Label__Text',
      this.requiredIndicator && 'Polaris-Label__RequiredIndicator',
    );
  }
}
</script>

<style scoped>

</style>
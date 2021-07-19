<template>
  <div :class="className">
    <input
        id="searchId"
        class="Polaris-TopBar-SearchField__Input"
        :placeholder="placeholder"
        type="search"
        autoCapitalize="off"
        autoComplete="off"
        ref="input"
        :value="value"
        @change="handleChange"
        @keydown="preventDefault"
    />
    <span class="Polaris-TopBar-SearchField__Icon">
        <PIcon source="SearchMinor" />
      </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PIcon } from '@/components/PIcon';

@Component({
  components: {
    PIcon,
  },
})
export default class PSearch extends Vue {

  forceActive = false;

  @Prop({type: Boolean, default: true}) public focused!: boolean;
  @Prop({type: Boolean, default: true}) public active!: boolean;
  @Prop({type: String, default: null}) public placeholder!: string;
  @Prop() public value!: any;

  public get className() {
    return classNames(
        'Polaris-TopBar-SearchField',
        (this.focused || this.active || this.forceActive) && 'Polaris-TopBar-SearchField--focused'
    );
  }

  public preventDefault(event) {
    if (event.key === 'enter') {
      event.preventDefault();
    }
  }

  public handleChange(event) {
    this.$emit('change',event.target.value);
  }

}
</script>

<template>
  <div class="example-container">
    <PWrapper>
      <div class="title">
        <PDisplayText size="medium" element="h1">{{ title }}</PDisplayText>
      </div>
      <slot/>
    </PWrapper>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PWrapper } from '@/components/PWrapper';
import { PDisplayText } from '@/components/PDisplayText';

@Component({
  components: {
    PWrapper,
    PDisplayText,
  },
})
export default class ExampleContainer extends Vue {
  @Prop(String) public title!: string;
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 50px;
}
.example-container {
  margin-bottom: 50px;
  padding: 20px;
  box-shadow: 0 0 0 0.2px gray;
  &:hover {
    box-shadow: 0 0 0 0.5px gray;
  }
}
</style>

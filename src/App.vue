<template>
  <div id="app">
    <FormExample/>
    <StructureExample/>
    <ActionsExample/>
    <ColorExample/>
    <ThumbnailExample/>
    <TitlesAndTextExample/>
    <FeedbackIndicatorsExample/>
    <ListsAndTablesExample/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import {
  ActionsExample,
  ColorExample,
  StructureExample,
  FormExample,
  TitlesAndTextExample,
  FeedbackIndicatorsExample,
  ListsAndTablesExample,
  ThumbnailExample,
} from '@/examples';

@Component({
  components: {
    FormExample,
    StructureExample,
    ActionsExample,
    ColorExample,
    TitlesAndTextExample,
    FeedbackIndicatorsExample,
    ListsAndTablesExample,
    ThumbnailExample,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  padding: 80px;
}
</style>

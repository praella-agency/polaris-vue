<template>
  <div id="app">
    <FormExample/>
    <StructureExample/>
    <ActionsExample/>
    <PageActionsExample/>
    <ColorExample/>
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
  PageActionsExample,
} from '@/examples';

@Component({
  components: {
    StructureExample,
    ActionsExample,
    ColorExample,
    FormExample,
    TitlesAndTextExample,
    FeedbackIndicatorsExample,
    ListsAndTablesExample,
    PageActionsExample,
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

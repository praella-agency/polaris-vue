<template>
  <div id="app">
    <FormExample/>
    <StructureExample/>
    <ActionsExample/>
    <ColorExample/>
    <ThumbnailExample/>
    <AvatarExample/>
    <TitlesAndTextExample/>
    <LinkExample/>
    <DisplayTextExample/>
    <ProgressBarExample/>
    <FeedbackIndicatorsExample/>
    <ListsAndTablesExample/>
    <ListExample/>
    <PageExample/>
    <ResourceListExample/>
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
  DisplayTextExample,
  ProgressBarExample,
  LinkExample,
  ListsAndTablesExample,
  ThumbnailExample,
  AvatarExample,
  ListExample,
  PageExample,
  ResourceListExample,
} from '@/examples';

@Component({
  components: {
    FormExample,
    StructureExample,
    ActionsExample,
    ColorExample,
    AvatarExample,
    TitlesAndTextExample,
    DisplayTextExample,
    ProgressBarExample,
    LinkExample,
    FeedbackIndicatorsExample,
    ListsAndTablesExample,
    ThumbnailExample,
    ListExample,
    PageExample,
    ResourceListExample,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  padding: 80px;
}
</style>

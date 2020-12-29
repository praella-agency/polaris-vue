<template>
  <ExampleContainer title="Avatar">
    <ExampleContent :code="example4">
      <PAvatar size="small"/>
    </ExampleContent>

    <ExampleContent :code="example5">
      <PAvatar size="medium"/>
    </ExampleContent>

    <ExampleContent :code="example6">
      <PAvatar size="large"/>
    </ExampleContent>

    <ExampleContent :code="example7">
      <PAvatar customer />
    </ExampleContent>

    <ExampleContent :code="example8">
      <PAvatar source="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg" alt="Avatar"/>
    </ExampleContent>

    <ExampleContent :code="example9">
      <PAvatar initials="HA"/>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import { ExampleContainer, ExampleContent } from '@/examples/components';
  import {PAvatar} from '@/components/PAvatar';

  @Component({
    components: {
      ExampleContent,
      ExampleContainer, PAvatar
    },
    data() {
      return {
        color: '#FFF',
      };
    },
  })
  export default class ActionsExample extends Vue {

    public example4 = ` <PAvatar size="small"/>`;

    public example5 = ` <PAvatar size="medium"/>`;

    public example6 = ` <PAvatar size="large"/>`;

    public example7 = ` <PAvatar customer />`;

    public example8 = ` <PAvatar source="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg" alt="Avatar"/>`;

    public example9 = ` <PAvatar initials="HA"/>`;
  }
</script>

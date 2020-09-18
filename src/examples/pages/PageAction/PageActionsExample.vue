<template>
  <ExampleContainer title="Page Actions">
    <ExampleContent :code="example">
      <PPageActions
              :primary-action="{
        content:'Save',
        onAction: primaryAction
      }" :secondary-action="{
        content:'Delete',
        destructive:true,
        onAction: secondaryAction
      }"/>
    </ExampleContent>

    <ExampleContent :code="example2">
      <PPageActions :primary-action="{ content:'Save', onAction: primaryAction }"/>
    </ExampleContent>

    <ExampleContent :code="example3">
      <PPageActions>
        <PButton primary slot="primaryAction" @click="primaryAction">Primary</PButton>
        <PButton primary slot="secondaryAction" destructive @click="secondaryAction">Secondary</PButton>
      </PPageActions>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import { ExampleContainer, ExampleContent } from '@/examples/components';
  import PPageActions from '@/components/PPage/PPageActions.vue';
  import PButton from '@/components/PButton/PButton.vue';

  @Component({
    components: {
      ExampleContainer,
      PPageActions, ExampleContent,
      PButton,
    },
    data() {
      return {
        color: '#FFF',
      };
    },

    methods: {
      primaryAction() {
        alert('Primary Action');
      },
      secondaryAction() {
        alert('Secondary Action');
      },
    },
  })

  export default class PageActionsExample extends Vue {
    public example = `
    <PPageActions :primary-action="{ content:'Save', onAction: primaryAction }"
                  :secondary-action="{ content:'Delete', destructive:true, onAction: secondaryAction }"/>
  `;

    public example2 = `
    <PPageActions :primary-action="{ content:'Save', onAction: primaryAction }"/>
    `;

    public example3 = `
    <PPageActions>
      <PButton primary slot="primaryAction" @click="primaryAction">Primary</PButton>
      <PButton primary slot="secondaryAction" destructive @click="secondaryAction">Secondary</PButton>
    </PPageActions>
    `;
  }
</script>

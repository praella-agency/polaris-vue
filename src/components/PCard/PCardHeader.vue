<template>
  <div class="Polaris-Card__Header">
    <PStack distribution="baseline">
      <PStackItem fill>
        <slot name="title">
          <PHeading>{{ title }}</PHeading>
        </slot>
      </PStackItem>
      <PStackItem>
        <PButtonGroup connectedTop>
          <PButton v-for="(action, key) in actions" :key="key" plain :href="action.url">
            {{ action.content }}
          </PButton>
        </PButtonGroup>
      </PStackItem>
      <PStackItem>
        <slot name="children"/>
      </PStackItem>
    </PStack>
    <PStack>
      <PStackItem>
        <span class="Polaris-Card__TagLine">
            <template>
              <slot name="short_description">
                {{shortDescription}}
              </slot>
            </template>
        </span>
      </PStackItem>
    </PStack>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

import {PStack, PStackItem} from '@/components/PStack';
import {PHeading} from '@/components/PHeading';
import {PButtonGroup} from '@/components/PButtonGroup';
import {PButton} from '@/components/PButton';

@Component({
  components: {
    PStack, PStackItem, PHeading, PButtonGroup, PButton,
  },
})
export default class PCardHeader extends Vue {

  @Prop({type: String, default: null}) public title!: string;

  @Prop({type: String, default: null}) public shortDescription!: string;

  @Prop({type: Array, default: () => []}) public actions!: [];
}
</script>

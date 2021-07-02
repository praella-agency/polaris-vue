<template>
  <div class="Polaris-Card__Header">
    <PStack distribution="baseline">
      <PStackItem fill>
        <slot name="title">
          <PHeading>{{ title }}</PHeading>
        </slot>
      </PStackItem>
      <PStackItem>
        <PButtonGroup v-if="actions" connectedTop>
          <component
                  v-for="(action, key) in actions" :key="key"
                  :is="(action.to ? 'PLink' : 'PButton')"
                  plain
                  :href="action.url ? action.url : null"
                  :to="action.to ? action.to : null"
                  v-on="action.onAction ? { click: action.onAction } : {}"
          >
            {{ action.content }}
          </component>
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
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PStack, PStackItem } from '@/components/PStack';
import { PHeading } from '@/components/PHeading';
import { PButtonGroup } from '@/components/PButtonGroup';
import { PButton } from '@/components/PButton';
import { PLink } from '@/components/PLink';

@Component({
  components: {
    PStack, PStackItem, PHeading, PButtonGroup, PButton, PLink,
  },
})
export default class PCardHeader extends Vue {

  @Prop({type: String, default: null}) public title!: string;

  @Prop({type: String, default: null}) public shortDescription!: string;

  @Prop({type: [Array, String], default: null}) public actions!: [];
}
</script>

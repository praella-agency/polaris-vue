<template>
  <div class="Polaris-Menu-Message__Section">
    <div class="Polaris-Popover__Section">
      <PStack vertical spacing="tight">
        <PStackItem>
          <PTextContainer>
            <PHeading>
              {{title}}
              <PBadge v-if="Object.keys(badge).length > 0" :status="badge.status">
                {{ badge.content }}
              </PBadge>
            </PHeading>
            <p>
              {{description}}
            </p>
          </PTextContainer>
        </PStackItem>
        <PStackItem>
            <PLink :to="link.to" external>
              {{link.content}}
            </PLink>
        </PStackItem>

        <PStackItem>
          <PButton plain @click="action.onAction">
            {{action.content}}
          </PButton>
        </PStackItem>
      </PStack>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PStack, PStackItem } from '@/components/PStack';
import { PButton } from '@/components/PButton';
import { PBadge } from '@/components/PBadge';
import { PTextContainer } from '@/components/PTextContainer';
import { PHeading } from '@/components/PHeading';
import { PDisplayText } from '@/components/PDisplayText';
import { PLink } from '@/components/PLink';
import {BadgeAction, ComplexAction} from '@/types';

@Component({
  components: {
    PStack,
    PStackItem,
    PButton,
    PBadge,
    PTextContainer,
    PHeading,
    PDisplayText,
    PLink,
  },
})
export default class PMessage extends Vue {
  focused = true;
  popoverActive = false;

  @Prop({type: String, default: null}) public title!: string;
  @Prop({type: String, default: null}) public description!: string;
  @Prop({type: Object, default: () => ({})}) public action!: ComplexAction;
  @Prop({type: Object, default: () => ({}) }) public link!: {to: string; content: string};
  @Prop({type: Object, default: () => ({}) }) public badge!: BadgeAction;

}
</script>

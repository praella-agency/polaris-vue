<template>
  <div class="Polaris-Menu-Message__Section">
    <div class="Polaris-Popover__Section">
      <PStack vertical spacing="tight">
        <PStackItem>
          <PTextContainer>
            <PHeading>
              {{ title }}<PBadge v-if="Object.keys(badge).length > 0" :status="badge.status">{{ badge.content }}</PBadge>
            </PHeading>
            <p>
              {{ description }}
            </p>
          </PTextContainer>
        </PStackItem>
        <PStackItem>
          <PLink v-if="typeof link.to === 'string'" :url="link.to" :external="link.external">
            {{ link.content }}
          </PLink>
          <PLink v-else :to="link.to" :external="link.external">
            {{ link.content }}
          </PLink>
        </PStackItem>
        <PStackItem>
          <PButton plain @click="action.onClick !== undefined ? action.onClick() : {}">
            {{ action.content }}
          </PButton>
        </PStackItem>
      </PStack>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PStack } from '@/components/PStack';
  import { PStackItem } from '@/components/PStack/components/PStackItem';
  import { PButton } from '@/components/PButton';
  import { PBadge } from '@/components/PBadge/index.js';
  import { PTextContainer } from '@/components/PTextContainer';
  import { PHeading } from '@/components/PHeading';
  import { PDisplayText } from '@/components/PDisplayText/index.js';
  import { PLink } from '@/components/PLink';
  import { BadgeProps } from '@/types';

  @Component({
    components: {
      PStack, PStackItem, PButton, PBadge, PTextContainer, PHeading, PDisplayText, PLink,
    },
  })
  export default class PMessage extends Vue {
    @Prop({type: String, default: null}) public title!: string;
    @Prop({type: String, default: null}) public description!: string;
    @Prop({
      type: Object,
      default: () => ({}),
    }) public action!: {
      content: string;
      onClick(): void;
    };
    @Prop({
      type: Object,
      default: () => ({}),
    }) public link!: {
      to: string | object;
      content: string;
      external?: boolean;
    };
    @Prop({
      type: Object,
      default: () => ({}),
    }) public badge!: {
      content: string;
      status: BadgeProps['status'];
    };
  }
</script>

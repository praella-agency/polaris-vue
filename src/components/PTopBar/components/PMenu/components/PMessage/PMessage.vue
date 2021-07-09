<template>
  <div class="Polaris-Menu-Message__Section">
    <div :class="className">
      <PStack vertical spacing="tight">
        <PTextContainer>
          <PHeading>
            {{title}}
            <slot></slot>
          </PHeading>
          <p>
            {{description}}
          </p>
        </PTextContainer>

        <PLink :to="link.to" external>
          {{link.content}}
        </PLink>

        <PButton plain @click="action.onAction">
          {{action.content}}
        </PButton>
      </PStack>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PStack } from '@/components/PStack';
import { PButton } from '@/components/PButton';
import { PTextContainer } from '@/components/PTextContainer';
import { PHeading } from '@/components/PHeading';
import { PDisplayText } from '@/components/PDisplayText';
import { PLink } from '@/components/PLink';
import {ComplexAction} from '@/types';
import {classNames} from '@/utilities/css';


@Component({
  components: {
    PStack,
    PButton,
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
  @Prop({type: Object, default: {} }) public link!: {to: string; content: string};

  public get className() {
    return classNames(
        'Polaris-Popover__Section',
        'Polaris-Popover__Section+ Polaris-Popover__Section'
    );
  }

}
</script>

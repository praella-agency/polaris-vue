<template>
  <PCard>
    <PCardSection>
      <div :class="className">
        <div class="Polaris-EmptyState__Section">
          <div class="Polaris-EmptyState__DetailsContainer">
            <div class="Polaris-EmptyState__Details">
              <PTextContainer>
                <PDisplayText size="small">
                  <!-- @slot Heading Content -->
                  <slot name="heading">
                    {{ heading }}
                  </slot>
                </PDisplayText>
                <div class="Polaris-EmptyState__Content">
                  <!-- @slot Default Content -->
                  <slot/>
                </div>
              </PTextContainer>
              <div class="Polaris-EmptyState__Actions" v-if="hasAction">
                <!-- @slot Actions Content -->
                <slot name="actions">
                  <PStack spacing="tight" distribution="center" alignment="center">
                    <PStackItem v-if="primaryAction">
                      <PButton primary @click="primaryAction.onAction()">{{ primaryAction.content }}</PButton>
                    </PStackItem>
                    <PStackItem v-if="secondaryAction">
                      <PButton @click="secondaryAction.onAction()">{{ secondaryAction.content }}</PButton>
                    </PStackItem>
                  </PStack>
                </slot>
              </div>
              <div class="Polaris-EmptyState__FooterContent">
                <!-- @slot Footer Content -->
                <slot name="footer"/>
              </div>
            </div>
          </div>
          <div class="Polaris-EmptyState__ImageContainer">
            <!-- @slot Image Content -->
            <slot name="image">
              <PImage :source="image" class="Polaris-EmptyState__Image"/>
            </slot>
          </div>
        </div>
      </div>
    </PCardSection>
  </PCard>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {classNames, variationName} from '@/utilities/css';
import {PImage} from '@/components/PImage';
import {PStack, PStackItem} from '@/components/PStack';
import {PDisplayText} from '@/components/PDisplayText';
import {PTextContainer} from '@/components/PTextContainer';
import {PCard, PCardSection} from '@/components/PCard';
import {PButton} from '@/components/PButton';
import {ComplexAction, DisableableAction, LoadableAction} from '@/types';

@Component({
  components: {
    PImage,
    PCard,
    PCardSection,
    PTextContainer,
    PDisplayText,
    PStack,
    PStackItem,
    PButton,
  },
})
export default class PEmptyState extends Vue {

  /**
   * The empty state heading
   */
  @Prop({type: String, default: null}) public heading!: string;

  /**
   * Whether or not the content should span the full width of its container
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

  /**
   * Whether or not to limit the image to the size of its container on large screens
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public imageContained!: boolean;

  /**
   * The path to the image to display.
   * The image should have ~40px of white space above when empty state is used within a card,
   * modal, or navigation component
   */
  @Prop({type: String, default: null}) public image!: string;

  /**
   * Primary action for empty state
   */
  @Prop({type: Object, default: () => ({})}) public primaryAction!: DisableableAction & LoadableAction;

  /**
   * Secondary action for empty state
   */
  @Prop({type: Object, default: () => ({})}) public secondaryAction!: ComplexAction;

  public get className() {
    return classNames(
        'Polaris-EmptyState',
        'Polaris-EmptyState--withinContentContainer',
        this.fullWidth && 'Polaris-EmptyState--fullWidth',
        this.imageContained && 'Polaris-EmptyState--imageContained',
    );
  }

  public get hasAction() {

    return this.primaryAction || this.secondaryAction;
  }

  public styleClass(name?: string) {
    const finalStyleClasses = ['one', 'two', 'three', 'four', 'five', 'six'];
    return name ? finalStyleClasses[name.charCodeAt(0) % finalStyleClasses.length] : finalStyleClasses[0];
  }
}
</script>

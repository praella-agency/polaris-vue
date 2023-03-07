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
                  <!-- @slot Display the elements inside empty state -->
                  <slot/>
                </div>
              </PTextContainer>
              <div class="Polaris-EmptyState__Actions" v-if="hasAction">
                <!-- @slot Actions Content -->
                <slot name="actions">
                  <PStack spacing="tight" distribution="center" alignment="center">
                    <PStackItem v-if="Object.keys(primaryAction).length > 0">
                      <PButton primary @click="primaryAction.onAction()">{{ primaryAction.content }}</PButton>
                    </PStackItem>
                    <PStackItem v-if="Object.keys(secondaryAction).length > 0">
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

<script setup>
import { computed } from 'vue';
import { classNames } from '../../utilities/css';
import { PImage } from '../../components/PImage';
import { PStack } from '../../components/PStack';
import { PStackItem } from '../../components/PStack/components/PStackItem';
import { PDisplayText } from '../../components/PDisplayText';
import { PTextContainer } from '../../components/PTextContainer';
import { PCard } from '../../components/PCard';
import { PCardSection } from '../../components/PCard/components/PCardSection';
import { PButton } from '../../components/PButton';
import ObjectValidator from '../../utilities/validators/ObjectValidator';
import { ComplexAction, DisableableAction, LoadableAction } from '../../types';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Empty states are used when a list, table, or chart has no items or data to show. This is an opportunity
 *  to provide explanation or guidance to help merchants progress. The empty state component is intended for use when a
 *  full page in the admin is empty, and not for individual elements or areas in the interface.</h4>
 */

let props = defineProps({
    /**
     * The empty state heading
     */
    heading: {
        type: String,
        default: null
    },

    /**
     * Whether or not the content should span the full width of its container
     */
    fullWidth: {
        type: Boolean,
        default: false
    },

    /**
     * Whether or not to limit the image to the size of its container on large screens
     */
    imageContained: {
        type: Boolean,
        default: false
    },

    /**
     * The path to the image to display.
     * The image should have ~40px of white space above when empty state is used within a card,
     * modal, or navigation component
     */
    image: {
        type: String,
        default: null
    },

    /**
     * Primary action for empty state
     */
    primaryAction: {
        type: Object,
        default: () => ({}),
        ...ObjectValidator('primaryAction', {
            ...DisableableAction,
            ...LoadableAction
        })
    },

    /**
     * Secondary action for empty state
     */
    secondaryAction: {
        type: Object,
        default: () => ({}),
        ...ObjectValidator('secondaryAction', ComplexAction)
    }
});

let className = computed(() => {
    return classNames(
        'Polaris-EmptyState',
        'Polaris-EmptyState--withinContentContainer',
        props.fullWidth && 'Polaris-EmptyState--fullWidth',
        props.imageContained && 'Polaris-EmptyState--imageContained',
    );
});

let hasAction = computed(() => {
    return props.primaryAction || props.secondaryAction;
});
</script>

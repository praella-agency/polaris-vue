<template>
  <div class="Polaris-Frame-ContextualSaveBar">
    <div v-if="$slots.hasOwnProperty('contextControl')" class="Polaris-Frame-ContextualSaveBar__ContextControl">
      <slot name="contextControl"/>
    </div>
    <div
        v-if="!alignContentFlush || !$slots.hasOwnProperty('contextControl')"
        class="Polaris-Frame-ContextualSaveBar__LogoContainer"
        :style="width"
    >
      <PImage
          :style="width"
          :source="logo.contextualSaveBarSource || ''"
          alt=""
      />
    </div>
    <div :class="contentsClassName">
      <h2 class="Polaris-Frame-ContextualSaveBar__Message">{{message}}</h2>
      <div class="Polaris-Frame-ContextualSaveBar__ActionContainer">
        <PStack spacing="tight" :wrap="false">
          <PStackItem>
            <PButton
                :url="discardAction.url"
                @click="discardActionHandler"
                :loading="discardAction.loading"
                :disabled="discardAction.disabled"
                :accessibilityLabel="discardAction.content"
                style="background: rgba(32, 33, 35, 1) !important; color: rgba(227, 229, 231, 1) !important;
                      border-color: rgba(130, 135, 139, 1) !important;"
            >
              {{discardActionContent}}
            </PButton>
          </PStackItem>
          <PStackItem>
            <PButton
                primary
                :url="saveAction.url"
                @click="saveAction ? saveAction.onAction() : {}"
                :loading="saveAction.loading"
                :disabled="saveAction.disabled"
                :accessibilityLabel="saveAction.content"
            >
              {{saveActionContent}}
            </PButton>
          </PStackItem>
        </PStack>
      </div>
    </div>
    <PModal
        v-if="discardAction && discardAction.onAction && discardAction.discardConfirmationModal"
        title="Discard all unsaved changes"
        :open="openModal"
        @close="discardActionHandler"
        :primaryAction="[{
            content: 'Discard changes',
            destructive: true,
            onAction: discardAction.onAction()
        }]"
        :secondaryAction="[{
            content: 'Continue editing',
            onAction: saveAction.onAction()
        }]"
        sectioned
    >
      If you discard changes, you’ll delete any edits you made since you last saved.
    </PModal>
  </div>
</template>

<script>
  import { PButton } from '../../../../components/PButton/index.js';
  import { PImage } from '../../../../components/PImage';
  import { PStack } from '../../../../components/PStack';
  import { PStackItem } from '../../../../components/PStack/components/PStackItem';
  import { PModal } from '../../../../components/PModal/index.js';
  import { getWidth } from '../context';
  import { classNames } from '../../../../utilities/css';
  import { ThemeLogo } from '../../../../types/logo.js';
  import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

  const ContextualSaveBarAction = {
    /** A destination to link to */
    url: String,
    /** Content the action displays */
    content: String,
    /** Should a spinner be displayed */
    loading: Boolean,
    /** Should the action be disabled */
    disabled: Boolean,

    /** Callback when an action takes place */
    onAction: Function,
  }

  const ContextualSaveBarDiscardActionProps = {
    /** Whether to show a modal confirming the discard action */
    discardConfirmationModal: Boolean,
  }

  const ContextualSaveBarCombinedActionProps = ContextualSaveBarDiscardActionProps &
    ContextualSaveBarAction;

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">The contextual save bar tells merchants their options once they have made changes to a form on the
   *  page. This component is also shown while creating a new object like a product or customer. Merchants can use this
   *  component to save or discard their work.</h4>
   */
  export default {
      name: 'PContextualSaveBar',
      components: {
          PButton, PImage, PStack, PStackItem, PModal,
      },
      props: {
          /**
           * Extend the contents section to be flush with the left edge
           */
          alignContentFlush: {
              type: Boolean,
              default: false,
          },
          /**
           * Accepts a string of content that will be rendered to the left of the actions
           */
          message: {
              type: String,
              default: null,
          },
          /**
           * Save or commit contextual save bar action with text defaulting to 'Save'
           */
            saveAction: {
                type: Object,
              default: () => ({}),
                ...ObjectValidator('saveAction', ContextualSaveBarAction),
          },
          /**
           * Discard or cancel contextual save bar action with text defaulting to 'Discard'
           */
          discardAction: {
              type: Object,
              default: () => ({}),
              ...ObjectValidator('discardAction', ContextualSaveBarCombinedActionProps),
          },
          /**
           * Remove the normal max-width on the contextual save bar
           */
          fullWidth: {
              type: Boolean,
              default: false,
          },
          /**
           * To open a contextual modal
           */
          openModal: {
              type: Boolean,
              default: false,
          },
          /**
           * ContextualSaveBar Logo
           */
          logo: {
              type: Object,
              default: () => ({}),
              ...ObjectValidator('logo', ThemeLogo),
          },
      },
      computed: {
          contentsClassName() {
              return classNames(
                  'Polaris-Frame-ContextualSaveBar__Contents',
                  this.fullWidth && 'Polaris-Frame-ContextualSaveBar--fullWidth',
              );
          },
          discardActionContent() {
              return this.discardAction && this.discardAction.content
                  ? this.discardAction.content
                  : 'Discard';
          },
          saveActionContent() {
              return this.saveAction && this.saveAction.content
                  ? this.saveAction.content
                  : 'Save';
          },
          width() {
              return {
                  width: getWidth(this.logo, 104),
              };
          },
      },
      methods: {
          discardActionHandler() {
              if (this.discardAction && this.discardAction.discardConfirmationModal) {
                  return (this.openModal = !this.openModal);
              } else if (this.discardAction) {
                  return this.discardAction.onAction ? this.discardAction.onAction() : {};
              }
          },
      },
  }
</script>

<style scoped>

</style>

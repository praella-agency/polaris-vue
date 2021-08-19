<template>
  <div class="Polaris-Frame-ContextualSaveBar">
    <div v-if="$slots.hasOwnProperty('contextControl')" class="Polaris-Frame-ContextualSaveBar__ContextControl">
      <slot name="contextControl"/>
    </div>
    <div
        v-if="!alignContentFlush || !$slots.hasOwnProperty('contextControl')"
        class="Polaris-Frame-ContextualSaveBar__LogoContainer"
        style="width: 104px"
    >
      <PImage
          style="width: 104px;"
          :source="contextualSaveBarSource || ''"
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
            >
              {{discardActionContent}}
            </PButton>
          </PStackItem>
          <PStackItem>
            <PButton
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
            onAction: discardAction.onAction(),
        }]"
        :secondaryAction="[{
            content: 'Continue editing',
            onAction: saveAction.onAction(),
        }]"
        sectioned
    >
      If you discard changes, you’ll delete any edits you made since you last saved.
    </PModal>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PButton } from '@/components/PButton';
  import { PImage } from '@/components/PImage';
  import { PStack, PStackItem } from '@/components/PStack';
  import { PModal } from '@/components/PModal';
  import { getWidth } from './context';
  import { classNames } from '@/utilities/css';

  interface ContextualSaveBarAction {
    /** A destination to link to */
    url?: string;
    /** Content the action displays */
    content?: string;
    /** Should a spinner be displayed */
    loading?: boolean;
    /** Should the action be disabled */
    disabled?: boolean;

    /** Callback when an action takes place */
    onAction?(): void;
  }

  interface ContextualSaveBarDiscardActionProps {
    /** Whether to show a modal confirming the discard action */
    discardConfirmationModal?: boolean;
  }

  type ContextualSaveBarCombinedActionProps = ContextualSaveBarDiscardActionProps &
    ContextualSaveBarAction;

  @Component({
    components: {
      PButton, PImage, PStack, PStackItem, PModal,
    }
  })
  export default class PContextualSaveBar extends Vue {
    /**
     * Extend the contents section to be flush with the left edge
     */
    @Prop({type: Boolean, default: false}) public alignContentFlush!: boolean;

    /**
     * Accepts a string of content that will be rendered to the left of the actions
     */
    @Prop({type: String, default: null}) public message!: string;

    /**
     * Save or commit contextual save bar action with text defaulting to 'Save'
     */
    @Prop({type: Object, default: () => ({})}) public saveAction!: ContextualSaveBarAction;

    /**
     *  Discard or cancel contextual save bar action with text defaulting to 'Discard'
     */
    @Prop({type: Object, default: () => ({})}) public discardAction?: ContextualSaveBarCombinedActionProps;

    /**
     * Remove the normal max-width on the contextual save bar
     */
    @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

    /**
     *  Provides a path for a logo used on a light background
     */
    @Prop({type: String, default: null}) public contextualSaveBarSource!: string;

    @Prop({type: Boolean, default: false}) public openModal!: boolean;

    public get contentsClassName() {
      return classNames(
        'Polaris-Frame-ContextualSaveBar__Contents',
        this.fullWidth && 'Polaris-Frame-ContextualSaveBar--fullWidth'
      );
    }

    public get discardActionContent() {
      return this.discardAction && this.discardAction.content
        ? this.discardAction.content
        : 'Discard';
    }

    public get saveActionContent() {
      return this.saveAction && this.saveAction.content
        ? this.saveAction.content
        : 'Save';
    }

    public discardActionHandler() {
      if (this.discardAction && this.discardAction.discardConfirmationModal) {
        return (this.openModal = !this.openModal);
      } else if (this.discardAction) {
        return this.discardAction.onAction ? this.discardAction.onAction() : {};
      }
    }
  }
</script>

<style scoped>

</style>
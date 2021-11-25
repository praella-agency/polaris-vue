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
};

const ContextualSaveBarDiscardActionProps = {
  /** Whether to show a modal confirming the discard action */
  discardConfirmationModal: Boolean,
};

export const ContextualSaveBarProps = {
  /** Active contextualSaveBar */
  active: Boolean,
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush: Boolean,
  /** Accepts a string of content that will be rendered to the left of the actions */
  message: String,
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction: {
    type: Object,
    properties: ContextualSaveBarAction,
  },
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction: {
    type: Object,
    properties: {
      ...ContextualSaveBarAction,
      ...ContextualSaveBarDiscardActionProps,
    }
  },
  /** Remove the normal max-width on the contextual save bar */
  fullWidth: Boolean,
};

// Toast
export const ToastProps = {
  /** The content that should appear in the toast message */
  message: {
    type: String,
    required: true,
  },
  /**
   * The length of time in milliseconds the toast message should persist
   * @default 5000
   */
  duration: Number,
  /** Display an error toast. */
  error: Boolean,
  /** Callback when the dismiss icon is clicked */
  onDismiss: Function,
  /** Adds an action next to the message */
  oncClick: Function,
};

export const ToastID = {
  id: {
    type: String,
  },
};

export const ToastPropsWithID = [ToastProps, ToastID];

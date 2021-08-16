export type Color =
  | 'base'
  | 'subdued'
  | 'critical'
  | 'interactive'
  | 'warning'
  | 'highlight'
  | 'success'
  | 'primary';

export type IconSource =
  | 'placeholder'
  | string;

export interface IconProps {
  source: IconSource;
  color?: Color;
  backdrop?: boolean;
  accessibilityLabel?: string;
}

export type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export interface BaseAction {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  onAction?(): void;
}

export interface Action extends BaseAction {}

export interface LinkAction {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url: string;
  to: string;
  external: boolean;
}

export interface BadgeAction {
  badge?: {
    status: 'new';
    content: string;
  };
}

export interface BaseCallbackAction {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  onAction(): void;
}

export interface CallbackAction extends BaseCallbackAction {}

export interface DisableableAction extends Action {
  disabled?: boolean;
}

export interface DestructableAction extends Action {
  destructive?: boolean;
}

export interface IconableAction extends Action {
  icon?: IconProps['source'];
}

export interface LoadableAction extends Action {
  loading?: boolean;
}

export interface ActionListItemDescriptor
    extends IconableAction,
        DisableableAction,
        BadgeAction,
        DestructableAction {
  accessibilityLabel?: string;
  helpText?: string;
  image?: string;
  prefix?: string;
  suffix?: string;
  ellipsis?: boolean;
  active?: boolean;
  role?: string;
}

export interface ActionListSection {
  title?: string;
  items: ActionListItemDescriptor[];
}

export interface ActionListProps {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export interface ComplexAction
    extends Action,
        DisableableAction,
        DestructableAction,
        IconableAction,
        LoadableAction {}

export interface MenuActionDescriptor extends ComplexAction {
  index?: number;
}

export interface MenuGroupDescriptor extends BadgeAction {
  title: string;
  actions: ActionListItemDescriptor[];
  icon?: IconableAction['icon'];
  details?: string;
  index?: number;
}

export interface ConnectedDisclosure {
  accessibilityLabel?: string;
  disabled?: boolean;
  actions: ActionListItemDescriptor[];
}
export interface Video {
  src: string;
  size?: number;
  type: string;
}

export interface CheckboxHandles {
  focus(): void;
}

export enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  Pause = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  LeftArrow = 37,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40,
  Insert = 45,
  Delete = 46,
  Key0 = 48,
  Key1 = 49,
  Key2 = 50,
  Key3 = 51,
  Key4 = 52,
  Key5 = 53,
  Key6 = 54,
  Key7 = 55,
  Key8 = 56,
  Key9 = 57,
  KeyA = 65,
  KeyB = 66,
  KeyC = 67,
  KeyD = 68,
  KeyE = 69,
  KeyF = 70,
  KeyG = 71,
  KeyH = 72,
  KeyI = 73,
  KeyJ = 74,
  KeyK = 75,
  KeyL = 76,
  KeyM = 77,
  KeyN = 78,
  KeyO = 79,
  KeyP = 80,
  KeyQ = 81,
  KeyR = 82,
  KeyS = 83,
  KeyT = 84,
  KeyU = 85,
  KeyV = 86,
  KeyW = 87,
  KeyX = 88,
  KeyY = 89,
  KeyZ = 90,
  LeftMeta = 91,
  RightMeta = 92,
  Select = 93,
  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,
  Multiply = 106,
  Add = 107,
  Subtract = 109,
  Decimal = 110,
  Divide = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NumLock = 144,
  ScrollLock = 145,
  Semicolon = 186,
  Equals = 187,
  Comma = 188,
  Dash = 189,
  Period = 190,
  ForwardSlash = 191,
  GraveAccent = 192,
  OpenBracket = 219,
  BackSlash = 220,
  CloseBracket = 221,
  SingleQuote = 222,
}

/*Message Component*/

type Status = 'success' | 'info' | 'attention' | 'critical' | 'warning' | 'new';
type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
type Size = 'small' | 'medium';

export interface MessageProps {
  title: string;
  description: string;
  action: {
    content: string;
    onClick(): void;
  };
  link: {
    to: string | object;
    content: string;
  };
  badge?: {
    content: string;
    status: BadgeProps['status'];
  };
}

export interface BadgeProps {
  /** The content to display inside the badge. */
  children?: string;
  /** Set the color of the badge for the given status. */
  status?: Status;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame.
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  statusAndProgressLabelOverride?: string;
}

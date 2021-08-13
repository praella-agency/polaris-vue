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

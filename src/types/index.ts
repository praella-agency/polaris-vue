export type Color =
    | 'white'
    | 'black'
    | 'skyLighter'
    | 'skyLight'
    | 'sky'
    | 'skyDark'
    | 'inkLightest'
    | 'inkLighter'
    | 'inkLight'
    | 'ink'
    | 'blueLighter'
    | 'blueLight'
    | 'blue'
    | 'blueDark'
    | 'blueDarker'
    | 'indigoLighter'
    | 'indigoLight'
    | 'indigo'
    | 'indigoDark'
    | 'indigoDarker'
    | 'tealLighter'
    | 'tealLight'
    | 'teal'
    | 'tealDark'
    | 'tealDarker'
    | 'greenLighter'
    | 'green'
    | 'greenDark'
    | 'yellowLighter'
    | 'yellow'
    | 'yellowDark'
    | 'orange'
    | 'redLighter'
    | 'red'
    | 'redDark'
    | 'purple';

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

export interface CheckboxHandles {
  focus(): void;
}

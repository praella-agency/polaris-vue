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

export interface BaseAction {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  onAction?(): void;
}

export interface Action extends BaseAction {}

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

export interface ComplexAction
  extends Action,
    DisableableAction,
    DestructableAction,
    IconableAction,
    LoadableAction {}

interface ItemURLDetails {
  url?: string;
  to?: string | object;
  matches?: boolean;
  exactMatch?: boolean;
  matchPaths?: string[];
  excludePaths?: string[];
  external?: boolean;
}

export interface SubNavigationItem extends ItemURLDetails {
  url: string;
  label: string;
  disabled?: boolean;
  new?: boolean;

  onClick?(): void;
}

interface SecondaryAction {
  url: string;
  accessibilityLabel: string;
  icon: string;
}

export interface ItemProps extends ItemURLDetails {
  icon?: string;
  label: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  selected?: boolean;
  exactMatch?: boolean;
  new?: boolean;
  subNavigationItems?: SubNavigationItem[];
  secondaryAction?: SecondaryAction;

  onClick?(): void;
}

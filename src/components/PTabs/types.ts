export interface TabDescriptor {
  /** A unique identifier for the tab */
  id: string;
  /** A destination to link to */
  url?: string;
  /** Set to for router link */
  to?: string | object;
  /** Content for the tab */
  content: string;
  /** A unique identifier for the panel */
  panelID?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** External URL */
  external?: boolean;
  /** Badge Object */
  badge?: {
    content?: string,
    status?: string,
    progress?: string,
    background?: string,
    color?: string,
    size?: string,
  };
}

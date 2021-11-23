export const ThemeLogo = {
  /** Provides a path for a logo used on a dark background */
  topBarSource: String,
  /** Provides a path for a logo used on a light background */
  contextualSaveBarSource: String,
  /** Destination the merchant will navigate to when clicking the logo */
  url: String,
  /** Accessible label the logo image */
  accessibilityLabel: String,
  /** Number of pixels wide the logo image is */
  width: Number,
};

export const RoleColors = {
  /** The surface role is used for the backgrounds of the UI. With a light color scheme, surface colors are nearly
   * white, while in a dark color scheme, surface colors are nearly black. The color passed to the surface role impacts
   * the rest of the color roles and their variants, adjusting them for light or dark contexts.
   */
  surface: String,
  /** The onSurface role is made up of elements which appear on top of a surface, including borders, secondary icons,
   * and text. When a light surface is provided, onSurface values will be dark. When a dark surface is provided,
   * onSurface values will be light.
   */
  onSurface: String,
  /** The interactive role is used to express interactivity in components. It is used in links, as an indicator of
   * focus, and as an indicator of selected interactive states.
   */
  interactive: String,
  /** A secondary interactive color role, for use in secondary and tertiary buttons as a background color, as well as in
   * form elements as a background color.
   */
  secondary: String,
  /** A primary interactive color, for use in primary buttons as a background color. Also used in navigation and tabs
   * for icons, and for a surface color when in a selected state.
   */
  primary: String,
  /** Used to communicate destructive outcomes on interactive elements, for communicating errors, and to indicate a
   * critical event in inert elements that requires immediate merchant action.
   */
  critical: String,
  /** For use as an indicator that action should be taken by merchants in components including badges, banners, and
   * exception lists.
   */
  warning: String,
  /** Used to highlight elements of the UI that are important for merchants, but do not require immediate action. Used
   * in information banners and badges, indicators that draw attention to new information, bars that indicate loading or
   * progress, and in data visualization.
   */
  highlight: String,
  /** Used to indicate the result of a successful action taken by a merchant, to indicate a positive event, or to
   * illustrate growth.
   */
  success: String,
  /** Used to decorate elements where color does convey a specific meaning in components like avatars */
  decorative: String,
};

export const Theme = {
  /** Sets the logo for the top bar and contextual save bar components */
  logo: ThemeLogo,
  colors: RoleColors,
  colorScheme: {
    type: [String, 'light', 'dark'],
    required: true,
  },
  cssCustomProperties: {
    type: String,
    required: true,
  },
}

export function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export function pluckDeep(obj, key) {
  if (!obj) {
    return null;
  }

  const keys = Object.keys(obj);
  for (const currKey of keys) {
    if (currKey === key) {
      return obj[key];
    }

    if (isObject(obj[currKey])) {
      const plucked = pluckDeep(obj[currKey], key);
      if (plucked) {
        return plucked;
      }
    }
  }

  return null;
}

export function getWidth(value = {}, defaultWidth = 0, key = 'width') {
  const width = typeof value === 'number' ? value : pluckDeep(value, key);
  return width ? `${width}px` : `${defaultWidth}px`;
}

const FOCUSABLE_SELECTOR =
  'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';

export function focusFirstFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  (findFirstFocusableNode(element, onlyDescendants) as HTMLElement).focus();
}

export function findFirstFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
): HTMLElement | null {
  if (!onlyDescendants && matches(element, FOCUSABLE_SELECTOR)) {
    return element;
  }

  return element.querySelector(FOCUSABLE_SELECTOR);
}

function matches(node: HTMLElement, selector: string) {
  if (node.matches) {
    return node.matches(selector);
  }

  const matches = (node.ownerDocument || document).querySelectorAll(selector);
  let i = matches.length;
  while (--i >= 0 && matches.item(i) !== node) {
    return i > -1;
  }
}

interface Options {
  trapping: boolean;
}

export interface FocusManagerContextType {
  trapFocusList: string[];
  add: (id: string) => void;
  remove: (id: string) => boolean;
}

export function useFocusManager(trapping) {
  const focusManager = undefined as unknown as FocusManagerContextType;
  const id = `TrapFocus${new Date().getUTCMilliseconds()}`;

  if (!focusManager) {
    // tslint:disable-next-line:no-console
    console.error('No FocusManager was provided.');
  } else {
    console.log(focusManager);
  }

  const {
    trapFocusList,
    add: addFocusItem,
    remove: removeFocusItem,
  } = focusManager;
  const value = trapFocusList[0] === id;
  if (addFocusItem && id && removeFocusItem && trapping) {
    if (!trapping) {
      return;
    }
    // @ts-ignore
    addFocusItem(id);
    // @ts-ignore
    return removeFocusItem(id);
  }
  return value;
}

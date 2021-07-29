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
    console.error('No FocusManager was provided.');
  }

  const {
    trapFocusList,
    add: addFocusItem,
    remove: removeFocusItem,
  } = focusManager;
  const canSafelyFocus = trapFocusList[0] === id;

  const value = canSafelyFocus;
  if (addFocusItem && id && removeFocusItem && trapping) {
    if (!trapping) {
      return;
    }
    addFocusItem(id);
    return removeFocusItem(id);
  }
  //
  // useEffect(() => {
  //   if (!trapping) return;
  //   addFocusItem(id);
  //   return () => {
  //     removeFocusItem(id);
  //   };
  // }, [addFocusItem, id, removeFocusItem, trapping]);

  return value;
}

import { createContext } from 'vue-create-context';

export const NavigationContext = createContext({
  location: '',
  withinContentContainer: false,
  onNavigationDismiss(): any{},
});

export const WithinContentContext = createContext(false);


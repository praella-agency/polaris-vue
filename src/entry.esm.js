
// Import vue components
import * as components from './components';

//Directives
import PToast from './components/PToast';
import PLoading from './components/PLoading';
import { PTooltip } from './components/PTooltip';

// install function executed by Vue.use()
const install = function installPolarisVue(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  Vue.use(PToast);
  Vue.use(PLoading);
  Vue.use(PTooltip);
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components';

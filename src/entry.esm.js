// Import vue components
import * as components from './components';

//Directives
import PToast from './components/PToast';
import PLoading from './components/PLoading';
import { PTooltip } from './components/PTooltip';
import {ClickOutSideDirective} from './components/PClickOutSide';

// install function executed by Vue.use()
const install = function installPolarisVue(Vue) {
  window.isVue3 = parseFloat(Vue.version || Vue.default.version) >= 3;
  console.log('i am here', window.isVue3)
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
  //
  Vue.use(PToast);
  Vue.use(PLoading);
  Vue.use(PTooltip);
  Vue.directive('p-click-outside', ClickOutSideDirective(Vue));
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components';

'use strict'
import PLoading from './PLoading.vue';
import Api from './components/api';
import utils from '../../utilities';

let Plugin;

if (utils.isVue2) {
    Plugin = (Vue, options = {}) => {
        let methods = Api(Vue, options);
        Vue.$pLoading = methods;
        Vue.prototype.$pLoading = methods;
    };
} else {
    Plugin = (app, options = {}) => {
        let methods = Api(app, options);
        app.config.globalProperties.$pLoading = methods;
        app.provide('$pLoading', methods);
    };
}

PLoading.install = Plugin;

export default PLoading;
export { PLoading };

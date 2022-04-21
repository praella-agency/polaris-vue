import PToast from './components/PToast.vue';
import Api from './components/api';
import utils from '../../utilities';

let Plugin = null;

if (utils.isVue2) {
     Plugin = (Vue, options = {}) => {
        let methods = Api(Vue, options);
        Vue.$pToast = methods;
        Vue.prototype.$pToast = methods;
    };
} else {
    Plugin = (app, options = {}) => {
        let methods = Api(app, options);
        app.config.globalProperties.$pToast = methods;
        app.provide('$pToast', methods);
    };
}

PToast.install = Plugin;

export default PToast;
export { PToast };

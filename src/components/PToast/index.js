import pToast from './components/PToast.vue';
import Api from './components/api.js';

const Plugin = (Vue, options = {}) => {
    let methods = Api(Vue, options);
    Vue.$pToast = methods;
    Vue.prototype.$pToast = methods;
};

pToast.install = Plugin;

export default pToast;
export {pToast};

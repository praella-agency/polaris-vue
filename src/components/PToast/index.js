import PToast from './components/PToast.vue';
import Api from './components/api';

const Plugin = (Vue, options = {}) => {
    let methods = Api(Vue, options);
    Vue.$pToast = methods;
    Vue.prototype.$pToast = methods;
};

PToast.install = Plugin;

export default PToast;
export { PToast };

import PToast from './components/PToast.vue';
import Api from './components/api';

let Plugin = (app, options = {}) => {
    let methods = Api(app, options);
    app.config.globalProperties.$pToast = methods;
    app.provide('$pToast', methods);
};

PToast.install = Plugin;

export default PToast;
export { PToast };

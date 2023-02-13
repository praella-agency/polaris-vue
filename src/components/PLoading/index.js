'use strict'
import PLoading from './PLoading.vue';
import Api from './components/api';

let Plugin = (app, options = {}) => {
        let methods = Api(app, options);
        app.config.globalProperties.$pLoading = methods;
        app.provide('$pLoading', methods);
    };


PLoading.install = Plugin;

export default PLoading;
export { PLoading };

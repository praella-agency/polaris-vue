import * as Vue from 'vue';
const isVue3 = parseFloat(Vue.version || Vue.default.version) >= 3;
const isVue2 = !isVue3;

export default {
    isVue3,
    isVue2,
    beforeDestroy: isVue2 ? 'beforeDestroy' : 'beforeUnmount',
    destroyed: isVue2 ? 'destroyed' : 'unmounted',
}

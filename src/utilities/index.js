import * as Vue from 'vue';
const isVue3 = parseFloat(Vue.version || Vue.default.version) >= 3;
const isVue2 = !isVue3;

export default {
    isVue3,
    isVue2,
    beforeDestroy: isVue2 ? 'beforeDestroy' : 'beforeUnmount',
    destroyed: isVue2 ? 'destroyed' : 'unmounted',
    bind: isVue2 ? 'bind' : 'beforeMount',
    unbind: isVue2 ? 'unbind' : 'unmounted',
    Chrome: isVue2 ? require('vue-color').Chrome : require('@ckpack/vue-color').Chrome,
    VueApexCharts: isVue2 ? require('vue-apexcharts').default : require('vue3-apexcharts').default,
    // DateRangePicker: isVue2 ? require('vue2-daterange-picker').default : require('@hnquang/vue3-daterange-picker')
    Multiselect: isVue2 ? require('vue-multiselect').default : require('@suadelabs/vue3-multiselect').default,
    ckeditor: isVue2 ? require('@ckeditor/ckeditor5-vue2').component : require('@ckeditor/ckeditor5-vue').component,
}

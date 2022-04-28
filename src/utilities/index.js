import { vue } from '../ComponentHelpers';
const isVue3 = parseFloat(vue.version || vue.default.version) >= 3;
const isVue2 = !isVue3;

export default {
    isVue3,
    isVue2,
    beforeDestroy: isVue2 ? 'beforeDestroy' : 'beforeUnmount',
    destroyed: isVue2 ? 'destroyed' : 'unmounted',
    bind: isVue2 ? 'bind' : 'beforeMount',
    unbind: isVue2 ? 'unbind' : 'unmounted',
    inserted: isVue2 ? 'inserted' : 'mounted',
    Chrome: isVue2 ? require('vue-color').Chrome : require('@ckpack/vue-color').Chrome,
    VueApexCharts: isVue2 ? require('vue-apexcharts').default : require('vue3-apexcharts').default,
    DateRangePicker: isVue2 ? require('vue2-daterange-picker').default : require('vue3-daterange-picker').default,
    MultiSelect: isVue2 ? require('vue-multiselect').default : require('@suadelabs/vue3-multiselect').default,
    ckEditor: isVue2 ? require('@ckeditor/ckeditor5-vue2').component : require('@ckeditor/ckeditor5-vue').component,
}

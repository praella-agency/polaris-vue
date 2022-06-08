const isVue3 = window.isVue3;
const isVue2 = !isVue3;
export default {
    isVue3,
    isVue2,
    //life-cycle
    beforeDestroy: isVue2 ? 'beforeDestroy' : 'beforeUnmount',
    destroyed: isVue2 ? 'destroyed' : 'unmounted',
    //directive
    bind: isVue2 ? 'bind' : 'beforeMount',
    unbind: isVue2 ? 'unbind' : 'unmounted',
    inserted: isVue2 ? 'inserted' : 'mounted',
}

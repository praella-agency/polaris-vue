export default {
    //life-cycle
    beforeDestroy: 'beforeUnmount',
    destroyed: 'unmounted',
    //directive
    bind: 'beforeMount',
    unbind: 'unmounted',
    inserted: 'mounted',
}

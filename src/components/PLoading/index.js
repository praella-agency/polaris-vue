'use strict'

import PLoading from './PLoading.vue';

function assign(target, source) { // eslint-disable-line no-unused-vars
    for (let index = 1, key, src; index < arguments.length; ++index) {
        src = arguments[index];

        for (key in src) {
            if (Object.prototype.hasOwnProperty.call(src, key)) {
                target[key] = src[key];
            }
        }
    }

    return target;
}

function install(Vue, options = {}) {
    const inBrowser = typeof window !== 'undefined';

    const DEFAULT_OPTION = {
        canSuccess: true,
        show: false,
        color: 'rgba(0, 127, 95, 1)',
        position: 'fixed',
        failedColor: 'rgba(191,7,17,0.88)',
        thickness: '3px',
        transition: {
            speed: '0.5s',
            opacity: '0.6s',
            termination: 300
        },
        autoRevert: true,
        location: 'top',
        inverse: false,
        autoFinish: true
    };

    let Loading = {
        $vm: null,
        state: {
            tFailColor: '',
            tColor: '',
            timer: null,
            cut: 0
        },
        init(vm) {
            this.$vm = vm;
        },
        start(time) {
            if (!this.$vm) {
                return;
            }
            if (!time) time = 3000;
            this.$vm.RADON_LOADING_BAR.percent = 0; // this.$vm.RADON_LOADING_BAR.percent
            this.$vm.RADON_LOADING_BAR.options.show = true;
            this.$vm.RADON_LOADING_BAR.options.canSuccess = true;
            this.state.cut = 10000 / Math.floor(time);
            clearInterval(this.state.timer);
            this.state.timer = setInterval(() => {
                this.increase(this.state.cut * Math.random());
                if (this.$vm.RADON_LOADING_BAR.percent > 95 && this.$vm.RADON_LOADING_BAR.options.autoFinish) {
                    this.finish();
                }
            }, 100);
        },
        set(num) {
            this.$vm.RADON_LOADING_BAR.options.show = true;
            this.$vm.RADON_LOADING_BAR.options.canSuccess = true;
            this.$vm.RADON_LOADING_BAR.percent = Math.floor(num);
        },
        get() {
            return Math.floor(this.$vm.RADON_LOADING_BAR.percent);
        },
        increase(num) {
            this.$vm.RADON_LOADING_BAR.percent = Math.min(99, this.$vm.RADON_LOADING_BAR.percent + Math.floor(num));
        },
        decrease(num) {
            this.$vm.RADON_LOADING_BAR.percent = this.$vm.RADON_LOADING_BAR.percent - Math.floor(num);
        },
        hide() {
            clearInterval(this.state.timer);
            this.state.timer = null;
            setTimeout(() => {
                this.$vm.RADON_LOADING_BAR.options.show = false;
                Vue.nextTick(() => {
                    setTimeout(() => {
                        this.$vm.RADON_LOADING_BAR.percent = 0;
                    }, 100);
                })
            }, this.$vm.RADON_LOADING_BAR.options.transition.termination);
        },
        finish() {
            if (!this.$vm) return;
            this.$vm.RADON_LOADING_BAR.percent = 99;
            setTimeout(() => {
                this.hide();
            }, 3000);
        },
        fail() {
            this.$vm.RADON_LOADING_BAR.options.canSuccess = false;
            this.$vm.RADON_LOADING_BAR.percent = 99;
            setTimeout(() => {
                this.hide();
            }, 3000);
        },
    }

    const loadingOptions = assign(DEFAULT_OPTION, options);

    const PLoadingEventBus = new Vue({
        data: {
            RADON_LOADING_BAR: {
                percent: 0,
                options: loadingOptions,
            }
        }
    });

    if (inBrowser) {
        window.PLoadingEventBus = PLoadingEventBus;
        Loading.init(PLoadingEventBus);
    }

    Vue.component('pLoading', PLoading);

    Vue.prototype.$pLoading = Loading;

    let componentClass = Vue.extend(PLoading);
    let instance = new componentClass({});
    instance.$mount();

    document.body.prepend(instance.$el);
}

export default {
    install
}

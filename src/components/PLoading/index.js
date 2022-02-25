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
    let instance = null;
    document.addEventListener('DOMContentLoaded', () => {
        let componentClass = Vue.extend(PLoading);
        instance = new componentClass({});
    });
    let Loading = {
        $vm: null,
        element: null,
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
            if (!instance) {
                let componentClass = Vue.extend(PLoading);
                instance = new componentClass({});
            }
            if (instance) {
                instance.$mount();
                self.element = instance.$el;
                document.body.prepend(element);
            }
            if (!time) time = 3000;
            this.$vm.RADON_LOADING_BAR.percent = 0; // this.$vm.RADON_LOADING_BAR.percent
            this.$vm.RADON_LOADING_BAR.options.is_finished = false;
            this.$vm.RADON_LOADING_BAR.options.show = true;
            this.$vm.RADON_LOADING_BAR.options.canSuccess = true;
            this.state.cut = 10000 / Math.floor(time);
            clearInterval(this.state.timer);
            this.state.timer = setInterval(() => {
                this.increase(this.state.cut * Math.random());
                if (this.$vm.RADON_LOADING_BAR.percent > 95 && this.$vm.RADON_LOADING_BAR.options.autoFinish && !this.$vm.RADON_LOADING_BAR.options.is_finished) {
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
            this.$vm.RADON_LOADING_BAR.options.show = false;
            Vue.nextTick(() => {
                this.$vm.RADON_LOADING_BAR.percent = 0;
            });
            if(self.element) {
                document.body.removeChild(self.element);
                instance = null;
                self.element = null;
            }
        },
        finish() {
            if (!this.$vm) return;
            this.$vm.RADON_LOADING_BAR.percent = 99;
            this.$vm.RADON_LOADING_BAR.options.is_finished = true;
            setTimeout(() => {
                this.hide();
            }, 500);
        },
        fail() {
            this.$vm.RADON_LOADING_BAR.options.canSuccess = false;
            this.$vm.RADON_LOADING_BAR.percent = 99;
            this.$vm.RADON_LOADING_BAR.options.is_finished = true;
            setTimeout(() => {
                this.hide();
            }, 500);
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
    Vue.$pLoading = Loading;
    Vue.prototype.$pLoading = Loading;
}
export default {
    install
}

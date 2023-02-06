import PLoading from '../PLoading';
import mitt from 'mitt';

const eventBus = mitt();
import {createComponent} from '../../../ComponentHelpers';

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

const Api = (Vue, globalOptions = {}) => {
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
        location: 'top',
        autoFinish: true
    };
    const progressOptions = assign(DEFAULT_OPTION, globalOptions);

    const RADON_LOADING_BAR = {
        percent: 0,
        options: progressOptions
    }

    createComponent(
        PLoading,
        {
            props: {
                RADON_LOADING_BAR: RADON_LOADING_BAR,
                eventBus
            },
            prependToContainer: true
        },
        document.body
    );
    return {
        state: {
            tFailColor: '',
            tColor: '',
            timer: null,
            cut: 0
        },
        start(time) {
            if (!time) time = 3000;
            RADON_LOADING_BAR.percent = 0; // RADON_LOADING_BAR.percent
            RADON_LOADING_BAR.options.show = true;
            RADON_LOADING_BAR.options.canSuccess = true;
            eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
            this.state.cut = 10000 / Math.floor(time);
            clearInterval(this.state.timer);
            this.state.timer = setInterval(() => {
                this.increase(this.state.cut * Math.random());
                if (RADON_LOADING_BAR.percent > 95 && RADON_LOADING_BAR.options.autoFinish) {
                    this.finish();
                }
            }, 100);
        },
        set(num) {
            RADON_LOADING_BAR.options.show = true;
            RADON_LOADING_BAR.options.canSuccess = true;
            RADON_LOADING_BAR.percent = Math.floor(num);
            eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
        },
        get() {
            return Math.floor(RADON_LOADING_BAR.percent);
        },
        increase(num) {
            RADON_LOADING_BAR.percent = Math.min(99, RADON_LOADING_BAR.percent + Math.floor(num));
            eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
        },
        decrease(num) {
            RADON_LOADING_BAR.percent = RADON_LOADING_BAR.percent - Math.floor(num);
            eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
        },
        hide() {
            clearInterval(this.state.timer);
            this.state.timer = null;
            setTimeout(() => {
                RADON_LOADING_BAR.options.show = false;
                eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
                setTimeout(() => {
                    RADON_LOADING_BAR.percent = 0;
                    eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
                }, 100);
            }, RADON_LOADING_BAR.options.transition.termination);
        },
        pause() {
            clearInterval(this.state.timer);
        },
        finish() {
            RADON_LOADING_BAR.percent = 100;
            eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
            setTimeout(() => {
                this.hide();
            }, 500);
        },
        fail() {
            RADON_LOADING_BAR.options.canSuccess = false;
            RADON_LOADING_BAR.percent = 100;
            eventBus.emit('PLoading-update-data', RADON_LOADING_BAR);
            setTimeout(() => {
                this.hide();
            }, 500);
        }
    };
};

export default Api;

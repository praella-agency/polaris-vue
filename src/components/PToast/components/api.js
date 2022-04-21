import PToast from './PToast';
import eventBus from '../helper/event-bus';
import ComponentHelpers from '../../../ComponentHelpers';

const Api = (Vue, globalOptions = {}) => {
    return {
        open(options) {
            let message;
            if (typeof options === 'string') message = options;

            const defaultOptions = {
                message
            };

            const propsData = Object.assign({}, defaultOptions, globalOptions, options);

            return ComponentHelpers.createComponent(PToast, propsData, document.body, 'v-toast--pending');
        },
        clear() {
            eventBus.emit('toast-clear')
        },
        success(message, options = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'success'
            }, options))
        },
        error(message, options = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'error'
            }, options))
        },
        info(message, options = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'info'
            }, options))
        },
        warning(message, options = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'warning'
            }, options))
        },
        default(message, options = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'default'
            }, options))
        }
    }
};

export default Api;

import PToast from './PToast';
import mitt from 'mitt';
const eventBus = mitt();
import { createComponent } from '../../../ComponentHelpers';

const Api = (Vue, globalOptions = {}) => {
    return {
        open(options) {
            let message;
            if (typeof options === 'string') message = options;

            const defaultOptions = {
                message
            };

            const propsData = Object.assign({}, defaultOptions, globalOptions, options);
            propsData.eventBus = eventBus;
            return createComponent(
                PToast,
                {
                    el: document.createElement('div'),
                    props: propsData,
                    canAppend: false,
                    canMount: false,
                }, document.body, {
                    tag: 'div',
                    className: 'v-toast--pending'
                }
            );
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

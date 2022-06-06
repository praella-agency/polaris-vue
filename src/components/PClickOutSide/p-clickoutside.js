import utils from '../../utilities';

export const ClickOutSideDirective = (app) => {
    return {
        [utils.bind](el, binding, vnode) {
            console.log('here', el, binding, el.clickOutsideEvent, vnode)
            el.clickOutsideEvent = function(event) {
                if (!(el === event.target || el.contains(event.target))) {
                    console.log('here in click outside');
                    if (utils.isVue3){
                        binding.value(event, el);
                    } else {
                        vnode.context[binding.expression](event);
                    }
                }
            };
            // console.log(el.clickOutsideEvent);
            // document.body.style.cssText = 'height: 100vh;';
            document.addEventListener('click', el.clickOutsideEvent);
        },
        [utils.unbind](el) {
            console.log('in unbind click outside');
            document.removeEventListener('click', el.clickOutsideEvent);
        }
    }
}

const PClickOutside = {
    install(app, options) {
        app.directive('p-click-outside', ClickOutSideDirective(app));
    }
}

export {
    PClickOutside
};

import utils from '../../utilities';

export const ClickOutSideDirective = (app) => {
    return {
        [utils.bind](el, binding, vnode) {
            el.clickOutsideEvent = function(event) {
                if (!(el === event.target || el.contains(event.target))) {
                    if (utils.isVue3){
                        binding.value(event, el);
                    } else {
                        vnode.context[binding.expression](event);
                    }
                }
            };
            document.addEventListener('click', el.clickOutsideEvent);
        },
        [utils.unbind](el) {
            document.removeEventListener('click', el.clickOutsideEvent);
        }
    }
}
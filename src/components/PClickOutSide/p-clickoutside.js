import utils from '../../utilities';

export const ClickOutSideDirective = (app) => {
    return {
        [utils.bind](el, binding, vnode) {
            el.clickOutsideEvent = function(event) {
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value(event, el);
                }
            };
            document.addEventListener('click', el.clickOutsideEvent);
        },
        [utils.unbind](el) {
            document.removeEventListener('click', el.clickOutsideEvent);
        }
    }
}
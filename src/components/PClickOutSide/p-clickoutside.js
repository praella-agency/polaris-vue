import utils from '../../utilities';

export const ClickOutSideDirective = (app) => {
    return {
        [utils.bind](el, binding, vnode) {
            console.log(el.clickOutsideEvent);
            if (el.clickOutsideEvent) {
                el.clickOutsideEvent = function (event) {
                    console.log('here i am in click outside');
                    // here I check that click was outside the el and his childrens
                    if (!(el === event.target || el.contains(event.target))) {
                        // and if it did, call method provided in attribute value
                        vnode.context[binding.expression](event);
                    }
                };
            }
            document.body.addEventListener('click', el.clickOutsideEvent)
        },
        [utils.unbind](el) {
            document.body.removeEventListener('click', el.clickOutsideEvent)
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
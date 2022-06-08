import utils from '../../../../utilities';

export default {
    mounted(el, bindings, context) {
        const {height, top, left, width, right} = bindings.instance.$refs.toggle.getBoundingClientRect();

        el.unbindPosition = bindings.instance.calculatePosition(el, bindings.instance, {
            width: width,
            top: (window.scrollY + top + height),
            left: (window.scrollX + left),
            right: right
        });

        document.body.appendChild(el);
    },

    [utils.destroyed](el) {
        if (el.unbindPosition && typeof el.unbindPosition === 'function') {
            el.unbindPosition();
        }
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    },
}

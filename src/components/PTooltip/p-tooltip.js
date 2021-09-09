import { Vue } from 'vue-property-decorator';
import { PTooltip } from './index';

function tooltipBind(event, binding, togglePop, elementId = null) {
    let position = 'below';
    if (Object.keys(binding.modifiers).length > 0) {
        Object.keys(binding.modifiers).forEach(function modifiersKey(key) {
            if (key === 'above' || key === 'below' || key === 'mostSpace') {
                position = key;
            } else {
                console.error('Error:- `' + key + '` position is not available.');
            }
        });
    }

    let targetEl = event.target;
    if (targetEl.offsetWidth <= targetEl.scrollWidth) {

        targetEl.id = 'tooltip' + (new Date()).getTime();
        let id = `_${targetEl.id}_`;
        if (togglePop) {
            let instance = new PTooltip({
                propsData: {
                    id: id,
                    active: togglePop,
                    preferredPosition: position,
                }
            });
            instance.$slots.tooltipContent = binding.value;
            instance.$mount();

            document.body.append(instance.$el);
            window.dispatchEvent(new Event('resize'));
        } else {
            console.log('PolarisPopover' + elementId.replace(/_/g, '') + 'Activator');
            document.getElementById('PolarisPopover' + elementId.replace(/_/g, '') + 'Activator').parentElement.remove();
        }
    }
}

const Tooltip = Vue.directive('p-tooltip', {
    bind(el, binding, vnode) {
        el.addEventListener('mouseenter', function (event) {
            tooltipBind(event, binding, true);
        });
        el.addEventListener('mouseleave', function (event) {
            tooltipBind(event, binding, false, event.target.id);
        });
    },
    unbind(el) {
        el.removeEventListener('mouseenter', tooltipBind);
        el.removeEventListener('mouseleave', tooltipBind);
    }
})

export { Tooltip };

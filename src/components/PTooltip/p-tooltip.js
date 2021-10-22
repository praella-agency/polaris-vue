import { Vue } from 'vue-property-decorator';
import Tooltip from './PTooltip';

function tooltipBind(event, binding, togglePop, elementId) {
    let position = 'below';
    if (Object.keys(binding.modifiers).length > 0) {
        Object.keys(binding.modifiers).forEach(function modifiersKey(key) {
            if (key === 'above' || key === 'below' || key === 'mostSpace') {
                position = key;
            } else {
                console.error('Error: `' + key + '` position is not available.');
            }
        });
    }

    let targetEl = event.target;
    if (targetEl.offsetWidth <= targetEl.scrollWidth) {
        if (!elementId) {
            targetEl.id = 'tooltip' + (new Date()).getTime();
        }

        let id = `_${targetEl.id}_`;
        if (togglePop) {
            let instance = new Tooltip({
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
            document.getElementById('PolarisPopover' + elementId.replace(/_/g, '') + 'Activator').parentElement.remove();
        }
    }
}

const PTooltip = Vue.directive('p-tooltip', {
    bind(el, binding, vnode) {
        el.addEventListener('mouseenter', function (event) {
            tooltipBind(event, binding, true, event.target.id);
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

export { PTooltip };

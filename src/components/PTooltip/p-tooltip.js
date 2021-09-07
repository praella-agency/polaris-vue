import { Vue } from 'vue-property-decorator';
import { PTooltip } from './index';

function tooltipBind(event, binding, togglePop) {
    console.log(binding)

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
        if (targetEl.id === '' || targetEl.id === null) {
            console.error('Error:- `id` attribute is required for element while using `v-p-tooltip` directive.');
            return;
        }

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
            document.getElementById(targetEl.id).appendChild(instance.$el);
        } else {
            document.getElementById('PolarisPopover' + targetEl.id + 'Activator').parentElement.remove()
        }
    }
}

const Tooltip = Vue.directive('p-tooltip', {
    bind(el, binding, vnode) {
        el.addEventListener('mouseenter', function (event) {
            tooltipBind(event, binding, true);
        });
        el.addEventListener('mouseleave', function (event) {
            tooltipBind(event, binding, false);
        });
    },
    unbind(el) {
        el.removeEventListener('mouseenter', tooltipBind);
        el.removeEventListener('mouseleave', tooltipBind);
    }
})

export { Tooltip };

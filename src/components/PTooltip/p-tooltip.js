import utils from '../../utilities';
import { createComponent } from '../../ComponentHelpers';
import Tooltip from './PTooltip.vue';

function tooltipBind(app, event, binding, togglePop, elementId) {
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

    // if (targetEl.offsetWidth <= targetEl.scrollWidth) {
        if (!elementId) {
            targetEl.id = 'tooltip' + (new Date()).getTime();
        }

        let id = `_${targetEl.id}_`;
        if (togglePop) {
            createComponent(Tooltip, {
                id: id,
                active: togglePop,
                preferredPosition: position,
                tooltipContent: binding.value,
            }, document.body, {
                tag: 'div'
            }, {
                tooltipContent: binding.value,
            });
            window.dispatchEvent(new Event('resize'));
        } else {
            const element = document.getElementById('PolarisPopover' + elementId.replace(/_/g, '') + 'Activator');
            if (element && element.parentElement) {
                element.parentElement.parentElement.remove();
            }
        }
    // }
}

export const directives = (app) => {
    return {
        [utils.bind](el, binding, vnode) {
            el.addEventListener('mouseenter', function (event) {
                tooltipBind(app, event, binding, true, event.target.id);
            });
            el.addEventListener('mouseleave', function (event) {
                tooltipBind(app, event, binding, false, event.target.id);
            });
        },
        [utils.unbind](el) {
            el.removeEventListener('mouseenter', tooltipBind);
            el.removeEventListener('mouseleave', tooltipBind);
        }
    }
}

const PTooltip = {
    install(app, options) {
        app.component('PTooltip', Tooltip);
        app.directive('p-tooltip', directives(app));
    }
}

export {
    PTooltip
};

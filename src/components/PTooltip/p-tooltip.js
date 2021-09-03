import { Vue } from 'vue-property-decorator';
import { PPopover } from '../PPopover';

function tooltipBind(event, binding) {
    console.log(event, binding)
    let targetEl = event.target;
    if (targetEl.offsetWidth <= targetEl.scrollWidth) {
        return Vue.component('p-tooltip', {
            components: {
                PPopover,
            },
            template: `<span>Hello</span>`,
            created() {
                console.log('in tooltip')
            }
        })
    } else {
        targetEl.hasAttribute('title') && targetEl.removeAttribute('title');
    }
}

const Tooltip = Vue.directive('p-tooltip', {
    bind(el, binding, vnode) {
        el.style.textOverflow = "ellipsis";
        el.style.display = "inline-block";
        el.style.whiteSpace = "nowrap";
        el.style.overflow = "hidden";

        el.addEventListener('mouseover', function (event) {
            tooltipBind(event, binding);
        });
        console.log(el, binding, vnode);
    },
    unbind(el) {
        el.removeEventListener('mouseover', tooltipBind);
    }
})

export { Tooltip };

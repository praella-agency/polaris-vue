import utils from './utilities';
import vue2 from 'vue2';
const vue3 = require('vue');

function isNodeOfComponent(node, component) {
    if (!node || (utils.isVue2 && !node.componentOptions)) {
        return false;
    }
    let nodeComponentTagName = utils.isVue2 ? node.componentOptions.tag : node.type.name;
    return nodeComponentTagName === component.name;
}

function wrapNodesWithComponent(createElement, nodes, component, ignoredComponents = []) {
    let children = [];
    for (let node of nodes) {
        if (!node.tag && (node.text && !node.text.trim())) {
            continue;
        }

        if(utils.isVue3 && node.type === vue3.Comment) {
            continue;
        }
        if(utils.isVue3 && node.type === vue3.Fragment) {
            const fragmentChildren = wrapNodesWithComponent(createElement, node.children, component, ignoredComponents);
            children = [
                ...children,
                ...fragmentChildren,
            ]
            continue;
        }
        let added = false;
        if (isNodeOfComponent(node, component)) {
            added = true;
            children.push(node);
        } else {
            for (let ignored of ignoredComponents) {
                if (isNodeOfComponent(node, ignored)) {
                    added = true;
                    children.push(node);
                    break;
                }
            }
        }

        if (!added) {
            children.push(createElement(component, {}, utils.isVue3 ? () => [node] : [node]));
        }
    }
    return children;
}

function uuid() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function createComponent(component, options, parentContainer, element, slots = {}) {
    if (utils.isVue2) {
        const extendedOptions = {
            propsData: options.props,
        };
        if(options.el) {
            extendedOptions.el = options.el;
        }
        const instance = new (vue2.extend(component))(extendedOptions);
        if(options.slots) {
            for(const slotName of Object.keys(options.slots)) {
                instance.$slots[slotName] = options.slots[slotName];
            }
        }
        if(options.canMount !== false) {
            instance.$mount();
        }
        if(options.canAppend !== false) {
            if(options.prependToContainer) {
                parentContainer.prepend(instance.$el);
            } else {
                parentContainer.append(instance.$el);
            }
        }
        return instance;
    } else {
        const vNode = vue3.h(component, {...options.props, ...options.slots}, () => slots);
        if (element && element.tag) {
            const container = document.createElement(element.tag);
            if (element.className) {
                container.classList.add(element.className);
            }
            parentContainer.appendChild(container);
            vue3.render(vNode, container);
        } else {
            vue3.render(vNode, parentContainer)
        }
        return vNode;
    }
}

function hasSlot(slot) {
    if (utils.isVue3) {
        let hasSlot = false;
        if (slot) {
            slot().forEach((item) => {
                if (item.type !== vue3.Comment) {
                    if (Array.isArray(item.children)) {
                        if (item.children.length) {
                            hasSlot = true;
                        }
                    } else {
                        hasSlot = true;
                    }
                }
            });
        }
        return hasSlot;
    } else {
        return !!slot;
    }
}

export {
    createComponent,
    uuid,
    wrapNodesWithComponent,
    hasSlot,
    vue2,
    vue3
};

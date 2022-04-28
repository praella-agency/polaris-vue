import utils from './utilities';
const vue = require('vue');

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

        if(utils.isVue3 && node.type === vue.Comment) {
            continue;
        }
        if(utils.isVue3 && node.type === vue.Fragment) {
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

function createComponent(component, props, parentContainer, element, slots = {}) {
    if (utils.isVue2) {
        let el = null;
        if (element.tag) {
            el = document.createElement(element.tag);
            if (element.className) {
                el.classList.add(element.className);
            }
        } else {
            el = parentContainer;
        }
        return new (vue.extend(component))({
            el,
            props,
            slots
        })
    } else {
        const vNode = vue.h(component, props, () => slots);
        if (element.tag) {
            const container = document.createElement(element.tag);
            if (element.className) {
                container.classList.add(element.className);
            }
            parentContainer.appendChild(container);
            vue.render(vNode, container);
        } else {
            vue.render(vNode, parentContainer)
        }

        return vNode.component;
    }
}

function hasSlot(slot) {
    if (utils.isVue3) {
        let hasSlot = false;
        if (slot) {
            slot().forEach((item) => {
                if (item.type !== vue.Comment) {
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

function nextTick() {
    return vue.nextTick;
}

export {
    createComponent,
    uuid,
    wrapNodesWithComponent,
    hasSlot,
    vue,
    nextTick,
};

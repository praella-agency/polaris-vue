const vue3 = require('vue');

function isNodeOfComponent(node, component) {
    if (!node) {
        return false;
    }
    let nodeComponentTagName = node.type.name;
    return nodeComponentTagName === component.name;
}

function wrapNodesWithComponent(createElement, nodes, component, ignoredComponents = []) {
    let children = [];
    for (let node of nodes) {
        if (!node.tag && (node.text && !node.text.trim())) {
            continue;
        }

        if(node.type === vue3.Comment) {
            continue;
        }
        if(node.type === vue3.Fragment) {
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
            children.push(createElement(component, {}, () => [node]));
        }
    }
    return children;
}

function uuid() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function createComponent(component, options, parentContainer, element, slots = {}) {
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

function hasSlot(slot) {
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
}

export {
    createComponent,
    uuid,
    wrapNodesWithComponent,
    hasSlot,
    vue3
};

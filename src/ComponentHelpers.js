import {
    camelCase,
    capitalCase,
    constantCase,
    dotCase,
    headerCase,
    noCase,
    paramCase,
    pascalCase,
    pathCase,
    sentenceCase,
    snakeCase,
} from 'change-case';
import utils from './utilities';
const vue = require('vue');

class ComponentHelpers {
    constructor() {
        this.componentNameFormat = name => name;
    }

    setComponentNameFormat(format) {
        this.componentNameFormat = format;
    }

    makeComponentClass(componentName, properties, state) {
        let classes = {};
        classes[componentName] = true;

        for (let prop of properties) {
            let value = state[prop];
            let valueTag = '';
            if (value && typeof value === 'string') {
                valueTag = value.charAt(0).toUpperCase() + value.slice(1);
            }
            classes[componentName + '--' + prop + valueTag] = state[prop];
        }

        return classes;
    }

    getComponentName(polarisName) {
        return this.componentNameFormat(polarisName, {
            camelCase,
            capitalCase,
            constantCase,
            dotCase,
            headerCase,
            noCase,
            paramCase,
            pascalCase,
            pathCase,
            sentenceCase,
            snakeCase,
        });
    }
}

function isNodeOfComponent(node, component) {
    if (!node || !node.componentOptions) {
        return false;
    }

    let nodeComponentTagName = node.componentOptions.tag;
    let ComponentHelpers = new ComponentHelpers();
    let componentTagName = ComponentHelpers.getComponentName(component.name);

    return nodeComponentTagName === componentTagName;
}

function wrapNodesWithComponent(createElement, nodes, component, ignoredComponents = []) {
    let children = [];
    for (let node of nodes) {
        if (!node.tag && (node.text && !node.text.trim())) {
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
        return !!(slot && slot().length === 2 ? slot()[1].children.length : false);
    } else {
        return !!slot;
    }
}

export {
    createComponent,
    uuid,
    wrapNodesWithComponent,
    hasSlot
};

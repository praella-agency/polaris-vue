import Vue from 'vue'
import {StringValidator} from './StringValidator';
import {ArrayValidator} from './ArrayValidator';

export const ObjectPropertyValidator = (name, object, objectInterface) => {
    let result = true;
    // Validate required keys of object.
    for(let objectKey in objectInterface) {
        const objectType = objectInterface[objectKey];
        let isRequired = false;
        let valueType = objectType;

        if(typeof objectType === 'object') {
            isRequired = objectType.required || false;
            valueType = objectType.type || undefined;
        }

        if (valueType.name && object.hasOwnProperty(objectKey)) {
            switch (valueType.name) {
                case 'Object': {
                    if (objectType.properties) {
                        result = ObjectValidator(name, object[`${objectKey}`], objectType.properties, isRequired);
                        continue;
                    }
                    break;
                }
                case 'Array': {
                    if (objectType.properties) {
                        result = ArrayValidator(name, object[`${objectKey}`], objectType.properties, isRequired);
                        continue;
                    }
                    break;
                }
                case 'String': {
                    if (objectType.expectedValues) {
                        result = StringValidator(name, object[`${objectKey}`], objectType.expectedValues, isRequired);
                        continue;
                    }
                    break;
                }
            }
        }

        if (isRequired && !object.hasOwnProperty(objectKey)) {
            Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" is missing.`, true)
            result = false;
        } else if (object.hasOwnProperty(objectKey)) {
            let objectValue = object[objectKey];

            if (Array.isArray(objectValue)) {
                if (valueType.name.toLowerCase() !== 'array') {
                    Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be "${valueType.name.toLowerCase()}", got "${typeof objectValue}".`, true);
                    result = false;
                }
            } else if (typeof (objectValue) !== valueType.name.toLowerCase()) {
                Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be "${valueType.name.toLowerCase()}", got "${typeof objectValue}".`, true);
                result = false;
            }
        }
    }

    return result;
}

export const ObjectValidator = (name, object, objectInterface, isRequired) => {
    // Value type validation.
    if (isRequired && (object === null || object === undefined || Object.keys(object).length === 0)) {
        Vue.util.warn(`The "${name}" prop is missing.`, true)
        return false;
    } else {
        if (typeof object !== 'object') {
            Vue.util.warn(
                `The "${name}" prop is invalid. Given value type: ${typeof object}. Expected value type: Object.`, true)
            return false;
        }
        if (Object.keys(object).length) {
            return ObjectPropertyValidator(name, object, objectInterface);
        }
        return true;
    }
}

export default (name, objectInterface, isRequired = false) => {
    return {
        validator: object => {
            return ObjectValidator(name, object, objectInterface, isRequired);
        }
    }
}

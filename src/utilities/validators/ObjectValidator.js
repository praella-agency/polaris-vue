import Vue from 'vue'
import {StringValidator} from './StringValidator';
import {ArrayValidator} from './ArrayValidator';

export const ObjectPropertyValidator = (name, object, objectInterface) => {
    let result = true;
    // Validate required keys of object.
    for(let objectKey in objectInterface) {
        const objectType = objectInterface[objectKey];
        let isRequired = false;
        let valueType = [];
        if (!Array.isArray(objectType)) {
            if (typeof objectType !== 'object') {
                valueType = [objectType.name];
            }
        } else {
            objectType.forEach((type) => {
                valueType.push(type.name || undefined);
            });
        }

        if(typeof objectType === 'object') {
            isRequired = objectType.required || false;
            if (!Array.isArray(objectType.type)) {
                valueType = [objectType.type.name] || undefined;
            } else {
                objectType.type.forEach((type) => {
                    valueType.push(type.name || undefined);
                });
            }
        }

        if (valueType && object.hasOwnProperty(objectKey)) {
            let isContinue = false;
            valueType.forEach(vType => {
                switch (vType) {
                    case 'object': {
                        if (objectType.properties) {
                            result = ObjectValidator(name, object[`${objectKey}`], objectType.properties, isRequired);
                            isContinue = true;
                        }
                        break;
                    }
                    case 'array': {
                        if (objectType.properties) {
                            result = ArrayValidator(name, object[`${objectKey}`], objectType.properties, isRequired);
                            isContinue = true;
                        }
                        break;
                    }
                    case 'string': {
                        if (objectType.expectedValues) {
                            result = StringValidator(name, object[`${objectKey}`], objectType.expectedValues, isRequired);
                            isContinue = true;
                        }
                        break;
                    }
                }
            })
            if (isContinue) {
                continue;
            }
        }

        if (isRequired && !object.hasOwnProperty(objectKey)) {
            Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" is missing.`, true)
            result = false;
        } else if (object.hasOwnProperty(objectKey)) {
            let objectValue = object[objectKey];

            if (Array.isArray(objectValue)) {
                if (!valueType.includes('Array')) {
                    Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be "${valueType}", got "${typeof objectValue}".`, true);
                    result = false;
                }
            } else if (!valueType.includes((typeof (objectValue)).charAt(0).toUpperCase() + (typeof (objectValue)).slice(1))) {
                Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be "${valueType}", got "${typeof objectValue}".`, true);
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
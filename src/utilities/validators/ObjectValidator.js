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

            switch (valueType.name) {
                case 'Object': {
                    if (objectType.properties) {
                        result = ObjectPropertyValidator(name, object[objectKey], objectType.properties);
                    }
                    break;
                }
                case 'Array': {
                    if (objectType.properties) {
                        result = ArrayValidator(name, object[objectKey], objectType.properties);
                    }
                    break;
                }
                case 'String': {
                    if (objectType.expectedValues) {
                        result = StringValidator(name, object[objectKey], objectType.expectedValues);
                    }
                    break;
                }
            }
        }

        if(isRequired && !object.hasOwnProperty(objectKey)) {
            Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" is missing.`, true)
            result = false;
        } else if(object.hasOwnProperty(objectKey)) {
            let objectValue = object[objectKey];

            if (Array.isArray(objectValue)) {
                if (valueType.name.toLowerCase() !== 'array') {
                    Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be 
                            "${valueType.name.toLowerCase()}", got "${typeof objectValue}".`, true);
                    result = false;
                }
            } else if(typeof(objectValue) !== valueType.name.toLowerCase()) {
                Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be 
                            "${valueType.name.toLowerCase()}", got "${typeof objectValue}".`, true);
                result = false;
            }
        }
    }

    return result;
}

export const ObjectValidator = (name, object, objectInterface) => {
    // Value type validation.
    if(typeof object !== 'object' ) {
        Vue.util.warn(
            `The "${name}" prop is invalid. Given value type: ${typeof object}. Expected value type: Object.`, true)
        return false;
    }

    return ObjectPropertyValidator(name, object, objectInterface);
}

export default (name, objectInterface) => {
    return {
        validator: object => {
            return ObjectValidator(name, object, objectInterface);
        }
    }
}

import { vue } from '../../ComponentHelpers';
import { StringValidator } from './StringValidator';
import { ArrayValidator } from './ArrayValidator';

export const ObjectPropertyValidator = (name, object, objectInterface) => {
    let result = true;
    // Validate required keys of object.
    for (let objectKey in objectInterface) {
        const objectType = objectInterface[objectKey];
        let isRequired = false;
        let isNullable = false;
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

        if (typeof objectType === 'object' && !Array.isArray(objectType)) {
            isRequired = objectType.required || false;
            isNullable = objectType.nullable || false;
            if (objectType.type && !Array.isArray(objectType.type)) {
                valueType = [objectType.type.name] || undefined;
            } else if (objectType.type) {
                objectType.type.forEach((type) => {
                    valueType.push(type.name || undefined);
                });
            }
        }

        if (valueType && object.hasOwnProperty(objectKey)) {
            let isContinue = false;
            if (isNullable) {
                isContinue = true;
            } else {
                valueType.forEach(vType => {
                    switch (vType) {
                        case 'Object': {
                            if (objectType.properties) {
                                result = ObjectValidator(`${name}.${objectKey}`, object[`${objectKey}`], objectType.properties, isRequired, isNullable);
                                isContinue = true;
                            }
                            break;
                        }
                        case 'Array': {
                            if (objectType.properties) {
                                result = ArrayValidator(`${name}.${objectKey}`, object[`${objectKey}`], objectType.properties, isRequired, isNullable);
                                isContinue = true;
                            }
                            break;
                        }
                        case 'String': {
                            if (objectType.expectedValues) {
                                result = StringValidator(`${name}.${objectKey}`, object[`${objectKey}`], objectType.expectedValues);
                                isContinue = true;
                            }
                            break;
                        }
                        case 'Date': {
                            if (object[`${objectKey}`] instanceof Date) {
                                isContinue = true;
                            }
                            break;
                        }
                    }
                });
            }
            if (isContinue) {
                continue;
            }
        }

        if (isRequired && !object.hasOwnProperty(objectKey)) {
            vue.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" is missing.`);

            result = false;
        } else if (object.hasOwnProperty(objectKey)) {
            let objectValue = object[objectKey];

            if (Array.isArray(objectValue)) {
                if (!valueType.includes('Array')) {
                    vue.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be "${valueType}", got "${typeof objectValue}".`);

                    result = false;
                }
            } else if (!valueType.includes((typeof (objectValue)).charAt(0).toUpperCase() + (typeof (objectValue)).slice(1))) {
                vue.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be "${valueType}", got "${typeof objectValue}".`);

                result = false;
            }
        }
    }

    return result;
}

export const ObjectValidator = (name, object, objectInterface, isRequired) => {
    // Value type validation.
    if (isRequired && (object === null || object === undefined || Object.keys(object).length === 0)) {
        vue.warn(`The "${name}" prop is missing.`);
        return false;
    } else {
        let isValidated = false;
        if (objectInterface[`${name}`]) {
            let valueType = [];
            let objectInterfaceType = objectInterface[`${name}`];
            if (!Array.isArray(objectInterfaceType)) {
                if (typeof objectInterfaceType !== 'object') {
                    valueType = [objectInterfaceType.name];
                }
            } else {
                objectInterfaceType.forEach((type) => {
                    valueType.push(type.name || undefined);
                });
            }

            if (typeof objectInterfaceType === 'object' && !Array.isArray(objectInterfaceType)) {
                if (objectInterfaceType.type && !Array.isArray(objectInterfaceType.type)) {
                    valueType = [objectInterfaceType.type.name] || undefined;
                } else if (objectInterfaceType.type) {
                    objectInterfaceType.type.forEach((type) => {
                        valueType.push(type.name || undefined);
                    });
                }
            }
            if (valueType.length > 1) {
                if (valueType.includes((typeof (object)).charAt(0).toUpperCase() + (typeof (object)).slice(1))) {
                    isValidated = true;
                    objectInterface = objectInterface[`${name}`].properties;
                }
            }
        }

        if (!isValidated && typeof object !== 'object') {
            vue.warn(`The "${name}" prop is invalid. Given value type: ${typeof object}. Expected value type: Object.`);

            return false;
        }
        if (typeof object == 'object' && Object.keys(object).length) {
            return ObjectPropertyValidator(name, object, objectInterface);
        }
        return true;
    }
}

export default (name, objectInterface, isRequired = false, isNullable = false) => {
    return {
        validator: object => {
            return ObjectValidator(name, object, objectInterface, isRequired, isNullable);
        }
    }
}

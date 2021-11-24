import Vue from 'vue'
import {ObjectPropertyValidator} from './ObjectValidator';

export const ArrayValidator = (name, arrayOfValues, objectInterface) => {
    let result = true;
    if (!Array.isArray(arrayOfValues)) {
        Vue.util.warn(
            `The "${name}" prop is invalid. Given value type: ${typeof arrayOfValues}. Expected value type: Array.`, true)
        return false;
    }
    arrayOfValues.forEach(function (object) {
        result = ObjectPropertyValidator(name, object, objectInterface);
    });

    return result;
}

export default (name, objectInterface) => {
    return {
        validator: arrayOfValues => {
            return ArrayValidator(name, arrayOfValues, objectInterface);
        }
    }
}

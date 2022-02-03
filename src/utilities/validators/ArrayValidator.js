import Vue from 'vue';
import { ObjectValidator } from './ObjectValidator';

export const ArrayValidator = (name, arrayOfValues, objectInterface, isRequired, isNullable) => {
    let result = true;
    if (!Array.isArray(arrayOfValues)) {
        Vue.util.warn(
            `The "${name}" prop is invalid. Given value type: ${typeof arrayOfValues}. Expected value type: Array.`, true)
        return false;
    }
    arrayOfValues.forEach(function (object) {
        result = ObjectValidator(name, object, objectInterface, isRequired, isNullable);
    });

    return result;
}

export default (name, objectInterface, isRequired = false, isNullable = false) => {
    return {
        validator: arrayOfValues => {
            return ArrayValidator(name, arrayOfValues, objectInterface, isRequired, isNullable);
        }
    }
}

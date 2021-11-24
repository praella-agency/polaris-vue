import Vue from 'vue'
import {ObjectValidator} from "./ObjectValidator";

export const StringValidator = (name, value, expectedValues) => {
    //Check array contains given string or not
    if (expectedValues.indexOf(value) === -1) {
        expectedValues.splice(expectedValues.indexOf(null), 1);
        Vue.util.warn(`The "${name}" prop is invalid. Given value: "${value}". Available options: "${expectedValues.join(', ')}".`, this)
        return false;
    }
    return true;
}

export default (name, expectedValues) => {
    return {
        validator: value => {
           return StringValidator(name, value, expectedValues)
        }
    }
}

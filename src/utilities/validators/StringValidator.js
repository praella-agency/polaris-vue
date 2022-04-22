import utils from '../';
const Vue = require('vue');

export const StringValidator = (name, value, expectedValues) => {
    if (expectedValues.indexOf(value) === -1) {
        if (expectedValues.includes(null)) {
            expectedValues.splice(expectedValues.indexOf(null), 1);
        }
        if (utils.isVue3) {
            Vue.warn(`The "${name}" prop is invalid. Given value: "${value}". Available options: "${expectedValues.join(', ')}".`);
        } else {
            Vue.default.util.warn(`The "${name}" prop is invalid. Given value: "${value}". Available options: "${expectedValues.join(', ')}".`);
        }
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

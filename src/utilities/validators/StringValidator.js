import utils from '../';
import { vue3, vue2 } from '../../ComponentHelpers';

export const StringValidator = (name, value, expectedValues) => {
    if (expectedValues.indexOf(value) === -1) {
        if (expectedValues.includes(null)) {
            expectedValues.splice(expectedValues.indexOf(null), 1);
        }
        if (utils.isVue3) {
            vue3.warn(`The "${name}" prop is invalid. Given value: "${value}". Available options: "${expectedValues.join(', ')}".`);
        } else {
            vue2.default.util.warn(`The "${name}" prop is invalid. Given value: "${value}". Available options: "${expectedValues.join(', ')}".`);
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

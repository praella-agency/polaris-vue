import Vue from 'vue'

export default (name, expectedValues) => {
    return {
        validator: value => {
            if(expectedValues.indexOf(value) === -1) {
                expectedValues.splice(expectedValues.indexOf(null), 1);
                Vue.util.warn(`The "${name}" prop is invalid. Given value: "${value}". Available options: "${expectedValues.join(', ')}".`, this)
                return false;
            }
            return true;
        }
    }
}

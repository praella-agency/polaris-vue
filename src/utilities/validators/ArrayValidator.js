import Vue from 'vue'

export default (name, objectInterface) => {
    return {
        validator: arrayOfValues => {
            let result = true;
            if(!Array.isArray(arrayOfValues)) {
                Vue.util.warn(
                    `The "${name}" prop is invalid. Given value type: ${typeof arrayOfValues}. Expected value type: Array.`, true)
                return false;
            }
            arrayOfValues.forEach(function(object) {
                for(var objectKey in objectInterface) {
                    const objectType = objectInterface[objectKey];
                    let isRequired = false;
                    let valueType = objectType;
                    if(typeof objectType === 'object') {
                        isRequired = objectType.required || false;
                        valueType = objectType.type || undefined;
                    }
                    if(isRequired && !object.hasOwnProperty(objectKey)) {
                        Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" is missing.`, true)
                        result = false;
                    } else if(object.hasOwnProperty(objectKey)) {
                        let objectValue = object[objectKey];
                        if(typeof(objectValue) !== valueType.name.toLowerCase()) {
                            Vue.util.warn(`The "${name}" prop is invalid. Expected object key "${objectKey}" value type to be "${valueType.name.toLowerCase()}", got "${typeof objectValue}".`, true)
                            result = false;
                        }
                    }
                }
            });
            return result;
        }
    }
}

const requireComponent = require.context('../../src/components', true, /\.vue$/);

const components = {};

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName
        .replace(/^.\/.*\//, '')
        .replace(/\.\w+$/, '');

    components[componentName] = componentConfig.default || componentConfig;
});

export default components;

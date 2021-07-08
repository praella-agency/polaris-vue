const requireFiles = require.context(
    './newImages', true, /\.ts$/
);

requireFiles.keys().forEach(fileName => {
    const componentConfig = requireFiles(fileName)
    console.log(componentConfig)
    // const componentName = upperFirst(
    //   camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    // );
    // Vue.component(componentName, componentConfig.default || componentConfig)
});

export default new Promise(async $export => {
  // await anything that needs to be imported
  // await anything that asynchronous
  // finally export the module resolving the Promise
  // as object, function, class, ... anything
  $export(
      {module: 'object'} ||
      function () {}     ||
      class Anything {}
  );
});
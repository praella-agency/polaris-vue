const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
    [
        '@babel/preset-env',
        // '@vue/cli-plugin-babel/preset',
        // '@vue/babel-preset-jsx',
        // Config for @babel/preset-env
        {
            // Example: Always transpile optional chaining/nullish coalescing
            // include: [
            //   /(optional-chaining|nullish-coalescing)/
            // ],
        },
    ],
];
module.exports = {
    presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};

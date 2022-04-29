const path = require('path');

module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    "addons": [
        "@storybook/addon-links",
        {
            name: '@storybook/addon-essentials',
            options: {
                actions: false,
            },
        },
        "@storybook/addon-actions",
    ],
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.
        console.log('path.resolve(`./node_modules/vue`)');
        console.log(path.resolve(`./node_modules/vue`));
        console.log('path.resolve(`./node_modules/vue`)');
        // Make whatever fine-grained changes you need
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });
        config.resolve = {
            symlinks: false,
            alias: {
                vue: path.resolve(`./node_modules/vue`),
            }
        };

        // Return the altered config
        return config;
    },
    "framework": "@storybook/vue3"
}

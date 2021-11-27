module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.js",
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
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "vue-loader",
      options: { appendTsSuffixTo: [/\.vue$/] },
    });
    config.resolve.plugins = config.resolve.plugins || [];
    return config;
  },
}

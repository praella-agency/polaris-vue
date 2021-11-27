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
}

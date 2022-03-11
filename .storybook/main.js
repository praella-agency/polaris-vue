module.exports = {
    "stories": [
        "../src/stories/*.stories.mdx",
        "../src/stories/*.stories.@(js|jsx|ts|tsx)",
        "../src/components/PBadge/*.stories.@(js|jsx|ts|tsx)",
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
    "framework": "@storybook/vue3"
}

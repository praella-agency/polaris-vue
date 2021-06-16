import { addons } from "@storybook/addons";
import { create } from '@storybook/theming';

const theme = create({
    base: 'light',

    brandTitle: 'Polaris Vue by HulkApps',
    brandUrl: 'https://polaris-vue.hulkapps.dev',
    brandImage: 'logo.svg',
    appBg: 'white',
    appContentBg: 'white',
});

addons.setConfig({
    theme: theme,
    panelPosition: "right",
    isToolshown: true,
    sidebar: {
        showRoots: false,
    },
});
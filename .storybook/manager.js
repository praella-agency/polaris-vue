import { addons } from "@storybook/addons";
import { create } from '@storybook/theming';

const theme = create({
    base: 'light',

    brandTitle: 'Polaris Vue by HulkApps',
    brandUrl: 'https://polaris-vue.hulkapps.dev',
    brandImage: 'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
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

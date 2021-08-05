import { addons } from "@storybook/addons";
import { create } from '@storybook/theming';
import '!style-loader!css-loader!sass-loader!./styles/manager.scss';

const theme = create({
    base: 'light',

    barSelectedColor: '#00a9a2',

    brandTitle: 'Polaris Vue by HulkApps',
    brandUrl: 'https://www.github.com/hulkapps/polaris-vue',
    brandImage: '/logo.png',
    appBg: 'white',
    appContentBg: 'white',
});

addons.setConfig({
    previewTabs: {
        'canvas': {title: 'Preview'}
    },
    theme: theme,
    panelPosition: "right",
    isToolshown: true,
    sidebar: {
        showRoots: false,
    },
});

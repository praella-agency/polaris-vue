window.isVue3 = true;
import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import '!style-loader!css-loader!sass-loader!./styles/docs.scss';
import { app } from '@storybook/vue3';
const PToast = require('../src/components/PToast');
const PLoading = require('../src/components/PLoading');
const PTooltip = require('../src/components/PTooltip');
const PTooltipComponent = require('../src/components/PTooltip/PTooltip.vue');
const PClickOutSide = require('../src/components/PClickOutSide');

app.use(PToast.default);
app.use(PLoading.default);
app.component('PTooltip', PTooltipComponent);
app.directive('p-tooltip', PTooltip.directives(app));
app.directive('p-click-outside', PClickOutSide.ClickOutSideDirective(app));

export const decorators = [(story) => ({
    components: {story},
    template: '<story/>',
})];

export const parameters = {
    viewMode: 'docs',
    actions: {
        disable: true,
    },
    controls: {
        matchers: {
            color: /(background|color|backgroundColor)$/i,
            date: /Date$/,
        },
        sort: 'alpha',
    },
    options: {
        showPanel: true,
        panelPosition: "right",
        storySort: {
            method: "alphabetical",
            order: [
                "Introduction",
                "Changelog",
                "Actions",
                "Structure",
                "Forms",
                "Images & Icons",
                "Feedback indicators",
                "Titles & Text",
                "Behavior",
                "Lists & Tables",
                "Navigation",
                "Overlays",
                "Data visualizations",
            ]
        }
    },
}

import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import '!style-loader!css-loader!sass-loader!./styles/docs.scss';
import { app } from '@storybook/vue3';
import PToast from '../src/components/PToast';
import PLoading from '../src/components/PLoading';
import { directives } from '../src/components/PTooltip';
import PTooltip from '../src/components/PTooltip/PTooltip.vue';
import { ClickOutSideDirective } from '../src/components/PClickOutSide';

app.use(PToast);
app.use(PLoading);
app.component('PTooltip', PTooltip);
app.directive('p-tooltip', directives(app));
app.directive('p-click-outside', ClickOutSideDirective(app));

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

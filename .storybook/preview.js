import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import '!style-loader!css-loader!sass-loader!./styles/docs.scss';
// import Vue from 'vue';
import VueRouter from 'storybook-vue3-router'
// import PToast from '../src/components/PToast';
// import pLoading from '../src/components/PLoading';
import { directives } from '../src/components/PTooltip';
import PTooltip from '../src/components/PTooltip/PTooltip.vue';

// Vue.use(VueRouter);
// Vue.component('router-link', Vue.component('RouterLink'));

// Vue.use(PToast);
// Vue.use(pLoading);
app.component('PTooltip', PTooltip);
app.directive('p-tooltip', directives(app));

export const decorators = [(story) => ({
    components: {story},
    template: '<story />',
    router: new VueRouter()
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

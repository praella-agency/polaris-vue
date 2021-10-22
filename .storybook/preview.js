import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import '!style-loader!css-loader!sass-loader!./styles/docs.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import PToast from '../src/components/PToast/index';
import { PTooltip } from '../src/components/PTooltip/';

Vue.use(VueRouter);
Vue.component('router-link', Vue.component('RouterLink'));

Vue.use(PToast);
Vue.use(PTooltip);

export const decorators = [(story) => ({
  components: {story},
  template: '<story />',
  router: new VueRouter()
})];

export const parameters = {
  viewMode: 'docs',
  actions: { disable: true },
  controls: {
    matchers: {
      color: /(background|color|backgroundColor)$/i,
      date: /Date$/,
    },
    sort: 'alpha',
  },
  options: {
    showPanel: true,
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
        "Lists & Tables",
        "Navigation",
        "Overlays",
      ]
    }
  },
}

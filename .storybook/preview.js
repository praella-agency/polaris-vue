import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import '!style-loader!css-loader!sass-loader!./styles/docs.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import PToast from '../src/components/PToast/index';

Vue.use(VueRouter);
Vue.component('router-link', Vue.component('RouterLink'));

Vue.use(PToast);

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
        "Behaviour",
        "Lists & Tables",
        "Navigation",
        "Overlays",
      ]
    }
  },
}

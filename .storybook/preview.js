import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import '!style-loader!css-loader!sass-loader!./styles/docs.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.component('router-link', Vue.component('RouterLink'));

export const decorators = [(story) => ({
  components: {story},
  template: '<story />',
  router: new VueRouter()
})];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color|backgroundColor)$/i,
      date: /Date$/,
    },
    sort: 'alpha',
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Introduction",
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

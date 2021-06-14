import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color|backgroundColor)$/i,
      date: /Date$/,
    },
  },
}

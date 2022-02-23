import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { vuePlugin } from '@vitebook/vue/node';
import { defaultThemePlugin } from '@vitebook/theme-default/node';

export default defineConfig({
  include: ['src/components/**/*.story.vue'],
  plugins: [
    vuePlugin({ appFile: 'App.vue' }),  
    clientPlugin(),
    defaultThemePlugin(),
  ],
  site: {
    title: '@hulkapps/polaris-vue',
    description: '',
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {},
  },
});

import PSearch from './PSearch.vue';

export default {
    title: 'Structure / Search',
    component: PSearch,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PSearch },
    template: `
      <PSearch
          v-bind="$props"
      >
      </PSearch>
    `,
});

export const Search = Template.bind({});

Search.args = {

}

import PMenu from './PMenu.vue';

export default {
    title: 'Structure / Menu',
    component: PMenu,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PMenu },
    template: `
      <PMenu
          v-bind="$props"
      >
      </PMenu>
    `,
});

export const Menu = Template.bind({});

Menu.args = {

}

import PUserMenu from './PUserMenu.vue';

export default {
    title: 'Structure / UserMenu',
    component: PUserMenu,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PUserMenu
    },
    data() {
        return {
            isOpen: false,
        };
    },
    template: `
      <PUserMenu
          v-bind="$props"
          :open="isOpen"
          :on-toggle="handleToggle"
      >
      </PUserMenu>
    `,
    methods: {
        handleToggle() {
            this.isOpen = !this.isOpen;
        }
    }
});

export const UserMenu = Template.bind({});

UserMenu.args = {
    name: "Anil",
    detail: "PHP Developer",
}

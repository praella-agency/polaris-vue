import PUserMenu from './PUserMenu.vue';

export default {
    title: 'Structure / UserMenu',
    component: PUserMenu,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PUserMenu },
    template: `
<PUserMenu
    v-bind="$props"
>
</PUserMenu>
`,
});

export const UserMenu = Template.bind({});

UserMenu.args = {
    name: "Anil",
    detail: "PHP Developer"
}

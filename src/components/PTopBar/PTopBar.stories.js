import PTopBar from './PTopBar.vue';


export default {
    title: 'Structure / PTopBar',
    component: PTopBar,
    parameters: {
        layout: 'fullscreen',
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PTopBar },
    template: `<PTopBar v-bind="$props"/>`,
});

export const TopBar = Template.bind({});

TopBar.args = {
    onNavigationToggle: function () {
        alert('toggled');
    },
}

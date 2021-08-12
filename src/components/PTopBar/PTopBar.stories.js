import PTopBar from './PTopBar.vue';
import {PSearchField} from "./components/PSearchField";

export default {
    title: 'Structure / PTopBar',
    component: PTopBar,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PTopBar, PSearchField },
    template: `
      <PTopBar v-bind="$props">
      <PSearchField slot="searchField"></PSearchField>
      </PTopBar>`,
});

export const TopBar = Template.bind({});

TopBar.args = {
    onNavigationToggle: function () {
        alert('toggled');
    },
}

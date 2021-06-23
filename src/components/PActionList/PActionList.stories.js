import PActionList from './PActionList';

export default {
    title: 'Actions / Action List',
    component: PActionList,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PActionList,
    },
    template: `
        <PActionList v-bind="$props"></PActionList>`,
});

export const ActionList = Template.bind({});

ActionList.args = {
    items: [
        {
            content: 'Action 1',
            onAction: () => {
                alert('Action 1 handled');
            },
        },
        {
            content: 'Action 2',
            onAction: () => {
                alert('Action 2 handled');
            },
        },
    ],
    sections: [],
}

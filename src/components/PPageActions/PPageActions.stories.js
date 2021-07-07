import PPageActions from './PPageActions';

export default {
    title: 'Structure / Page Actions',
    component: PPageActions,
    parameters: {
        layout: 'fullscreen',
    }
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PPageActions,
    },
    template: `
        <PPageActions 
            v-bind="$props" 
        />`,
});

export const PageActions = Template.bind({});

PageActions.args = {
    primaryAction: {
        content: 'Save',
        onAction: () => {
            alert('Saved');
        },
    },
    secondaryAction: {
        content: 'Add',
        onAction: () => {
            alert('Added');
        },
    },
    secondaryActions: [{
        content: 'Delete',
        destructive: true,
        onAction: () => {
            alert('Deleted')
        }
        },
    ],
}

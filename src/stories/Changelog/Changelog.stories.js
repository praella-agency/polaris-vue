import Release from './Changelog';

export default {
    title: 'Changelog',
    component: Release,
    parameters: {
        options: {
            showPanel: false,
        },
        controls: {
            disable: true,
        },
        actions: {
            disable: true,
        },
        viewMode: 'story',
        previewTabs: {
            'storybook/docs/panel': {
                hidden: true,
            },
        },
    },
}

const Template = () => ({
    components: {
        Release,
    },
    template: `
        <Release />`,
});

export const Changelog = Template.bind({});

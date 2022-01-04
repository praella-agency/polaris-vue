import ColorsPalette from './ColorPalette';

export default {
    title: 'Colors',
    component: ColorsPalette,
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
            'canvas': {
                title: 'Docs',
            },
            'storybook/docs/panel': {
                hidden: true,
            },
        },
    },
}

const Template = () => ({
    components: {
        ColorsPalette,
    },
    template: `
        <ColorsPalette />`,
});

export const Colors = Template.bind({});

import { PAvatar } from './index';

export default {
    title: 'Images & Icons / Avatar',
    component: PAvatar,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PAvatar,
    },
    template: `
        <PAvatar v-bind="args"></PAvatar>`,
});

export const Avatar = Template.bind({});

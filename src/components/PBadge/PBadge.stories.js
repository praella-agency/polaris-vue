import PBadge from './PBadge';

export default {
    title: 'Images & Icons / Badge',
    component: PBadge,
    argTypes: {
        size: {
            options: ['small', 'medium'],
            control: {
                type: 'select',
            },
        },
        progress: {
            options: ['incomplete', 'partiallyComplete', 'complete', null],
            control: {
                type: 'select',
                labels: {
                    null: 'Default',
                },
            },
        },
        status: {
            options: ['success', 'info', 'attention', 'warning', 'new', 'critical', null],
            control: {
                type: 'select',
                labels: {
                    null: 'Default',
                },
            },
        },
        default: {
            table: {
                disable: true,
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PBadge,
    },
    template: `
        <PBadge v-bind="$props">Default Badge</PBadge>`,
});

export const Badge = Template.bind({});


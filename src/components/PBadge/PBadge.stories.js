import { PBadge } from './index';

export default {
    title: 'Images & Icons / Badge',
    component: PBadge,
    parameters: {
        layout: 'centered',
    },
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
                    null: 'default',
                },
            },
        },
        status: {
            options: ['success', 'info', 'attention', 'warning', 'new', 'critical', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    components: {
        PBadge,
    },
    setup() {
        return {args};
    },
    template: `
        <PBadge v-bind="args">Default Badge</PBadge>`,
});

export const Badge = Template.bind({});

import { PTextStyle } from './index';

export default {
    title: 'Titles & Text / Text Style',
    component: PTextStyle,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
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
        variation: {
            options: ['positive', 'negative', 'strong', 'subdued', 'code', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PTextStyle,
    },
    template: `
        <PTextStyle
            v-bind="args"
        >
            No supplier listed
        </PTextStyle>`,
});

export const TextStyle = Template.bind({});

TextStyle.parameters= {
    docs: {
        source: {
            code: `<PTextStyle>No supplier listed</PTextStyle>`
        },
    },
};

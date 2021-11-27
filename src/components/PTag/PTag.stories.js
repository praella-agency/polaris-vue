import { PTag } from './index';

export default {
    title: 'Forms / Tag',
    component: PTag,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        tag: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    value: string,
    key: string,
}`,
                },
            },
        },
        'remove-tag': {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(key)',
                },
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PTag,
    },
    template: `
        <PTag 
            v-bind="$props"
        ></PTag>`,
});

export const Tag = Template.bind({});

Tag.args = {
    tag: {
        value: 'Test',
        key: 'test',
    },
}

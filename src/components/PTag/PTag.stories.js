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
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PTag,
    },
    template: `
        <PTag
            v-bind="args"
        ></PTag>`,
});

export const Tag = Template.bind({});

Tag.args = {
    tag: {
        value: 'Test',
        key: 'test',
    },
}

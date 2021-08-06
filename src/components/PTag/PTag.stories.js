import PTag from './PTag';

export default {
    title: 'Forms / Tag',
    component: PTag,
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

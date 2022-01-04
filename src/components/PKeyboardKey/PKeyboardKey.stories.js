import { PKeyboardKey } from './index';

export default {
    title: 'Images & Icons / Keyboard Key',
    component: PKeyboardKey,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        default: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PKeyboardKey,
    },
    template: `
        <PKeyboardKey>ctrl</PKeyboardKey>
    `,
});

export const KeyboardKey = Template.bind({});

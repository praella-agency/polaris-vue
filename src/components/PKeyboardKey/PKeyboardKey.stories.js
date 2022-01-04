import { PKeyboardKey } from './index';

export default {
    title: 'Keyboard Key',
    component: PKeyboardKey,
    argTypes: {
        default: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: null,
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

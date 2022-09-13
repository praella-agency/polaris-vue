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

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PKeyboardKey,
    },
    template: `
        <PKeyboardKey>ctrl</PKeyboardKey>
    `,
});

export const KeyboardKey = Template.bind({});

KeyboardKey.parameters = {
    docs: {
        source: {
            code: `<PKeyboardKey>ctrl</PKeyboardKey>`
        },
    },
};
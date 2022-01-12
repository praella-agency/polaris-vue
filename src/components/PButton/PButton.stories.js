import { PButton } from './index';

export default {
    title: 'Actions / Button',
    component: PButton,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        disclosure: {
            options: ['up', 'down', false,],
            control: {
                type: 'select',
                labels: {
                    false: 'default',
                },
            },
        },
        size: {
            options: ['slim', 'medium', 'large', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
        textAlign: {
            options: ['left', 'right', 'center', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                }
            },
        },
        type: {
            options: ['submit', 'button', 'reset', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                }
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
        blur: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
            control: {
                type: null,
            },
        },
        click: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
            control: {
                type: null,
            },
        },
        focus: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
            control: {
                type: null,
            },
        },
        keydown: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
            control: {
                type: null,
            },
        },
        keypress: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
            control: {
                type: null,
            },
        },
        keyup: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PButton,
    },
    template: `
        <PButton v-bind="$props" @click="handleButtonEvent('click')">
            Button
        </PButton>`,
    methods: {
        handleButtonEvent(event) {
            console.log('Triggered ' + event + ' event');
        },
    },
});

export const BaseButton = Template.bind({});

const Template1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PButton,
    },
    template: `
        <PButton
            v-bind="$props"
            primary
            :connectedDisclosure="{
                accessibility: 'Other',
                actions: [
                    {
                        content: 'Save as draft',
                        onAction: handleAction
                    },
                    {
                        content: 'Delete',
                        onAction: handleAction
                    },
                ]
            }"
            @click="handleButtonEvent('click')"
        >
            Button
        </PButton>`,
    methods: {
        handleButtonEvent(event) {
            console.log('Triggered ' + event + ' event');
        },
        handleAction() {
            console.log('Connected Disclosure triggered');
        }
    },
});

export const SplitButton = Template1.bind({});

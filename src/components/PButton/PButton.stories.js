import { PButton } from './index.js';

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
        },
        blur: {
            table: {
                type: {
                    summary: null,
                },
            },
            defaultValue: {
                summary: '()',
                detail: '(event)',
            },
        },
        click: {
            table: {
                type: {
                    summary: null,
                },
            },
            defaultValue: {
                summary: '()',
                detail: '(event)',
            },
        },
        focus: {
            table: {
                type: {
                    summary: null,
                },
            },
            defaultValue: {
                summary: '()',
                detail: '(event)',
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
          alert('Triggered ' + event + ' event');
      },
    },
});

export const Button = Template.bind({});

import PButton from './PButton';
import StoryRouter from "storybook-vue-router";

export default {
    title: 'Actions / Button',
    decorators: [StoryRouter()],
    component: PButton,
    argTypes: {
        disclosure: {
            options: ['up', 'down', false,],
            control: {
                type: 'select',
                labels: {
                    false: 'Default',
                },
            },
        },
        size: {
            options: ['slim', 'medium', 'large', null],
            control: {
                type: 'select',
                labels: {
                    null: 'Default',
                },
            },
        },
        textAlign: {
            options: ['left', 'right', 'center', null],
            control: {
                type: 'select',
                labels: {
                    null: 'Default',
                }
            },
        },
        type: {
            options: ['submit', 'button', 'reset', null],
            control: {
                type: 'select',
                labels: {
                    null: 'Default',
                }
            },
        },
        default: {
            table: {
                disable: true,
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

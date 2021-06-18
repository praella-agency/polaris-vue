import PButton from './PButton';

export default {
    title: 'Actions / Button',
    component: PButton,
    argTypes: {
        disclosure: {
            options: ['up', 'down', false,],
            control: {
                type: 'select',
            },
        },
        size: {
            options: ['slim', 'medium', 'large', null],
            control: {
                type: 'select',
            },
        },
        textAlign: {
            options: ['left', 'right', 'center', null],
            control: {
                type: 'select',
            },
        },
        type: {
            options: ['submit', 'button', 'reset', null],
            control: {
                type: 'select',
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
      <PButton v-bind="$props" vTooltip="'This is example button'" @click="handleButtonEvent('click')">
        Button
      </PButton>`,
    methods: {
      handleButtonEvent(event) {
          alert('Triggered ' + event + ' event');
      },
    },
});

export const Button = Template.bind({});

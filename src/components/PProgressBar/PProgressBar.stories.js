import PProgressBar from './PProgressBar';

export default {
    title: 'Feedback indicators / Progress Bar',
    component: PProgressBar,
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PProgressBar,
    },
    template: `
      <PProgressBar
          v-bind="$props"
      />`,
});

export const ProgressBar = Template.bind({});

ProgressBar.args = {
    progress: 30,
}

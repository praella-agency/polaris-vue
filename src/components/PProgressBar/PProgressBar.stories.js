import { PProgressBar } from './index';

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

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PProgressBar,
    },
    template: `
        <PProgressBar
            v-bind="args"
        />`,
});

export const ProgressBar = Template.bind({});

ProgressBar.args = {
    progress: 30,
}

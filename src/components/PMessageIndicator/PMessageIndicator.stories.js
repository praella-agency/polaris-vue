import PMessageIndicator from './PMessageIndicator';

export default {
    title: 'Feedback Indicators / Message Indicator',
    component: PMessageIndicator,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PMessageIndicator,
    },
    template: `
      <PMessageIndicator v-bind="$props">
        Test Message
      </PMessageIndicator>`,
});

export const MessageIndicator = Template.bind({});

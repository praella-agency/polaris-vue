import PMessage from './PMessage.vue';

export default {
    title: 'Structure / Message',
    component: PMessage,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PMessage },
    template: `<PMessage v-bind="$props" />`,
});

export const Message = Template.bind({});

Message.args = {
    title: "This is title",
    description: "This is Description",
    link: {to: '/', content: 'home'},
    badge: {
      status: "success",
      content: "success"
    },
    action: {
        onAction: () => {
            alert('Button clicked')
        },
        content: 'click me',
    },
}

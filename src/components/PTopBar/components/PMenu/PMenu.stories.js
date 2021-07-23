import PMenu from './PMenu.vue';

export default {
    title: 'Structure / Menu',
    component: PMenu,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PMenu },
    template: `
      <PMenu
          v-bind="$props"
      >
      </PMenu>
    `,
});

export const Menu = Template.bind({});

Menu.args = {
    items: [
        {
            content: 'Action 1',
            onAction: () => {
                alert('Action 1 handled');
            },
        },
        {
            content: 'Action 2',
            onAction: () => {
                alert('Action 2 handled');
            },
        },
    ],
    message: {
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
    },
    onClose: () => {console.log('closed')},
    onOpen: () => {console.log('open')},
}

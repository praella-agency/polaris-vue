import PMessage from './PMessage.vue';
import {PBadge} from "../../../../../PBadge";

export default {
    title: 'Structure / Message',
    component: PMessage,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PMessage, PBadge },
    template: `
      <PMessage 
          v-bind="$props"
      >
        <PBadge status="success">
          Default Badge
        </PBadge>
      </PMessage>
    `,
});

export const Message = Template.bind({});

Message.args = {
    title: "This is title",
    description: "This is Description",
    link: {to: '/', content: 'home'},
    action: {
        onAction: () => {
            alert('Button clicked')
        },
        content: 'click me',
    },
}

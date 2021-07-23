import PMessageIndicator from './PMessageIndicator';
import {PAvatar} from "../PAvatar";

export default {
    title: 'Feedback Indicators / Message Indicator',
    component: PMessageIndicator,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PMessageIndicator, PAvatar,
    },
    data () {
      return {
          initials: "A",
      }
    },
    template: `
      <div>
      <PMessageIndicator v-bind="$props">
      <PAvatar
          size="small"
          :initials="initials && initials.replace(' ', '')"
      />
      </PMessageIndicator>
      <span class="Polaris-TopBar-UserMenu__Details">
        <p class="Polaris-TopBar-UserMenu__Name">Anil</p>
        <p class="Polaris-TopBar-UserMenu__Detail">PHP web developer</p>
      </span>
      </div>`,
});

export const MessageIndicator = Template.bind({});

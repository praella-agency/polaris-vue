import PSettingToggle from './PSettingToggle';
import { PTextStyle } from '../PTextStyle';

export default {
    title: 'Actions / Setting Toggle',
    component: PSettingToggle,
    argTypes: {
        default: {
            table: {
                disable: true,
            },
        },
        action: {
            control: {
                type: 'object',
                readonly: true
            },
            defaultValue: {
                contentStatus: 'Deactivate',
                onAction: () => {
                    alert('Action Triggered!');
                },
            },
        }
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSettingToggle, PTextStyle,
    },
    template: `  
      <PSettingToggle
          :action="{
            contentStatus: enabled ? 'Deactivate' : 'Activate',
            onAction: toggleStatus,
          }"
          :enabled="enabled"
          v-bind="$props"
      >
        This setting is <PTextStyle variation="strong">{{ enabled ? 'activated' : 'deactivated' }}</PTextStyle>
      </PSettingToggle>`,
    methods: {
        toggleStatus() {
            alert('Action Triggered!');
        },
    },
});

export const SettingToggle = Template.bind({});
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
                type: 'object'
            },
            defaultValue: {
                contentStatus: status ? 'Deactivate' : 'Activate',
                onAction: () => {
                    this.status = !this.status;
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
    data() {
        return {
            status: false,
        };
    },
    template: `  
      <PSettingToggle
          :action="{
            contentStatus: status ? 'Deactivate' : 'Activate',
            onAction: toggleStatus,
          }"
          :enabled="status"
          v-bind="$props"
      >
        This setting is <PTextStyle variation="strong">{{ status ? 'activated' : 'deactivated' }}</PTextStyle>
      </PSettingToggle>`,
    methods: {
        toggleStatus() {
            this.status = !this.status;
        },
    },
});

export const SettingToggle = Template.bind({});

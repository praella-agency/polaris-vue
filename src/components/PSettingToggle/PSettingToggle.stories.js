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
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Display the content */
    contentStatus?: string,
    /** Url for the element */
    url?: string,
    /** Disable the element */
    disabled?: boolean,
    /** Accessibility Label for the element */
    accessibilityLabel?: string,
    /** Destructive element */
    destructive?: boolean,
    /** Add Icon support */
    icon?: string,
    /** Callback when an action takes place */
    onAction?(): void,
}`
                },
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSettingToggle, PTextStyle,
    },
    data() {
        return {
            enable: false,
        }
    },
    template: `  
      <PSettingToggle
          :action="{
            contentStatus: enable ? 'Deactivate' : 'Activate',
            onAction: toggleStatus,
          }"
          :enabled="enable"
          v-bind="$props"
      >
        This setting is <PTextStyle variation="strong">{{ enable ? 'activated' : 'deactivated' }}</PTextStyle>
      </PSettingToggle>`,
    methods: {
        toggleStatus() {
            this.enable = !this.enable;
        },
    },
});

export const SettingToggle = Template.bind({});
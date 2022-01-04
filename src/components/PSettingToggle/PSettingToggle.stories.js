import { PSettingToggle } from './index';
import { PTextStyle } from '../PTextStyle';

export default {
    title: 'Actions / Setting Toggle',
    component: PSettingToggle,
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        action: {
            control: {
                type: 'object',
                readonly: true
            },
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{    
    /** Accessibility Label for the element */
    accessibilityLabel?: string,
    /** Destructive element */
    destructive?: boolean,
    /** Disable the element */
    disabled?: boolean,
    /** Forces url to open in a new tab */
    external?: boolean,
    /** Add Icon support */
    icon?: string,
    /** A unique identifier for the action */
    id?: string | number,
    /** Should a spinner be displayed */
    loading?: boolean,
    /** Should action be displayed as an outlined button */
    outline?: boolean,
    /** Url for the element */
    url?: string,
    /** Display the content */
    contentStatus?: string,

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
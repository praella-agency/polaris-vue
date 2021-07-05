import PToast from './PToast';
import { PButton } from "../../PButton";

export default {
    title: 'Feedback indicators / Toast',
    component: PToast,
    argTypes: {
        position: {
            options: ['bottom-right', 'top-right', 'top', 'top-left', 'bottom', 'bottom-left'],
            control: {
                type: 'select',
            },
        },
        type: {
            options: ['success', 'info', 'warning', 'error', 'default'],
            control: {
                type: 'select',
            },
        },
        onClick: {
            control: {
                type: null,
            },
        },
        onDismiss: {
            control: {
                type: null,
            },
        },
    },
    parameters: {
        docs: {
            source: {
                type: 'code'
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PToast, PButton,
    },
    template: `
        <div>
            <PButton @click="showToast">Toast</PButton>
            <PToast ref="toast"
                v-bind="$props"
            ></PToast>
        </div>`,
    methods: {
        showToast() {
            this.$refs.toast.$el.click();
        },
    },
})

export const Toast = Template.bind({});

Toast.args = {
    message: 'Hello',
    position: 'bottom-left'
}

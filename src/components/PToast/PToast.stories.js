import PToast from './components/PToast';
import PToastMDX from './PToast.mdx';
import { PButton } from "../PButton";

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
        error: {
            control: {
                type: 'boolean',
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
            page: PToastMDX,
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
            <PButton @click="showToast($props)">Toast</PButton>
        </div>`,
    methods: {
        showToast(props) {
            this.$pToast.open(props);
        },
    },
})

export const Toast = Template.bind({});

Toast.args = {
    message: 'Hello World!',
}

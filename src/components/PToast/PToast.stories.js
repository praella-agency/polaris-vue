import PToastMDX from './PToast.mdx';
import {PButton} from "../PButton";

export default {
    title: 'Feedback indicators / Toast',
    argTypes: {
        position: {
            options: ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'],
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
        actions: {
            disable: false,
            argTypesRegex: "^on[A-Z].*",
        },
        layout: 'centered',
    },

}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PButton,
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

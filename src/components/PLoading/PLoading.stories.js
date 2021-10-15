import { PFrame } from '../PFrame';
import { PButton } from '../PButton';

export default {
    title: 'Loading Bar',
    parameters: {
        layout: 'fullscreen',
        docs: {
            inlineStories: false,
            iframeHeight: 600,
        },
    },
}

const Template = (args, {argTypes}) => ({
    components: {
        PFrame, PButton,
    },
    template: `
        <PFrame>
            <PButton @click="start">Start</PButton>
        </PFrame>`,
    methods: {
        start() {
            this.$pLoading.start();
        },
    },
});

export const LoadingBar = Template.bind({});

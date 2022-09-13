import { PPage } from '../PPage';
import { PButton } from '../PButton';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import PLoadingMDX from './PLoading.mdx';

export default {
    title: 'Feedback indicators / Loading',
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: PLoadingMDX,
            inlineStories: false,
            iframeHeight: 600,
        },
        options: {
            showPanel: false,
        },
        controls: {
            disable: true,
        },
        actions: {
            disable: true,
        },
    },
}

const Template = (args) => ({
    components: {
        PPage, PButton, PStack, PStackItem,
    },
    template: `
        <PPage narrow-width>
            <PStack>
                <PStackItem>
                    <PButton @click="start" primary>Start</PButton>
                </PStackItem>
                <PStackItem>
                    <PButton @click="increase">Increase</PButton>
                </PStackItem>
                <PStackItem>
                    <PButton @click="decrease">Decrease</PButton>
                </PStackItem>
                <PStackItem>
                    <PButton @click="finish">Finish</PButton>
                </PStackItem>
                <PStackItem>
                    <PButton @click="hide">Hide</PButton>
                </PStackItem>
                <PStackItem>
                    <PButton @click="fail" destructive>Fail</PButton>
                </PStackItem>
            </PStack>
        </PPage>`,
    methods: {
        start() {
            this.$pLoading.start();
        },
        finish() {
            this.$pLoading.finish();
        },
        hide() {
            this.$pLoading.hide();
        },
        fail() {
            this.$pLoading.fail();
        },
        increase() {
            this.$pLoading.increase(10);
        },
        decrease() {
            this.$pLoading.decrease(10);
        },
    },
});

export const Loading = Template.bind({});

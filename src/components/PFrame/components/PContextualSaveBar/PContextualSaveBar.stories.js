import { PContextualSaveBar } from './index';
import { PFrame } from '../../../PFrame';

export default {
    title: 'Forms / Contextual Save Bar',
    component: PContextualSaveBar,
    parameters: {
        layout: 'fullscreen',
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PContextualSaveBar, PFrame,
    },
    template: `
      <PFrame>
        <PContextualSaveBar
            v-bind="$props"
            :saveAction="{
              onAction: handleSaveAction,
              loading: false,
              disabled: false,
            }"
            :discardAction="{
              onAction: handleDiscardAction,
            }"
        />
      </PFrame>`,
    methods: {
        handleSaveAction() {
            console.log('add form submit logic');
        },
        handleDiscardAction() {
            console.log('add clear form logic');
        }
    }
});

export const ContextualSaveBar = Template.bind({});

ContextualSaveBar.args = {
    message: 'Unsaved changes',
    logo: {
        width: 124,
        contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    },
}

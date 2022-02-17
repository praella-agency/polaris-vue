import { PModal } from './index';
import { PFormLayout } from '../PFormLayout';
import { PTextField } from '../PTextField';
import { PBanner } from '../PBanner';
import { PButton } from '../PButton';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';

export default {
    title: 'Overlays / Modal',
    component: PModal,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 570,
        },
    },
    argTypes: {
        primaryAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail:`{
    /** Content the action displays */
    content?: string,
    /** Disable the element */
    disabled?: boolean,
    /** Destructive the element */
    destructive?: boolean,
    /** Callback when an action takes place */
    onAction?(): void,
}`,
                },
            },
        },
        secondaryActions: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail:`[{
    /** Content the action displays */
    content?: string,
    /** Disable the element */
    disabled?: boolean,
    /** Destructive the element */
    destructive?: boolean,
    /** Callback when an action takes place */
    onAction?(): void,
}]`,
                },
            },
        },
        close: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
            control: {
                type: null,
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        footer: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        title: {
            description: `**Props**: The content for the title of modal.
                \n**Slots**: Customize title.`,
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            },
        }
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PModal, PFormLayout, PTextField, PBanner, PButton, PStack, PStackItem,
    },
    data() {
        return {
            is_active: false,
        };
    },
    template: `
      <PStack>
          <PStackItem>
              <PModal 
                  v-bind="$props"
                  @close="closeModal"
                  :open="this.is_active"
              >
                  <PFormLayout>
                      <PTextField label="First Name"/>
                      <PTextField label="Last Name Name"/>
                      <PTextField label="Email" type="email"/>
                  </PFormLayout>
              </PModal>
          </PStackItem>
          <PStackItem>
              <PButton @click="openModal">Open Modal</PButton>
          </PStackItem>
      </PStack>`,
    methods: {
        openModal() {
            this.is_active = true;
        },
        closeModal() {
            this.is_active = false;
        },
    },
});

export const Modal = Template.bind({});

Modal.args = {
    primaryAction: {
        content: 'Save Customer',
        onAction: () => {
            alert('Customer saved');
        },
    },
    secondaryActions: [
        {
            content: 'Delete Customer',
            destructive: true,
            onAction: () => {
                alert('Customer deleted');
            },
        },
        {
            content: 'Cancel',
            onAction: () => {
                alert('Cancel Modal')
            },
        },
    ],
    title: "Enter Customer Details",
    sectioned: true,
}

Modal.parameters = {
    docs: {
        source: {
            code: `
<template>
  <PStack>
    <PStackItem>
      <PModal
        :open="false"
        sectioned
        :primaryAction='{"content":"Save Customer"}'
        :secondaryActions='[{"content":"Delete Customer","destructive":true},{"content":"Cancel"}]'
        title="Enter Customer Details"
      >
        <PFormLayout>
          <PTextField label="First Name" />
          <PTextField label="Last Name Name" />
          <PTextField label="Email" type="email" />
        </PFormLayout>
      </PModal>
    </PStackItem>
    <PStackItem><PButton>Open Modal</PButton></PStackItem>
  </PStack>
</template>`,
        },
    },
}

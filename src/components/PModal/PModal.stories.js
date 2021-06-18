import PModal from './PModal';
import { PFormLayout } from '../PFormLayout';
import { PTextField } from '../PTextField';
import { PBanner } from '../PBanner';
import { PButton } from '../PButton';

export default {
    title: 'Overlays / Modal',
    component: PModal,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PModal, PFormLayout, PTextField, PBanner, PButton,
    },
    data() {
        return {
            is_active: false,
        };
    },
    template: `
      <div>
          <PModal v-bind="$props"
                  :secondaryActions= "[
                      {
                        content: 'Delete Customer',
                        'destructive': true,
                        onAction: handleDeleteAction,
                      },
                      {
                        content:'Cancel',
                        onAction: () => {
                          this.is_active = false;
                        },
                      },
                  ]"
                  @close="closeModal"
                  :open="this.is_active"
          >
              <PFormLayout>
                <PTextField label="First Name"/>
                <PTextField label="Last Name Name"/>
                <PTextField label="Email" type="email"/>
                <PBanner status="critical" title="Notice">
                  We ensure complete privacy all of out customers
                </PBanner>
              </PFormLayout>
              </PModal>
          <PButton @click="openModal">Open Modal</PButton>
      </div>`,
    methods: {
        openModal() {
            this.is_active = true;
        },
        closeModal() {
            this.is_active = false;
        },
        handleDeleteAction() {
            alert('Customer deleted');
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
    title: "Enter Customer Details",
    sectioned: true,
}

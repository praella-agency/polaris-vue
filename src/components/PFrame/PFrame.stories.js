import { PFrame } from './index';
import { PTopBar } from '../PTopBar';
import { PNavigation } from '../PNavigation';
import { PLoading } from '../PLoading';
import { PSkeletonPage } from '../PSkeletonPage';
import { PLayout, PLayoutSection, PLayoutAnnotatedSection } from '../PLayout';
import { PCard } from '../PCard';
import { PTextContainer } from '../PTextContainer';
import { PSkeletonDisplayText } from '../PSkeletonDisplayText';
import { PSkeletonBodyText } from '../PSkeletonBodyText';
import { PPage } from '../PPage';
import { PFormLayout } from '../PFormLayout';
import { PTextField } from '../PTextField';
import { PModal } from '../PModal';

export default {
    title: 'Structure / Frame',
    component: PFrame,
    parameters: {
        layout: 'fullscreen',
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PFrame, PTopBar, PNavigation, PLoading, PSkeletonPage, PLayout, PLayoutSection,
        PLayoutAnnotatedSection, PCard, PTextContainer, PSkeletonDisplayText, PSkeletonBodyText, PPage, PFormLayout,
        PTextField, PModal,
    },
    data() {
        return {
            defaultMarkup: {
                emailFieldValue: 'dharma@jadedpixel.com',
                nameFieldValue: 'Jaded Pixel',
            },
            topBarMarkup: {
                isUserMenuOpen: false,
                isSecondaryMenuOpen: false,
                isSearchActive: false,
                searchValue: '',
            },
            navigationMarkup: {
                isLoading: false,
            },
            contextualSaveBarMarkup: {
                isDirty: false,
            },
            modalMarkup: {
                modalActive: false,
                supportSubject: '',
                supportMessage: '',
            },
            mobileNavigationActive: false,
            toastActive: false,
            nameFieldValue: 'Jaded Pixel',
            emailFieldValue: 'dharma@jadedpixel.com',
            storeName: 'Jaded Pixel',
            logoMarkup: {
                width: 124,
                topBarSource:
                    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
                url: 'javascript:void(0)',
                accessibilityLabel: 'Jaded Pixel',
            },
        };
    },
    template: `
      <PFrame
          :showMobileNavigation="mobileNavigationActive"
          :onNavigationDismiss="handleMobileNavigationToggle"
          :contextualSaveBar="{
              active: contextualSaveBarMarkup.isDirty,
              message: 'Unsaved changes',
              saveAction: {
                onAction: handleSave,
              },
              discardAction: {
                onAction: handleDiscard,
              }
          }"
          :loading="navigationMarkup.isLoading"
          v-bind="$props"
      >
        <PTopBar
            slot="topBar"
            :showNavigationToggle="true"
            :logo="logoMarkup"
            :onSearchResultsDismiss="handleTopBarSearchResultsDismiss"
            :onNavigationToggle="handleMobileNavigationToggle"
            :userMenu="{
                id: 'Polaris-UserMenu',
                actions: [
                    {
                        items: [
                            {
                                content: 'Community forums'
                            }
                        ],
                    },
                ],
                name: 'Dharma',
                detail: storeName,
                initials: 'D',
                open: topBarMarkup.isUserMenuOpen,
                onToggle: toggleTopBarIsUserMenuOpen,
            }"
            :searchField="{
                value: topBarMarkup.searchValue,
                placeholder: 'Search',
                showFocusBorder: true,
            }"
            :searchResult="{
                items: [
                    {
                      content: 'Shopify help center',
                    },
                    {
                      content: 'Community forums',
                    },
                ],
            }"
        />
        <PNavigation
            slot="navigation"
            location="/"
            :showMobileNavigation="true"
            :logo="logoMarkup"
            :items="[
                {
                    items: [
                        {
                            label: 'Back to Shopify',
                            icon: 'ArrowLeftMinor',
                        },
                    ],
                },
                {
                    separator: true,
                    title: 'Jaded Pixel App',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'HomeMajor',
                            onClick: toggleIsLoading,
                        },
                        {
                            label: 'Jaded Pixel Orders',
                            icon: 'OrdersMajor',
                            onClick: toggleIsLoading,
                        },
                    ],
                    action: {
                        icon: 'ConversationMinor',
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                    }
                }
            ]"
        />
        <PLoading v-if="navigationMarkup.isLoading"/>
        <PSkeletonPage v-if="navigationMarkup.isLoading">
          <PLayout>
            <PLayoutSection>
              <PCard sectioned>
                <PTextContainer>
                  <PSkeletonDisplayText size="small"/>
                  <PSkeletonBodyText :lines="9"/>
                </PTextContainer>
              </PCard>
            </PLayoutSection>
          </PLayout>
        </PSkeletonPage>
        <PPage v-else title="Account">
          <PLayout>
            <a id="SkipToContentTarget" ref="skipToContentTarget" tabindex="-1"/>
            <PLayoutAnnotatedSection
                title="Account details"
                description="Jaded Pixel will use this as your account information."
            >
              <PCard sectioned>
                <PFormLayout>
                  <PTextField
                      label="Full name"
                      :value="nameFieldValue"
                      @input="handleNameFieldChange"
                  />
                  <PTextField
                      type="email"
                      label="Email"
                      :value="emailFieldValue"
                      @input="handleEmailFieldChange"
                  />
                </PFormLayout>
              </PCard>
            </PLayoutAnnotatedSection>
          </PLayout>
        </PPage>
        <PModal
            :open="modalMarkup.modalActive"
            title="Contact Support"
            :primaryAction="{
                content: 'Send',
                onAction: toggleModalActive,
            }"
            @close="toggleModalActive"
            sectioned
        >
          <PFormLayout>
            <PTextField
                label="Subject"
                :value="modalMarkup.supportSubject"
                @input="handleSubjectChange"
            />
            <PTextField
                label="Message"
                :value="modalMarkup.supportMessage"
                multiline
                @input="handleMessageChange"
            />
          </PFormLayout>
        </PModal>
      </PFrame>`,
    methods: {
        handleTopBarSearchResultsDismiss() {
            this.topBarMarkup.isSearchActive = false;
            this.topBarMarkup.searchValue = '';
        },
        handleMobileNavigationToggle() {
            this.mobileNavigationActive = !this.mobileNavigationActive;
        },
        toggleTopBarIsUserMenuOpen() {
            this.topBarMarkup.isUserMenuOpen = !this.topBarMarkup.isUserMenuOpen;
        },
        toggleIsLoading() {
            this.navigationMarkup.isLoading = !this.navigationMarkup.isLoading;
        },
        handleSave() {
            this.defaultMarkup.nameFieldValue = this.nameFieldValue;
            this.defaultMarkup.emailFieldValue = this.emailFieldValue;
            this.contextualSaveBarMarkup.isDirty = false;
            this.toastActive = true;
            this.storeName = this.defaultMarkup.nameFieldValue;
            this.$pToast.open({
                'message': 'Changes saved',
            });
        },
        handleDiscard() {
            this.nameFieldValue = this.defaultMarkup.nameFieldValue;
            this.emailFieldValue = this.defaultMarkup.emailFieldValue;
            this.contextualSaveBarMarkup.isDirty = false;
            this.$pToast.open({
                message: 'Changes discard',
            });
        },
        handleNameFieldChange(value) {
            this.nameFieldValue = value;
            if(value !== null) {
                this.contextualSaveBarMarkup.isDirty = true;
            }
        },
        handleEmailFieldChange(value) {
            this.emailFieldValue = value;
            if(value !== null) {
                this.contextualSaveBarMarkup.isDirty = true;
            }
        },
        toggleModalActive() {
            this.modalMarkup.modalActive = !this.modalMarkup.modalActive;
        },
        handleSubjectChange(value) {
            this.modalMarkup.supportSubject = value;
        },
        handleMessageChange(value) {
            this.modalMarkup.supportMessage = value;
        },
    },
});

export const Frame = Template.bind({});

Frame.args = {
    logo: {
        width: 124,
        contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Jaded Pixel',
    },
}

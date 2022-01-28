import { PTabs } from './index';
import { PCard } from '../PCard';
import { PFrame } from '../PFrame';
import { PPage } from '../PPage';
import { PLayout } from '../PLayout';
import { PLayoutAnnotatedSection } from '../PLayout/components/PLayoutAnnotatedSection';
import { PFormLayout } from '../PFormLayout';
import { PTextField } from '../PTextField';
import { PModal } from '../PModal';
import { PCardSection } from '../PCard/components/PCardSection';

export default {
    title: 'Navigation / Tabs',
    component: PTabs,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        selected: {
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
        },
        tabs: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** A unique identifier for the tab */
    id: string,
    /** A destination to link to */
    url?: string,
    /** Set to for router link */
    to?: string | object,
    /** Content for the tab */
    content: string,
    /** A unique identifier for the panel */
    panelID?: string,
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string,
    /** External URL */
    external?: boolean,
    /** Badge Object */
    badge?: {
        content?: string,
        status?: string,
        progress?: string,
        background?: string,
        color?: string,
        size?: string,
    },
}]`,
                },
            },
        },
        select: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(selectedIndex, event)',
                },
            },
        },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PTabs, PCard, PCardSection, PFrame, PPage, PLayout, PLayoutAnnotatedSection, PTextField, PModal, PFormLayout
    },
    data() {
        return {
            selectedTab: 0,
            items: [
                {
                    id: 'all-customers-1',
                    content: 'All',
                    to: '/all-customers-1',
                    external: false,
                    badge: {
                        content: '10+',
                        status: 'critical'
                    },
                },
                {
                    id: 'accepts-marketing-1',
                    content: 'Accepts marketing',
                    to: '/accepts-marketing-content-1',
                },
                {
                    id: 'repeat-customers-1',
                    content: 'Repeat customers',
                    to: '/repeat-customers-content-1',
                },
                {
                    id: 'prospects-1',
                    content: 'Prospects',
                    to: '/prospects-1',
                },
            ],

            defaultMarkup: {
                emailFieldValue: 'dharma@hulkapps.com',
                nameFieldValue: 'Hulkapps',
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
            nameFieldValue: 'Hulkapps',
            emailFieldValue: 'dharma@hulkapps.com',
            storeName: 'Hulkapps',
            logoMarkup: {
                width: 124,
                topBarSource:
                    'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
                url: 'javascript:void(0)',
                accessibilityLabel: 'Hulkapps',
            },
        };
    },
    template: `
        <PCard>
            <PTabs v-bind="$props" :tabs="items" @select="selectMenu" :selected="selectedTab">
<!--                <PCardSection :title="(selectedTab !== null) ? items[selectedTab].content : ''">-->
<!--                    <p>Tab {{ selectedTab }} selected</p>-->
<!--                </PCardSection>-->
                <PFrame
                    positioning="absolute"
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
                    :topBar="{
              showNavigationToggle: true,
              logo: this.logoMarkup,
              searchResultsDismiss: this.handleTopBarSearchResultsDismiss,
              onNavigationToggle: this.handleMobileNavigationToggle,
              userMenu: {
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
                  detail: this.storeName,
                  initials: 'D',
                  open: this.topBarMarkup.isUserMenuOpen,
                  onToggle: this.toggleTopBarIsUserMenuOpen,
              },
              searchField: {
                  value: this.topBarMarkup.searchValue,
                  placeholder: 'Search',
                  showFocusBorder: true,
              },
              searchResult: {
                  items: [
                      {
                          content: 'Shopify help center',
                      },
                      {
                          content: 'Community forums',
                      },
                  ],
              },
          }"
                    :navigation="{
              location: '/',
              showMobileNavigation: true,
              logo: logoMarkup,
              items: [
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
                      title: 'Hulkapps App',
                      items: [
                          {
                              label: 'Dashboard',
                              icon: 'HomeMajor',
                              onClick: toggleIsLoading,
                          },
                          {
                              label: 'Hulkapps Orders',
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
              ]
          }"
                    v-bind="$props"
                >
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
                                description="Hulkapps will use this as your account information."
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
                </PFrame>
            </PTabs>
        </PCard>`,
    methods: {
        selectMenu(menuIndex) {
            this.selectedTab = menuIndex;
        },
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
            this.navigationMarkup.isLoading ? this.$pLoading.start() : this.$pLoading.hide();
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
            if (value !== null) {
                this.contextualSaveBarMarkup.isDirty = true;
            }
        },
        handleEmailFieldChange(value) {
            this.emailFieldValue = value;
            if (value !== null) {
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

export const Tabs = Template.bind({});

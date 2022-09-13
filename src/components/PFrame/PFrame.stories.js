import { PFrame } from './index';
import { PSkeletonPage } from '../PSkeletonPage';
import { PLayout } from '../PLayout';
import { PLayoutAnnotatedSection } from '../PLayout/components/PLayoutAnnotatedSection';
import { PLayoutSection } from '../PLayout/components/PLayoutSection';
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
        docs: {
            inlineStories: false,
            iframeHeight: 600,
        },
    },
    argTypes: {
        ContextualSaveAction: {
            description: 'Object to utilize in ContextualSaveBar',
            control: {
                type: null,
            },
            type: {
                summary: null,
            },
            table: {
                category: 'Array | Object',
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** A destination to link to */
    url?: string,
    /** Content the action displays */
    content?: string,
    /** Should a spinner be displayed */
    loading?: boolean,
    /** Should the action be disabled */
    disabled?: boolean,

    /** Callback when an action takes place */
    onAction?(): void,
}`,
                },
            },
        },
        ThemeLogo: {
            description: 'Object to utilize in Theme',
            control: {
                type: null,
            },
            type: {
                summary: null,
            },
            table: {
                category: 'Array | Object',
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Provides a path for a logo used on a dark background */
    topBarSource?: string,
    /** Provides a path for a logo used on a light background */
    contextualSaveBarSource?: string,
    /** Destination the merchant will navigate to when clicking the logo */
    url?: string,
    /** Accessible label the logo image */
    accessibilityLabel?: string,
    /** Number of pixels wide the logo image is */
    width?: number,
}`,
                },
            },
        },
        contextualSaveBar: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Extend the contents section to be flush with the left edge */
    alignContentFlush?: boolean,
    /** Accepts a string of content that will be rendered to the left of the actions */
    message?: string,
    /** Save or commit contextual save bar action with text defaulting to 'Save' */
    saveAction?: ContextualSaveAction,
    /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
    discardAction?: {
        saveAction,
        /** Whether to show a modal confirming the discard action */
        discardConfirmationModal?: boolean,     
    },
    /** Remove the normal max-width on the contextual save bar */
    fullWidth?: boolean,
    /** To open a contextual modal */
    openModal?: boolean,
    /** ContextualSaveBar Logo */
    logo?: ThemeLogo,
}`,
                },
            },
        },
        logo: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    ThemeLogo;
}`,
                },
            },
        },
        navigation: {
            description: `**Props**: 
                <a href="https://polaris-vue.hulkapps.com/?path=/docs/navigation-navigation--navigation" target="_blank">Navigation props</a>. 
                \n**Slots**: Accepts a navigation component that will be rendered in the left sidebar of an application 
                frame.`,
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '{}',
                    detail: `Check Navigation Component props.`,
                },
            },
            control: {
                type: null,
            },
        },
        topBar: {
            description: `**Props**: 
                <a href="https://polaris-vue.hulkapps.com/?path=/docs/structure-top-bar--top-bar" target="_blank">TopBar props</a>.
                \n**Slots**: Accepts a top bar component that will be rendered at the top-most portion of an application
                 frame.`,
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '{}',
                    detail: `Check TopBar Component props.`,
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
        globalRibbon: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PFrame, PSkeletonPage, PLayout, PLayoutSection,
        PLayoutAnnotatedSection, PCard, PTextContainer, PSkeletonDisplayText, PSkeletonBodyText, PPage, PFormLayout,
        PTextField, PModal,
    },
    data() {
        return {
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
            v-bind="args"
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
                                    v-model="nameFieldValue"
                                    @input="handleNameFieldChange"
                                />
                                <PTextField
                                    type="email"
                                    label="Email"
                                    v-model="emailFieldValue"
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
                        v-model="modalMarkup.supportSubject"
                        @input="handleSubjectChange"
                    />
                    <PTextField
                        label="Message"
                        v-model="modalMarkup.supportMessage"
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

export const Default = Template.bind({});

Default.args = {
    logo: {
        width: 124,
        contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Hulkapps',
    },
}

Default.parameters = {
    docs: {
        source: {
            code: `
<PFrame
  :showMobileNavigation="mobileNavigationActive"
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
                  },
                  {
                      label: 'Hulkapps Orders',
                      icon: 'OrdersMajor',
                  },
              ],
              action: {
                  icon: 'ConversationMinor',
                  accessibilityLabel: 'Contact support',
              }
          }
      ]
  }"
  logo="{
      width: 124,
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
      url: 'javascript:void(0)',
      accessibilityLabel: 'Hulkapps',
  }"
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
                  v-model="nameFieldValue"
              />
              <PTextField
                  type="email"
                  label="Email"
                  v-model="emailFieldValue"
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
        }"
        sectioned
    >
      <PFormLayout>
        <PTextField
            label="Subject"
            v-model="modalMarkup.supportSubject"
        />
        <PTextField
            label="Message"
            v-model="modalMarkup.supportMessage"
            multiline
        />
      </PFormLayout>
    </PModal>
</PFrame>`
        },
    },
}

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PFrame, PSkeletonPage, PLayout, PLayoutSection,
        PLayoutAnnotatedSection, PCard, PTextContainer, PSkeletonDisplayText, PSkeletonBodyText, PPage, PFormLayout,
        PTextField, PModal,
    },
    data() {
        return {
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
        <div style="height: 500px; background: #DE1373; margin: -8px;">
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
                :topBar="{
                  showNavigationToggle: true,
                  logo: this.logoMarkup,
                  onSearchResultsDismiss: this.handleTopBarSearchResultsDismiss,
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
                v-bind="args"
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
                                        v-model="nameFieldValue"
                                        @input="handleNameFieldChange"
                                    />
                                    <PTextField
                                        type="email"
                                        label="Email"
                                        v-model="emailFieldValue"
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
                            v-model="modalMarkup.supportSubject"
                            @input="handleSubjectChange"
                        />
                        <PTextField
                            label="Message"
                            v-model="modalMarkup.supportMessage"
                            multiline
                            @input="handleMessageChange"
                        />
                    </PFormLayout>
                </PModal>
                <template #globalRibbon>
                    <div style="background: #C0FFEE; padding: 30px">
                        Global ribbon
                    </div>
                </template>
            </PFrame>
        </div>`,
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

export const FrameWithAnOffset = Template1.bind({});

FrameWithAnOffset.args = {
    logo: {
        width: 124,
        contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Hulkapps',
    },
    frameOffset: '60px'
}

FrameWithAnOffset.parameters = {
    docs: {
        source: {
            code: `
<div style="height: 500px; background: #DE1373; margin: -8px;">
  <PFrame
      :showMobileNavigation="mobileNavigationActive"
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
                      },
                      {
                          label: 'Hulkapps Orders',
                          icon: 'OrdersMajor',
                      },
                  ],
                  action: {
                      icon: 'ConversationMinor',
                      accessibilityLabel: 'Contact support',
                  }
              }
          ]
      }"
      logo="{
        width: 124,
        contextualSaveBarSource:
          'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Hulkapps',
      }"
      frameOffset="60px"
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
                  v-model="nameFieldValue"
              />
              <PTextField
                  type="email"
                  label="Email"
                  v-model="emailFieldValue"
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
        }"
        sectioned
    >
      <PFormLayout>
        <PTextField
            label="Subject"
            v-model="modalMarkup.supportSubject"
        />
        <PTextField
            label="Message"
            v-model="modalMarkup.supportMessage"
            multiline
        />
      </PFormLayout>
    </PModal>
    <template #globalRibbon>
      <div style="background: #C0FFEE; padding: 30px">
        Global ribbon
      </div>
    </template>
  </PFrame>
</div>`
        },
    },
}

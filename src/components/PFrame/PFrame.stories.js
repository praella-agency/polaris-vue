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
            description: `**Props**: Navigation props. 
                \n**Slots**: Accepts a navigation component that will be rendered in the left sidebar of an application 
                frame.`,
            table: {
                category: 'Props | Slots',
                defaultValue: {
                    summary: '{}',
                    detail: `Check Navigation Component props.`,
                },
            },
        },
        topBar: {
            description: `**Props**: TopBar props.
                \n**Slots**: Accepts a top bar component that will be rendered at the top-most portion of an application
                 frame.`,
            table: {
                category: 'Props | Slots',
                defaultValue: {
                    summary: '{}',
                    detail: `Check TopBar Component props.`,
                },
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        globalRibbon: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
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
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Jaded Pixel',
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
  :loading="navigationMarkup.isLoading"
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
              title: 'Jaded Pixel App',
              items: [
                  {
                      label: 'Dashboard',
                      icon: 'HomeMajor',
                  },
                  {
                      label: 'Jaded Pixel Orders',
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
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
      url: 'javascript:void(0)',
      accessibilityLabel: 'Jaded Pixel',
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
            description="Jaded Pixel will use this as your account information."
        >
          <PCard sectioned>
            <PFormLayout>
              <PTextField
                  label="Full name"
                  :value="nameFieldValue"
              />
              <PTextField
                  type="email"
                  label="Email"
                  :value="emailFieldValue"
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
            :value="modalMarkup.supportSubject"
        />
        <PTextField
            label="Message"
            :value="modalMarkup.supportMessage"
            multiline
        />
      </PFormLayout>
    </PModal>
</PFrame>`
        },
    },
}

const Template1 = (args, {argTypes}) => ({
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
              :loading="navigationMarkup.isLoading"
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
            <template slot="globalRibbon">
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
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Jaded Pixel',
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
      :loading="navigationMarkup.isLoading"
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
                  title: 'Jaded Pixel App',
                  items: [
                      {
                          label: 'Dashboard',
                          icon: 'HomeMajor',
                      },
                      {
                          label: 'Jaded Pixel Orders',
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
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Jaded Pixel',
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
            description="Jaded Pixel will use this as your account information."
        >
          <PCard sectioned>
            <PFormLayout>
              <PTextField
                  label="Full name"
                  :value="nameFieldValue"
              />
              <PTextField
                  type="email"
                  label="Email"
                  :value="emailFieldValue"
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
            :value="modalMarkup.supportSubject"
        />
        <PTextField
            label="Message"
            :value="modalMarkup.supportMessage"
            multiline
        />
      </PFormLayout>
    </PModal>
    <template slot="globalRibbon">
      <div style="background: #C0FFEE; padding: 30px">
        Global ribbon
      </div>
    </template>
  </PFrame>
</div>`
        },
    },
}

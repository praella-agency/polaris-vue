import { PFilter } from './index';
import { PButton } from '../PButton';
import { PPopover } from '../PPopover';
import { POptionList } from '../POptionList';
import { PCard } from '../PCard';
import { PCardSection } from '../PCard/components/PCardSection';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PTextField } from '../PTextField';
import { PCheckbox } from '../PCheckbox';
import { PChoiceList } from '../PChoiceList';

export default {
    title: 'Lists & Tables / Filter',
    component: PFilter,
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        resourceName: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    singular: string,
    plural: string,
}`,
                },
            },
        },
        onQueryChange: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: `(queryValue) => {}`,
                },
            },
        },
        auxiliaryContainer: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        filters: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** A unique key used to identify the filter */
    key: string;
    /** The label for the filter */
    label: string;
    /** The markup for the given filter */
    filter: string;
    /** Whether or not the filter should have a shortcut popover displayed */
    shortcut?: boolean;
    /** Whether or not the filter is disabled */
    disabled?: boolean;
    /**
     * @default false
     * Whether or not the clear button is displayed
     */
    hideClearButton?: boolean;
}`,
                },
            },
        },
        onQueryBlur: {
            table: {
                defaultValue: {
                    summary: 'void',
                },
            },
        },
        onQueryClear: {
            table: {
                defaultValue: {
                    summary: 'void',
                },
            },
        },
        onQueryClearAll: {
            table: {
                defaultValue: {
                    summary: 'void',
                },
            },
        },
        onQueryFocus: {
            table: {
                defaultValue: {
                    summary: 'void',
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PFilter, PButton, PPopover, POptionList, PCard, PCardSection, PStack, PStackItem, PTextField, PCheckbox,
        PChoiceList,
    },
    data() {
        return {
            popoverActive: false,
            accountStatusPopover: false,
            status: [],
            taggedValue: '',
            appliedFilter: [
                { value: 'Test', key: 'test'},
            ],
            accountStatus: [],
        };
    },
    template: `
      <PFilter 
          v-bind="$props" 
          @remove-tag="onRemoveFilter" 
          @input="onFilterInputChanged"
          :appliedFilters="appliedFilter"
      >
          <PPopover
              id="popover_1"  
              :active="accountStatusPopover"
              @close="toggleAccountStatus"
              full-width
          >
              <PButton
                      slot="activator"
                      :disclosure="accountStatusPopover ? 'up' : 'down'"
                      @click.stop="toggleAccountStatus"
                      :disabled="disabled"
              >
                  Account Status
              </PButton>
              <PCard slot="content" @change="updateStatusFilter" sectioned>
                  <PChoiceList
                      title="Account Status"
                      titleHidden
                      :options="[
                          {label: 'Enabled', value: 'enabled'},
                          {label: 'Not invited', value: 'not invited'},
                          {label: 'Invited', value: 'invited'},
                          {label: 'Declined', value: 'declined'},
                      ]"
                      textField="label"
                      valueField="value"
                      allowMultiple
                      :selected="accountStatus || []"
                      @change="handleTag"
                  >
                  </PChoiceList>
              </PCard>
          </PPopover>
          <PPopover
              id="popover_2"
              @close="togglePopoverActive"
              :active="popoverActive"
              full-width
          >
              <PButton
                      slot="activator"
                      :disclosure="popoverActive ? 'up' : 'down'"
                      @click.stop="togglePopoverActive"
                      :disabled="disabled"
              >
                  Status
              </PButton>
              <PCard slot="content" @change="updateStatusFilter">
                  <PCardSection>
                      <PStack vertical spacing="tight">
                          <PStackItem>
                              <PTextField
                                      label="Tagged with"
                                      v-model="taggedValue"
                                      labelHidden
                              />
                          </PStackItem>
                          <PStackItem>
                              <PButton plain @click="removeTag">
                                  Clear
                              </PButton>
                          </PStackItem>
                      </PStack>
                  </PCardSection>
              </PCard>
          </PPopover>
          <PButton :disabled="disabled">Submit</PButton>
          <template slot="auxiliaryContainer">
              <div style="padding-left: 8px;">
                  <PButton disabled>Save</PButton>
              </div>
          </template>
      </PFilter>`,
    methods: {
        onRemoveFilter() {
            alert("Removed");
        },
        onFilterInputChanged() {
            alert("Changed");
        },
        updateStatusFilter() {
            alert("Updated");
        },
        handleTag(value) {
            this.accountStatus = value;
            if (value.length > 0) {
                if(this.accountStatusPopover) {
                    let key = 'accountStatus';
                    this.taggedValue += value.map((val) => `Customer ${val}`).join(', ');
                    this.appliedFilter.splice(0, this.appliedFilter.length);
                    return this.appliedFilter.push(
                        { value: this.disambiguateLabel(key, value),
                            key: 'tag_' + this.taggedValue, remove: () => {}},
                    )
                }
            }
        },
        disambiguateLabel(key, value) {
            return value.map((val) => `Customer ${val}`).join(', ');
        },
        removeTag() {
            this.taggedValue = '';
        },
        toggleAccountStatus() {
            this.accountStatusPopover = !this.accountStatusPopover;
            this.popoverActive = false;
        },
        togglePopoverActive() {
            this.popoverActive = !this.popoverActive;
            this.accountStatusPopover = false;
        }
    },
});

export const Filter = Template.bind({});

Filter.args = {
    resourceName: {singular: 'Customer', plural: 'Customers'},
    disabled: false
}

import PFilter from './PFilter';
import { PButton } from '../PButton';
import { PPopover } from '../PPopover';
import { POptionList } from '../POptionList';
import { PCard, PCardSection } from '../PCard';
import { PStack, PStackItem } from '../PStack';
import { PTextField } from '../PTextField';
import { PCheckbox } from '../PCheckbox';
import { PChoiceList } from '../PChoiceList';

export default {
    title: 'Lists & Tables / Filter',
    component: PFilter,
    argTypes: {
        default: {
            table: {
                disable: true,
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
            appliedFilter: [],
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
            // console.log(value)
            if (value[0].length > 0) {
                if(this.accountStatusPopover) {
                    let key = 'accountStatus';
                    this.taggedValue += value[0].map((val) => `Customer ${val}`).join(', ');
                    this.appliedFilters.splice(0, this.appliedFilters.length);
                    return this.appliedFilter.push(
                        { value: this.disambiguateLabel(key, value[0]),
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
    appliedFilters: [
        { value: 'Test', key: 'test'},
    ],
    disabled: false
}

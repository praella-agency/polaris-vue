import PFilter from './PFilter';
import { PButton } from '../PButton';
import { PPopover } from '../PPopover';
import { POptionList } from '../POptionList';
import { PCard, PCardSection } from '../PCard';
import { PStack, PStackItem } from '../PStack';
import { PTextField } from '../PTextField';
import { PCheckbox } from '../PCheckbox';

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
    },
    data() {
        return {
            popoverActive: false,
            accountStatusPopover: false,
            status: [],
            taggedValue: '',
            appliedFilter: [],
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
              >
                  Account Status
              </PButton>
              <PCard slot="content" @change="updateStatusFilter" sectioned>
                  <PStack vertical spacing="tight">
                      <PStackItem>
                          <PCheckbox id="enabled" label="Enabled" @change="handleTag" />
                      </PStackItem>
                      <PStackItem>
                          <PCheckbox id="notInvited" label="Not Invited" @change="handleTag" />
                      </PStackItem>
                      <PStackItem>
                          <PCheckbox id="invited" label="Invited" @change="handleTag" />
                      </PStackItem>
                      <PStackItem>
                          <PCheckbox id="declined" label="Declined" @change="handleTag" />
                      </PStackItem>
                      <PStackItem>
                          <PButton plain @click="removeTag">
                              Clear
                          </PButton>
                      </PStackItem>
                  </PStack>
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
          <PButton>Submit</PButton>
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
            if (value.checked === true) {
                this.taggedValue += value.label + ',';
                if(this.accountStatusPopover) {
                    this.appliedFilter.push(
                        { value: 'Tagged with ' + this.taggedValue, key: 'tag_' + this.taggedValue},
                    )
                }
            } else {
                this.taggedValue = '';
            }
            console.log(value);
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
    resourceTitle: "Search",
    appliedFilters: [
        { value: 'Test', key: 'test'},
    ],
}

import { PFilter } from './index';
import { PButton } from '../PButton';
import { PButtonGroup } from '../PButtonGroup';
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
            control: {
                type: null,
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
        queryChange: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: `(queryValue) => {}`,
                },
            },
            control: {
                type: null,
            },
        },
        auxiliaryContainer: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
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
        queryBlur: {
            table: {
                defaultValue: {
                    summary: 'void',
                },
            },
            control: {
                type: null,
            },
        },
        queryClear: {
            table: {
                defaultValue: {
                    summary: 'void',
                },
            },
            control: {
                type: null,
            },
        },
        queryClearAll: {
            table: {
                defaultValue: {
                    summary: 'void',
                },
            },
            control: {
                type: null,
            },
        },
        queryFocus: {
            table: {
                defaultValue: {
                    summary: 'void',
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
        PFilter, PButton, PPopover, POptionList, PCard, PCardSection, PStack, PStackItem, PTextField, PCheckbox,
        PChoiceList, PButtonGroup,
    },
    data() {
        return {
            popoverActive: false,
            accountStatusPopover: false,
            status: [],
            taggedValue: '',
            appliedFilter: [
                {
                    value: 'Test',
                    key: 'test',
                },
            ],
            accountStatus: [],
        };
    },
    template: `
        <PFilter
            v-bind="args"
            @remove-tag="onRemoveFilter"
            @queryChange="onFilterQueryChange"
            :appliedFilters="appliedFilter"
        >
            <PButtonGroup segmented>
                <PPopover
                    id="popover_1"
                    :active="accountStatusPopover"
                    @close="() => {this.accountStatusPopover = false;}"
                    full-width
                >
                    <template #activator>
                        <PButton
                            :disclosure="accountStatusPopover ? 'up' : 'down'"
                            @click="toggleAccountStatus"
                            :disabled="false"
                        >
                            Account Status
                        </PButton>
                    </template>
                    <template #content>
                        <PCard @change="updateStatusFilter" sectioned>
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
                    </template>
                </PPopover>
                <PPopover
                    id="popover_2"
                    @close="() => {this.popoverActive = false;}"
                    :active="popoverActive"
                    full-width
                >
                    <template #activator>
                        <PButton
                            :disclosure="popoverActive ? 'up' : 'down'"
                            @click="togglePopoverActive"
                            :disabled="false"
                        >
                            Status
                        </PButton>
                    </template>
                    <template #content>
                        <PCard @change="updateStatusFilter">
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
                    </template>
                </PPopover>
                <PButton :disabled="false">Submit</PButton>
            </PButtonGroup>
            <template #auxiliaryContainer>
                <div style="padding-left: 8px;">
                    <PButton disabled>Save</PButton>
                </div>
            </template>
        </PFilter>`,
    methods: {
        onRemoveFilter() {
            alert("Removed");
        },
        onFilterQueryChange() {
            alert("Changed");
        },
        updateStatusFilter() {
            alert("Updated");
        },
        handleTag(value) {
            this.accountStatus = value;
            if (value.length > 0) {
                if (this.accountStatusPopover) {
                    let key = 'accountStatus';
                    this.taggedValue += value.map((val) => `Customer ${val}`).join(', ');
                    this.appliedFilter.splice(0, this.appliedFilter.length);
                    return this.appliedFilter.push(
                        {
                            value: this.disambiguateLabel(key, value),
                            key: 'tag_' + this.taggedValue,
                            remove: () => {
                            },
                        },
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

Filter.parameters = {
    docs: {
        source: {
            code: `
<PFilter>
    <PButtonGroup segmented>
        <PPopover id="popover_1">
            <template>
                <PButton>
                    Account Status
                </PButton>
            </template>
            <template>
                <PCard sectioned>
                    <PChoiceList title="Account Status">
                    </PChoiceList>
                </PCard>
            </template>
        </PPopover>
        <PPopover id="popover_2">
            <template>
                <PButton>Status</PButton>
            </template>
            <template>
                <PCard>
                    <PCardSection>
                        <PStack vertical spacing="tight">
                            <PStackItem>
                                <PTextField
                                    label="Tagged with"
                                />
                            </PStackItem>
                            <PStackItem>
                                <PButton>Clear</PButton>
                            </PStackItem>
                        </PStack>
                    </PCardSection>
                </PCard>
            </template>
        </PPopover>
        <PButton>Submit</PButton>
    </PButtonGroup>
    <template>
        <div style="padding-left: 8px;">
            <PButton>Save</PButton>
        </div>
    </template>
</PFilter>`
        },
    },
};
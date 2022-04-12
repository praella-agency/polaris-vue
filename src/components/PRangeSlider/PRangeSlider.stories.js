import { PRangeSlider } from './index';
import { PCard } from '../PCard';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PTextField } from '../PTextField';

export default {
    title: 'Forms / Range Slider',
    component: PRangeSlider,
    argTypes: {
        helpText: {
            description: `**Props**: Additional text to aid in use.
                \n**Slots**: Customize HelpText.`,
            control: {
                type: null,
            },
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            }
        },
        label: {
            description: `**Props**: Label for the range input.
                \n**Slots**: Customize Label.`,
            control: {
                type: null,
            },
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            }
        },
        prefix: {
            description: `**Props**: Element to display before the input.
                \n**Slots**: Customize Prefix.`,
            control: {
                type: null,
            },
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            }
        },
        suffix: {
            description: `**Props**: Element to display after the input.
                \n**Slots**: Customize Suffix.`,
            control: {
                type: null,
            },
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            }
        },
        labelAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    id: String,
    content: String,
    accessibilityLabel: String,
    url: String,
    external: Boolean,
    onAction: Function
}`,
                },
            },
        },
        blur: {
            control: {
                type: null,
            },
            table: {
                defaultValue: {
                    summary: '()',
                    detail: `(event)`,
                },
            },
        },
        change: {
            control: {
                type: null,
            },
            table: {
                defaultValue: {
                    summary: '()',
                    detail: `(value, id)`,
                },
            },
        },
        focus: {
            control: {
                type: null,
            },
            table: {
                defaultValue: {
                    summary: '()',
                    detail: `(event)`,
                },
            },
        },
    },
}

const Template = (args) => ({
    setup() {
    return { args };
},
    components: {
        PRangeSlider, PCard,
    },
    data() {
        return {
            rangeValue: 33,
        };
    },
    template: `
        <PCard sectioned title="Background color">
            <PRangeSlider
                v-bind="args"
                v-model="rangeValue"
            ></PRangeSlider>
            {{ rangeValue }}
        </PCard>
    `,
});

export const SingleRangeSlider = Template.bind({});

SingleRangeSlider.args = {
    output: true,
    label: 'Opacity percentage',
    id: 'Single Slider'
}

const Template1 = (args) => ({
    setup() {
    return { args };
},
    components: {
        PRangeSlider, PCard, PStack, PStackItem, PTextField,
    },
    data() {
        return {
            rangeValue: [900, 1000],
        };
    },
    template: `
        <PCard sectioned title="Minimum requirements">
            <div>
                <PRangeSlider
                    v-bind="args"
                    v-model="rangeValue"
                ></PRangeSlider>
                <PStack distribution="equalSpacing" spacing="extraLoose">
                    <PStackItem>
                        <PTextField
                            label="Min money spent"
                            type="number"
                            v-model="rangeValue[0]"
                            prefix="$"
                            :min="0"
                            :max="rangeValue[1]"
                            :step="10"
                        ></PTextField>
                    </PStackItem>
                    <PStackItem>
                        <PTextField
                            label="Max money spent"
                            type="number"
                            v-model="rangeValue[1]"
                            prefix="$"
                            :min="rangeValue[0]"
                            :max="2000"
                            :step="10"
                        ></PTextField>
                    </PStackItem>
                </PStack>
            </div>
        </PCard>
    `,
});

export const DualRangeSlider = Template1.bind({});

DualRangeSlider.args = {
    output: true,
    label: 'Money spent is between',
    prefix: '$',
    min: 0,
    max: 2000,
    step: 10,
    id: 'Dual Slider'
}

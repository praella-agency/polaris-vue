import { PRangeSlider } from './index';
import { PCard } from '../PCard';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PTextField } from '../PTextField';

export default {
    title: 'Range Slider',
    component: PRangeSlider,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
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
                v-bind="$props"
                :value="rangeValue"
                @change="handleChange"
            >
            </PRangeSlider>
        </PCard>
    `,
    methods: {
        handleChange(value, id) {
            this.rangeValue = value;
        }
    }
});

export const SingleRangeSlider = Template.bind({});

SingleRangeSlider.args = {
    output: true,
    label: 'Opacity percentage',
    id: 'Single Slider'
}

const Template1 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PRangeSlider, PCard, PStack, PStackItem, PTextField,
    },
    data() {
        return {
            rangeValue: [900, 1000],
            intermediateTextFieldValue: [900, 1000],
        };
    },
    template: `
        <PCard sectioned title="Minimum requirements">
            <div @keydown="handleEnterKeyPress">
                <PRangeSlider
                    v-bind="$props"
                    :value="rangeValue"
                    @change="handleChange"
                >
                </PRangeSlider>
                <PStack distribution="equalSpacing" spacing="extraLoose">
                    <PStackItem>
                        <PTextField
                            label="Min money spent"
                            type="number"
                            v-model="lowerTextFieldValue"
                            prefix="$"
                            :min="0"
                            :max="2000"
                            :step="10"
                            @input="handleLowerTextFieldChange"
                            @blur="handleLowerTextFieldBlur"
                        ></PTextField>
                    </PStackItem>
                    <PStackItem>
                        <PTextField
                            label="Max money spent"
                            type="number"
                            v-model="upperTextFieldValue"
                            prefix="$"
                            :min="0"
                            :max="2000"
                            :step="10"
                            @input="handleUpperTextFieldChange"
                            @blur="handleUpperTextFieldBlur"
                        ></PTextField>
                    </PStackItem>
                </PStack>
            </div>
        </PCard>
    `,
    computed: {
        lowerTextFieldValue() {
            return this.intermediateTextFieldValue[0] === this.rangeValue[0]
                ? this.rangeValue[0]
                : this.intermediateTextFieldValue[0];
        },
        upperTextFieldValue() {
            return this.intermediateTextFieldValue[1] === this.rangeValue[1]
                ? this.rangeValue[1]
                : this.intermediateTextFieldValue[1];
        },
    },
    methods: {
        handleEnterKeyPress(event) {
            const newValue = this.intermediateTextFieldValue;
            const oldValue = this.rangeValue;

            if (event.keyCode === 13 && newValue !== oldValue) {
                this.rangeValue = newValue;
            }
        },
        handleChange(value, id) {
            this.rangeValue = value;
            this.intermediateTextFieldValue = value;
        },
        handleLowerTextFieldChange(value) {
            const upperValue = this.rangeValue[1];
            this.intermediateTextFieldValue = [parseInt(value, 10), upperValue];
        },
        handleUpperTextFieldChange(value) {
            const lowerValue = this.rangeValue[0];
            this.intermediateTextFieldValue = [lowerValue, parseInt(value, 10)];
        },
        handleLowerTextFieldBlur() {
            const upperValue = this.rangeValue[1];
            const value = this.intermediateTextFieldValue[0];

            this.rangeValue = [parseInt(value, 10), upperValue];
        },
        handleUpperTextFieldBlur() {
            const lowerValue = this.rangeValue[0];
            const value = this.intermediateTextFieldValue[1];

            this.rangeValue = [lowerValue, parseInt(value, 10)];
        },
    }
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

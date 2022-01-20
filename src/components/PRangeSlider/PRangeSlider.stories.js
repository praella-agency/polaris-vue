import { PRangeSlider } from './index';
import { PCard } from '../PCard';

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
        PRangeSlider,
    },
    data() {
        return {
            rangeValue: [900, 100],
            intermediateTextFieldValue: [90, 100]
        };
    },
    template: `
        <PRangeSlider
            v-bind="$props"
            :value="rangeValue"
            @change="handleChange"
        >
        </PRangeSlider>`,
    methods: {
        handleChange(value, id) {
            this.rangeValue = value;
            this.intermediateTextFieldValue = value;
        }
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

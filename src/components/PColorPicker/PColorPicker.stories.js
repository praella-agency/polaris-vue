import { PColorPicker } from './index';
import { PBadge } from '../PBadge';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';

export default {
    title: 'Forms / Color Picker',
    component: PColorPicker,
    argTypes: {
        color: {
            control: {
                type: null,
            },
        },
        id: {
            table: {
                type: {
                    summary: 'string | number',
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
                    detail: '(color)',
                },
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PColorPicker, PBadge, PStack, PStackItem,
    },
    data() {
        return {
            colorAttr: '#FF0000',
        };
    },
    template: `
        <PStack vertical>
            <PStackItem>
                <PColorPicker
                    :color.sync="colorAttr"
                    v-bind="args"
                    @change="handleChange"
                />
            </PStackItem>
            <PStackItem>
                <PBadge :color="colorAttr">
                    {{ colorAttr }}
                </PBadge>
            </PStackItem>
        </PStack>`,
    methods: {
        handleChange(color) {
            console.log(color);
        },
    },
});

export const ColorPicker = Template.bind({});

ColorPicker.args = {
    id: 'color-picker',
    label: 'Color Picker',
}

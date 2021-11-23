import { PColorPicker } from './index.js';
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
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
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
              v-bind = "$props"
          />
        </PStackItem>
        <PStackItem>
          <PBadge :color="colorAttr">
            {{ colorAttr }}
          </PBadge>
        </PStackItem>
      </PStack>`,
});

export const ColorPicker = Template.bind({});

ColorPicker.args = {
    id: 'color-picker',
    label: 'Color Picker',
}

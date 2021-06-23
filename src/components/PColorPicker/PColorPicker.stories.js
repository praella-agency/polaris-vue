import PColorPicker from './PColorPicker';
import { PBadge } from '../PBadge';
import { PStack, PStackItem } from '../PStack';

export default {
    title: 'Forms / Color Picker',
    component: PColorPicker,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PColorPicker, PBadge, PStack, PStackItem,
    },
    data() {
        return {
            color: '#FF0000',
        };
    },
    template: `
      <PStack vertical>
        <PStackItem>
          <PColorPicker
              :color.sync="color"
              v-bind = "$props"
          />
        </PStackItem>
        <PStackItem>
          <PBadge :color="color">
            {{ color }}
          </PBadge>
        </PStackItem>
      </PStack>`,
});

export const ColorPicker = Template.bind({});

ColorPicker.args = {
    id: 'color-picker',
    label: 'Color Picker',
}
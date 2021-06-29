import PFormLayout from './PFormLayout';
import { PTextField } from '../PTextField';

export default {
    title: 'Forms / Form Layout / Default',
    component: PFormLayout,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PFormLayout, PTextField,
    },
    template: `
      <PFormLayout v-bind="$props">
          <PTextField label="Store name"/>
          <PTextField error="Please enter valid email" type="email" label="Account email"/>
      </PFormLayout>`,
});

export const Default = Template.bind({});
Default.args = {};
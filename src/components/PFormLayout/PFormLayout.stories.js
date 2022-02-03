import { PFormLayout } from './index';
import { PTextField } from '../PTextField';

export default {
    title: 'Forms / Form Layout / Default',
    component: PFormLayout,
    argTypes: {
        id: {
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        default: {
            description: 'The content to display inside the layout',
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        }
    }
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

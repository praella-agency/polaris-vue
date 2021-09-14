import PTextContainer from './PTextContainer';
import { PHeading } from '../PHeading';

export default {
    title: 'Titles & Text / Text Container',
    component: PTextContainer,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        spacing: {
            options: ['tight', 'loose', null],
            control: {
                type: 'select',
                labels: {
                    null: 'Default',
                },
            },
        },
        default: {
            table: {
                disable: true,
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PTextContainer, PHeading,
    },
    template: `
      <PTextContainer v-bind="$props">
          <PHeading>
            Sample Heading
          </PHeading>
          <p> 
            Sample paragraph  
          </p>
      </PTextContainer>`,
});

export const TextContainer = Template.bind({});

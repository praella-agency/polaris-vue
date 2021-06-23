import PButtonGroup from './PButtonGroup';
import { PButton } from '../PButton';

export default {
    title: 'Actions / Button Group',
    component: PButtonGroup,
    argTypes: {
        spacing: {
            options: ['loose', 'tight', 'extraTight', null],
            controls: {
                type: 'select',
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PButton, PButtonGroup,
    },
    template:`
        <PButtonGroup v-bind="$props">
          <PButton>Button 1</PButton>
          <PButton>Button 2</PButton>
          <PButton>Button 3</PButton>
        </PButtonGroup>`,
});

export const ButtonGroup = Template.bind({});

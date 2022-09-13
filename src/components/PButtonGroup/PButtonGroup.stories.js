import { PButtonGroup } from './index';
import { PButton } from '../PButton';

export default {
    title: 'Actions / Button Group',
    component: PButtonGroup,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        spacing: {
            options: ['loose', 'tight', 'extraTight', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
        default: {
            description: 'Button components',
            control: {
                type: null,
            },
        }
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PButton, PButtonGroup,
    },
    template: `
        <PButtonGroup v-bind="args">
            <PButton>Button 1</PButton>
            <PButton>Button 2</PButton>
            <PButton>Button 3</PButton>
        </PButtonGroup>`,
});

export const ButtonGroup = Template.bind({});

ButtonGroup.parameters = {
    docs: {
        source: {
            code: `
<PButtonGroup>
    <PButton>Button 1</PButton>
    <PButton>Button 2</PButton>
    <PButton>Button 3</PButton>
</PButtonGroup>`
        },
    },
};

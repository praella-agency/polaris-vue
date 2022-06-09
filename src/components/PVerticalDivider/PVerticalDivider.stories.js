import { PVerticalDivider } from './index';
import { PButton } from '../PButton';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';

export default {
    title: 'Structure / Vertical Divider',
    component: PVerticalDivider,
    parameters: {
        layout: 'centered',
        options: {
            showPanel: false,
        },
        controls: {
            disable: true,
        },
        actions: {
            disable: true,
        },
    },
}

const Template = (args) => ({
    setup() {
    return { args };
},
    components: {
        PVerticalDivider, PButton, PStack, PStackItem,
    },
    template: `
        <PStack>
            <PStackItem>
                <PButton destructive>Delete</PButton>
            </PStackItem>
            <PStackItem>
                <PVerticalDivider/>
            </PStackItem>
            <PStackItem>
                <PButton>Cancel</PButton>
            </PStackItem>
            <PStackItem>
                <PVerticalDivider/>
            </PStackItem>
            <PStackItem>
                <PButton primary>Add</PButton>
            </PStackItem>
        </PStack>
    `,
});

export const VerticalDivider = Template.bind({});

VerticalDivider.parameters = {
    docs: {
        source: {
            code: `<PVerticalDivider/>`
        },
    },
};

import { PHorizontalDivider } from './index';
import { PButton } from '../PButton';
import { PTextField } from '../PTextField';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';

export default {
    title: 'Structure / Horizontal Divider',
    component: PHorizontalDivider,
    parameters: {
        controls: {
            disabled: true,
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PHorizontalDivider, PButton, PStack, PStackItem, PTextField,
    },
    template: `
        <PStack vertical>
            <PStackItem>
                <PTextField label="Name" placeholder="Enter name"/>
            </PStackItem>
            <PStackItem>
                <PHorizontalDivider/>
            </PStackItem>
            <PStackItem>
                <PTextField label="Address" placeholder="Enter address" multiline/>
            </PStackItem>
            <PStackItem>
                <PHorizontalDivider/>
            </PStackItem>
            <PStackItem>
                <PButton primary>Add</PButton>
            </PStackItem>
        </PStack>
    `,
});

export const HorizontalDivider = Template.bind({});

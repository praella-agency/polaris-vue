import { PCaption } from './index';
import { PList } from '../PList';
import { PListItem } from '../PList/components/PListItem';

export default {
    title: 'Titles & Text / Caption',
    component: PCaption,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        id: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: 'string | number',
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
        PCaption, PList, PListItem,
    },
    template: `
        <PList>
            <PListItem>
                Order #1001
                <PCaption v-bind="args">Received April 21, 2017</PCaption>
            </PListItem>
            <PListItem>
                Order #1002
                <PCaption v-bind="args">Received April 22, 2017</PCaption>
            </PListItem>
        </PList>`,
});

export const Caption = Template.bind({});

Caption.parameters = {
    docs: {
        source: {
            code:
`<PList>
    <PListItem>
        Order #1001
        <PCaption>Received April 21, 2017</PCaption>
    </PListItem>
    <PListItem>
        Order #1002
        <PCaption>Received April 22, 2017</PCaption>
    </PListItem>
</PList>`
        },
    },
};
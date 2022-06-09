import { PFooterHelp } from './index';
import { PLink } from '../PLink';

export default {
    title: 'Navigation / Footer Help',
    component: PFooterHelp,
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
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        icon: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PFooterHelp, PLink,
    },
    template: `
        <PFooterHelp
            v-bind="args"
        >
            Learn more about
            <PLink
                url="javascript:void(0);"
            >
                fulfilling orders
            </PLink>
        </PFooterHelp>`,
});

export const FooterHelp = Template.bind({});

FooterHelp.args = {
    id: 'MyFooter',
}

FooterHelp.parameters = {
    docs: {
        source: {
            code: `
<PFooterHelp>
    Learn more about
    <PLink>fulfilling orders</PLink>
</PFooterHelp>`
        },
    },
};
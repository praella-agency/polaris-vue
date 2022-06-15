import { PHorizontalNavigation } from './index';
import { PButton } from '../PButton';
import VueRouter from 'storybook-vue3-router';
import routes from '../../utilities/StorybookRoutes';

export default {
    title: 'Navigation / Horizontal Navigation',
    component: PHorizontalNavigation,
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
        tabs: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** A unique identifier for the tab */
    id: string,
    /** A destination to link to */
    url?: string,
    /** Set to for router link */
    to?: string | object,
    /** Content for the tab */
    content: string,
    /** A unique identifier for the panel */
    panelID?: string,
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string,
    /** External URL */
    external?: boolean,
    /** Badge Object */
    badge?: {
        content?: string,
        status?: string,
        progress?: string,
        background?: string,
        color?: string,
        size?: string,
    },
}]`,
                },
            },
        },
        rightMenu: {
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
};

const items = [
    {
        id: 'all-customers-1',
        content: 'All',
        to: '/',
        external: false,
        badge: {
            content: '10+',
            status: 'critical'
        },
    },
    {
        id: 'accepts-marketing-1',
        content: 'Accepts marketing',
        to: '/accepts-marketing-content-1',
    },
    {
        id: 'repeat-customers-1',
        content: 'Repeat customers',
        to: '/repeat-customers-content-1',
    },
    {
        id: 'prospects-1',
        content: 'Prospects',
        to: '/prospects-1',
    },
];

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PHorizontalNavigation,PButton
    },
    data() {
        return {
            items,
        };
    },
    template: `<PHorizontalNavigation v-bind="args" :tabs="items">
    <template v-slot:rightMenu>
        <PButton>Button</PButton>
    </template>
</PHorizontalNavigation>
        `,
});

export const HorizontalNavigation = Template.bind({});

HorizontalNavigation.decorators = [
    VueRouter(routes(items, 'to')),
]

HorizontalNavigation.parameters= {
    docs: {
        source: {
            code: `<PHorizontalNavigation :tabs="items">
    <template v-slot:rightMenu>
        <PButton>Button</PButton>
    </template>
</PHorizontalNavigation>`
        },
    },
};

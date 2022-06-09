import { PTabs } from './index';
import { PCard } from '../PCard';
import { PCardSection } from '../PCard/components/PCardSection';
import VueRouter from 'storybook-vue3-router';
import routes from '../../utilities/StorybookRoutes';

export default {
    title: 'Navigation / Tabs',
    component: PTabs,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        selected: {
            control: {
                type: null,
            },
        },
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
        select: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(selectedIndex, event)',
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
        to: '/all-customers-1',
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
        PTabs, PCard, PCardSection,
    },
    data() {
        return {
            selectedTab: 0,
            items,
        };
    },
    template: `
        <PCard>
            <PTabs v-bind="args" :tabs="items" @select="selectMenu" :selected="selectedTab">
                <PCardSection :title="(selectedTab !== null) ? items[selectedTab].content : ''">
                    <p>Tab {{ selectedTab }} selected</p>
                </PCardSection>
            </PTabs>
        </PCard>`,
    methods: {
        selectMenu(menuIndex) {
            this.selectedTab = menuIndex;
        },
    },
});

export const Tabs = Template.bind({});
//
// const customRoutes = [
//     {
//         path: '/all-customers-1',
//         name: 'all-customers-1',
//         component: {
//             template: ''
//         }
//     },
//     {
//         path: '/accepts-marketing-content-1',
//         name: 'accepts-marketing-content-1',
//     }
// ]

Tabs.decorators = [
    VueRouter(routes(items, 'to')),
]

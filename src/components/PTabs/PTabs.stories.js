import { PTabs } from '../PTabs';
import { PCard, PCardSection } from '../PCard';

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
                disable: true,
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
        },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PTabs, PCard, PCardSection,
    },
    data() {
        return {
            selectedTab: null,
            items: [
                {
                    id: 'all-customers-1',
                    content: 'All',
                    url: 'javascript:void(0)',
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
                },
            ],
        };
    },
    template: `
        <PCard>
            <PTabs v-bind="$props" :tabs="items" @select="selectMenu" :selected="selectedTab">
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

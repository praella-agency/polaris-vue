import PTabs from '@/components/PTabs/PTabs.vue';

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
}]`
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
    components: { PTabs },
    data() {
        return {
            selectedTab: null,
        };
    },
    template: '<PTabs v-bind="$props" @select="selectMenu" :selected="selectedTab"/>',
    methods: {
        selectMenu(menuIndex) {
            this.selectedTab = menuIndex;
            alert('Tab => ' + this.tabs[this.selectedTab].content);
        },
    }
});

export const Tabs = Template.bind({});

Tabs.args = {
    tabs: [
        {
            id: 'collections',
            content: 'Collections',
            url: 'https://www.google.com',
            external: true,
        },
        {
            id: 'customers',
            content: 'Customers',
            to: '/customers'
        },
        {
            id: 'multiple-edit',
            content: 'MultipleEdit',
            to: '/multiple-edit'
        },
        {
            id: 'products',
            content: 'Products',
        },
    ],
}


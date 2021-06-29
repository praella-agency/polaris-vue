import PTabs from '@/components/PTabs/PTabs.vue';

export default {
    title: 'Navigation / Tabs',
    component: PTabs,
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
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { PTabs },
    data() {
        return {
            selectedTab: 0
        };
    },
    template: '<PTabs v-bind="$props" @select="selectMenu" :selected="selectedTab"/>',
    methods: {
        selectMenu(menuIndex) {
            this.selectedTab = menuIndex;
            alert('Tab changed.' + this.tabs[this.selectedTab].path);
        },
    }
});

export const Tabs = Template.bind({});

Tabs.args = {
    tabs: [
        {
            id: 'collections',
            content: 'Collections',
            path: '/collections'
        },
        {
            id: 'customers',
            content: 'Customers',
            path: '/customers'
        },
        {
            id: 'multiple-edit',
            content: 'MultipleEdit',
            path: '/multiple-edit'
        },
        {
            id: 'products',
            content: 'Products',
            path: '/products'
        },
    ],
}


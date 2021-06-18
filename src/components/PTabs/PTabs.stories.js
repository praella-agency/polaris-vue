import PTabs from '@/components/PTabs/PTabs.vue';

export default {
    title: 'Navigation / Tabs',
    component: PTabs,
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { PTabs },
    template: '<PTabs v-bind="$props" @select="selectMenu"/>',
    methods: {
        selectMenu(menuIndex) {
            this.selected = menuIndex;
            alert('Tab changed.' + this.tabs[this.selected].path);
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
    selected: 0,
}


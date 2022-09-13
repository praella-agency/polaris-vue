import { PPagination } from './index';

export default {
    title: 'Navigation / Pagination',
    component: PPagination,
    parameters: {
        layout: 'centered',
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PPagination,
    },
    template: `
        <PPagination
            v-bind="args"
        ></PPagination>`,
});

export const Pagination = Template.bind({});

Pagination.args = {
    label: 'Result',
    hasPrevious: true,
    onPrevious: () => {
        console.log('Previous')
    },
    hasNext: true,
    onNext: () => {
        console.log('Next')
    },
}

Pagination.parameters = {
    docs: {
        source: {
            code: `<PPagination/>`
        },
    },
};

import {PPagination} from './index';

export default {
    title: 'Navigation / Pagination',
    component: PPagination,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PPagination,
    },
    template: `
        <PPagination
            v-bind="$props"
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

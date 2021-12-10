import { PAccordion } from './index';
import argTypes from './args';

export default {
    title: 'Behavior / Accordion',
    component: PAccordion,
    argTypes,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PAccordion,
    },
    template: `
        <PAccordion
            v-bind="$props"
            id="Polaris-Accordion"
        />`,
});

export const Default = Template.bind({});

Default.args = {
    multiple: false,
    open: [1, 0],
    accordions: [
        {
            title: 'Accordion 1',
            content: `Your mailing list lets you contact customers or visitors who
                        have shown an interest in your store. Reach out to them with
                        exclusive offers or updates about your products.
                        Your mailing list lets you contact customers or visitors who
                        have shown an interest in your store. Reach out to them with
                        exclusive offers or updates about your products.`,
        },
        {
            title: 'Accordion 2',
            content: `Your mailing list lets you contact customers or visitors who
                        have shown an interest in your store. Reach out to them with
                        exclusive offers or updates about your products.`,
        },
        {
            title: 'Accordion 3',
            content: `Your mailing list lets you contact customers or visitors who
                        have shown an interest in your store. Reach out to them with
                        exclusive offers or updates about your products.
                        Your mailing list lets you contact customers or visitors who
                        have shown an interest in your store. Reach out to them with
                        exclusive offers or updates about your products.`,
        },
    ],
}

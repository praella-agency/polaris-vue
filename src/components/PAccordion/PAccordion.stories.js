import { PAccordion } from './index';

export default {
    title: 'Accordion',
    component: PAccordion,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PAccordion,
    },
    data() {
        return {
            isOpen: false,
            items: [
                {
                    title: 'Accordion 1',
                    content: `Your mailing list lets you contact customers or visitors who
                                    have shown an interest in your store. Reach out to them with
                                    exclusive offers or updates about your products.
                                    Your mailing list lets you contact customers or visitors who
                                    have shown an interest in your store. Reach out to them with
                                    exclusive offers or updates about your products.
                                    Your mailing list lets you contact customers or visitors who
                                    have shown an interest in your store. Reach out to them with
                                    exclusive offers or updates about your products.
                                    Your mailing list lets you contact customers or visitors who
                                    have shown an interest in your store. Reach out to them with
                                    exclusive offers or updates about your products.
                                    Your mailing list lets you contact customers or visitors who
                                    have shown an interest in your store. Reach out to them with
                                    exclusive offers or updates about your products.
                                    Your mailing list lets you contact customers or visitors who
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
        };
    },
    template: `
        <PAccordion
            v-bind="$props"
            :accordions="items"
        >
            <div slot="title" style="background-color: red; width: 100%; margin: 1rem 2.25rem;">
                <button>a</button>
            </div>
        </PAccordion>
    `,
});

export const Accordion = Template.bind({});

Accordion.args = {
    multiple: false,
}

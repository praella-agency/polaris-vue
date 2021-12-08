import { PAccordion } from './index';
import { PAccordionItem } from './components/PAccordionItem';
import { PIcon } from '../PIcon';

export default {
    title: 'Accordion',
    component: PAccordion,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PAccordion, PAccordionItem, PIcon,
    },
    data() {
        return {
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
        <div>
<!--        <PAccordion-->
<!--            v-bind="$props"-->
<!--            id="a"-->
<!--        >-->
<!--            <PAccordionItem-->
<!--                v-for="(item, key) in items"-->
<!--                :key="key"-->
<!--                :id="'id' + key"-->
<!--            >-->
<!--                <template slot="title">-->
<!--                    {{ item.title }}-->
<!--                </template>-->
<!--                <template slot="content">-->
<!--                    {{ item.content }}-->
<!--                </template>-->
<!--            </PAccordionItem>-->
<!--        </PAccordion>-->
        <PAccordion
            v-bind="$props"
            :accordions="items"
            id="b"
            :icon="{
                open: {
                    source: 'AddMajor',
                    color: 'critical',
                },
                close: {
                    source: 'CameraMajor',
                    color: 'success',
                },                
            }"
        >
<!--            <PAccordionItem-->
<!--                v-for="(item, key) in items"-->
<!--                :key="key"-->
<!--                :id="'key' + key"-->
<!--            >-->
<!--                <template slot="title">-->
<!--                    {{ item.title }}-->
<!--                </template>-->
<!--                <template slot="content">-->
<!--                    {{ item.content }}-->
<!--                </template>-->
<!--            </PAccordionItem>-->
        </PAccordion>
        </div>
    `,
});

export const Accordion = Template.bind({});

Accordion.args = {
    multiple: false,
}

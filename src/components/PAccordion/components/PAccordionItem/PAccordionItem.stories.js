import { PAccordionItem } from './index';
import { PAccordion } from '../../../PAccordion';
import { PIcon } from '../../../PIcon';
import argTypes from './args';

export default {
    title: 'Behavior / Accordion',
    component: PAccordionItem,
    argTypes,
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PAccordion, PAccordionItem, PIcon,
    },
    template: `
        <PAccordion
            id="Polaris-Accordion"
            :open="0"
        >
            <PAccordionItem
                v-for="(item, key) in 3"
                :key="key"
                v-bind="args"
            >
                <template #title>
                    Item {{ item }}
                </template>
                <template #actions>
                    <PIcon
                        source="CircleUpMajor"
                        color="success"
                    />
                </template>
                <template #content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </template>
            </PAccordionItem>
        </PAccordion>`,
});

export const AccordionItem = Template.bind({});

AccordionItem.args = {
    themeOptions: {
        header: {
            color: '#0e1111',
            background: '#f1f8f5',
            backgroundCollapsed: '#d2e7d6'
        },
        content: {
            color: '#0e1111',
            background: '#e8f4ea',
        }
    }
}

import { PAccordionItem } from './index';
import { PAccordion } from '../../../PAccordion';
import { PIcon } from '../../../PIcon';
import argTypes from './args';

export default {
    title: 'Behavior / Accordion / Accordion Item',
    component: PAccordionItem,
    argTypes,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PAccordion, PAccordionItem, PIcon,
    },
    template: `
        <PAccordion
            id="Polaris-Accordion"
        >
            <PAccordionItem
                v-for="(item, key) in 3"
                :key="key"
                v-bind="$props"
            >
                <template slot="title">
                    Item {{ item }}
                </template>
                <template slot="actions">
                    <PIcon
                        source="CircleUpMajor"
                        color="success"
                    />
                </template>
                <div slot="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat.
                </div>
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

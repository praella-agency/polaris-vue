import { PAccordionItem } from './index';
import { PAccordion } from '../../../PAccordion';

export default {
    title: 'Behavior / Accordion / Accordion Item',
    component: PAccordionItem,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PAccordion, PAccordionItem,
    },
    template: `
        <PAccordion
            v-bind="$props"
            id="Polaris-Accordion"
        >
            <PAccordionItem
                v-for="(item, key) in 3"
                :key="key"
                :id="key"
            >
                <template slot="title">
                    Item {{ item }}
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
}

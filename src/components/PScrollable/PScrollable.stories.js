import { PScrollable } from './index';

export default {
    title: 'Behavior / Scrollable',
    component: PScrollable,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PScrollable,
    },
    template: `
        <PScrollable 
            v-bind="$props"
            style="height: 100px"
        >
            <p>
                By signing up for the Shopify service (“Service”) or any of the services
                of Shopify Inc. (“Shopify”) you are agreeing to be bound by the following
                terms and conditions (“Terms of Service”). The Services offered by Shopify
                under the Terms of Service include various products and services to help
                you create and manage a retail store, whether an online store (“Online
                Services”), a physical retail store (“POS Services”), or both. Any new
                features or tools which are added to the current Service shall be also
                subject to the Terms of Service. You can review the current version of the
                Terms of Service at any time at https://www.shopify.com/legal/terms.
                Shopify reserves the right to update and change the Terms of Service by
                posting updates and changes to the Shopify website. You are advised to
                check the Terms of Service from time to time for any updates or changes
                that may impact you.
            </p>
        </PScrollable>`,
});

export const Scrollable = Template.bind({});

Scrollable.args = {
    shadow: true,
    focusable: true,
    vertical: true,
    horizontal: true,
}

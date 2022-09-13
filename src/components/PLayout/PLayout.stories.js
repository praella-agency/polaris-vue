import { PLayout } from './index';
import { PLayoutSection } from './components/PLayoutSection';
import { PCard } from '../PCard';
import { PBanner } from '../PBanner';
import { PLayoutAnnotatedSection } from './components/PLayoutAnnotatedSection';
import { PFormLayout } from '../PFormLayout';
import { PTextField } from '../PTextField';

export default {
    title: 'Structure / Layout',
    component: PLayout,
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PLayout, PCard, PLayoutSection
    },
    template: `
        <PLayout v-bind="args">
            <PLayoutSection>
                <PCard sectioned :actions=[]>
                    View a summary of your online store’s performance
                </PCard>
            </PLayoutSection>
        </PLayout>`,
});

export const Layout = Template.bind({});

Layout.args = {
    sectioned: true,
}

Layout.parameters = {
    docs: {
        source: {
            code: `
<PLayout>
    <PLayoutSection>
        <PCard sectioned>
            View a summary of your online store’s performance
        </PCard>
    </PLayoutSection>
</PLayout>`
        },
    },
};

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PLayout, PLayoutSection, PCard,
    },
    template: `
        <PLayout v-bind="args">
            <PLayoutSection>
                <PCard sectioned title="Order details" :actions=[]>
                    View a summary of your order.
                </PCard>
            </PLayoutSection>
            <PLayoutSection secondary>
                <PCard sectioned title="Tags" :actions=[]>
                    Add tags to your order.
                </PCard>
            </PLayoutSection>
        </PLayout>`,
});

export const TwoColumnWithPrimaryAndSecondaryWidth = Template1.bind({});

TwoColumnWithPrimaryAndSecondaryWidth.parameters = {
    docs: {
        source: {
            code: `
<PLayout>
    <PLayoutSection>
        <PCard sectioned title="Order details">
            View a summary of your order.
        </PCard>
    </PLayoutSection>
    <PLayoutSection secondary>
        <PCard sectioned title="Tags">
            Add tags to your order.
        </PCard>
    </PLayoutSection>
</PLayout>`
        },
    },
};

const Template2 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PLayout, PLayoutSection, PCard,
    },
    template: `
        <PLayout v-bind="args">
            <PLayoutSection one-half>
                <PCard sectioned title="Order details" :actions=[]>
                    View a summary of your order.
                </PCard>
            </PLayoutSection>
            <PLayoutSection one-half>
                <PCard sectioned title="Tags" :actions=[]>
                    Add tags to your order.
                </PCard>
            </PLayoutSection>
        </PLayout>`,
});

export const TwoColumnsWithEqualWidth = Template2.bind({});

TwoColumnsWithEqualWidth.parameters = {
    docs: {
        source: {
            code: `
<PLayout>
    <PLayoutSection one-half>
        <PCard sectioned title="Order details">
            View a summary of your order.
        </PCard>
    </PLayoutSection>
    <PLayoutSection one-half>
        <PCard sectioned title="Tags">
            Add tags to your order.
        </PCard>
    </PLayoutSection>
</PLayout>`
        },
    },
};

const Template3 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PLayout, PLayoutSection, PCard,
    },
    template: `
        <PLayout v-bind="args">
            <PLayoutSection oneThird>
                <PCard sectioned title="Order details" :actions=[]>
                    View a summary of your order.
                </PCard>
            </PLayoutSection>
            <PLayoutSection oneThird>
                <PCard sectioned title="Variant" :actions=[]>
                    Add Variant
                </PCard>
            </PLayoutSection>
            <PLayoutSection oneThird>
                <PCard sectioned title="Tags" :actions=[]>
                    Add tags to your order.
                </PCard>
            </PLayoutSection>
        </PLayout>`,
});

export const ThreeColumnsWithEqualWidth = Template3.bind({});

ThreeColumnsWithEqualWidth.parameters = {
    docs: {
        source: {
            code: `
<PLayout>
    <PLayoutSection oneThird>
        <PCard sectioned title="Order details">
            View a summary of your order.
        </PCard>
    </PLayoutSection>
    <PLayoutSection oneThird>
        <PCard sectioned title="Variant">
            Add Variant
        </PCard>
    </PLayoutSection>
    <PLayoutSection oneThird>
        <PCard sectioned title="Tags">
            Add tags to your order.
        </PCard>
    </PLayoutSection>
</PLayout>`
        },
    },
};

const Template4 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PLayout, PLayoutSection, PBanner, PLayoutAnnotatedSection, PCard, PFormLayout, PTextField
    },
    template: `
        <PLayout v-bind="args">
            <PLayoutSection>
                <PBanner title="Order archived" :action="{}" @dismiss="handleDismissAction">
                    <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
                </PBanner>
            </PLayoutSection>
            <PLayoutAnnotatedSection
                title="Store details"
                description="Shopify and your customers will use this information to contact you."
            >
                <PCard sectioned :actions=[]>
                    <PFormLayout>
                        <PTextField label="Store name"></PTextField>
                        <PTextField type="email" label="Account email"></PTextField>
                    </PFormLayout>
                </PCard>
            </PLayoutAnnotatedSection>
        </PLayout>`,
    methods: {
        handleDismissAction() {
            alert('Dismiss');
        },
    },
});

export const AnnotatedLayout = Template4.bind({});

AnnotatedLayout.parameters = {
    docs: {
        source: {
            code: `
<PLayout>
    <PLayoutSection>
        <PBanner title="Order archived">
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
        </PBanner>
    </PLayoutSection>
    <PLayoutAnnotatedSection
        title="Store details"
        description="Shopify and your customers will use this information to contact you."
    >
        <PCard sectioned>
            <PFormLayout>
                <PTextField label="Store name"></PTextField>
                <PTextField type="email" label="Account email"></PTextField>
            </PFormLayout>
        </PCard>
    </PLayoutAnnotatedSection>
</PLayout>`
        },
    },
};

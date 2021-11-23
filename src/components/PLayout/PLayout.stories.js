import { PLayout } from './index';
import { PLayoutSection } from './components/PLayoutSection';
import { PCard } from '../PCard';
import { PBanner } from '../PBanner/index.js';
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
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PLayout, PCard, PLayoutSection
    },
    template: `
      <PLayout v-bind="$props">
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

const Template1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
       PLayout, PLayoutSection, PCard,
    },
    template: `
      <PLayout v-bind="$props">
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

const Template2 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
       PLayout, PLayoutSection, PCard,
    },
    template: `
      <PLayout v-bind="$props">
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

const Template3 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
       PLayout, PLayoutSection, PCard,
    },
    template: `
      <PLayout v-bind="$props">
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

const Template4 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PLayout, PLayoutSection, PBanner, PLayoutAnnotatedSection, PCard, PFormLayout, PTextField
    },
    template: `
        <PLayout v-bind="$props">
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

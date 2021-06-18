import PLayout from './PLayout';
import PLayoutSection from './PLayoutSection';
import { PCard } from '../PCard';

export default {
    title: 'Structure / Layout',
    component: PLayout,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PLayout, PCard, PLayoutSection
    },
    template: `
      <PLayout v-bind="$props">
        <PLayoutSection>
          <PCard sectioned>
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
            <PCard sectioned title="Order details">
              View a summary of your order.
            </PCard>
          </PLayoutSection>
          <PLayoutSection secondary>
            <PCard sectioned title="Tags">
              Add tags to your order.
            </PCard>
          </PLayoutSection>
      </PLayout>`,
});

export const TowColumnWithPrimaryAndSecondaryWidth = Template1.bind({});

const Template2 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
       PLayout, PLayoutSection, PCard,
    },
    template: `
      <PLayout v-bind="$props">
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
      </PLayout>`,
});

export const ThreeColumnsWithEqualWidth = Template3.bind({});


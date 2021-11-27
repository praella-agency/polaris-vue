import { PSkeletonBodyText } from './index';

export default {
    title: 'Feedback indicators / Skeleton Body Text',
    component: PSkeletonBodyText,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSkeletonBodyText
    },
    template: `
      <PSkeletonBodyText
          v-bind="$props"
      />`,
});

export const SkeletonBodyText = Template.bind({});

SkeletonBodyText.args = {
    lines: 5,
}

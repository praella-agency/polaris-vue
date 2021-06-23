import PSkeletonDisplayText from './PSkeletonDisplayText';

export default {
    title: 'Feedback indicators / Skeleton Display Text',
    component: PSkeletonDisplayText,
    argTypes: {
        size: {
            options: ['small', 'medium', 'large', 'extraLarge'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSkeletonDisplayText,
    },
    template: `
      <PSkeletonDisplayText
          v-bind="$props"
      />`,
});

export const SkeletonDisplayText = Template.bind({});

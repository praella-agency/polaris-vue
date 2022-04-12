import { PSkeletonDisplayText } from './index';

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

const Template = (args) => ({
    setup() {
    return { args };
},
    components: {
        PSkeletonDisplayText,
    },
    template: `
      <PSkeletonDisplayText
          v-bind="args"
      />`,
});

export const SkeletonDisplayText = Template.bind({});

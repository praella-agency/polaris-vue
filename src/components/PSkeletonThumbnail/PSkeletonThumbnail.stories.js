import PSkeletonThumbnail from './PSkeletonThumbnail';

export default {
    title: 'Feedback indicators / Skeleton Thumbnail',
    component: PSkeletonThumbnail,
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSkeletonThumbnail,
    },
    template: `
      <PSkeletonThumbnail
          v-bind="$props"
      />`,
});

export const SkeletonThumbnail = Template.bind({});

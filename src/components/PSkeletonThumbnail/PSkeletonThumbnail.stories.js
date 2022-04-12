import { PSkeletonThumbnail } from './index';

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

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PSkeletonThumbnail,
    },
    template: `
        <PSkeletonThumbnail
            v-bind="args"
        />`,
});

export const SkeletonThumbnail = Template.bind({});

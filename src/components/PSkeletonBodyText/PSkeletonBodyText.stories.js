import { PSkeletonBodyText } from './index';

export default {
    title: 'Feedback indicators / Skeleton Body Text',
    component: PSkeletonBodyText,
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PSkeletonBodyText
    },
    template: `
        <PSkeletonBodyText
            v-bind="args"
        />`,
});

export const SkeletonBodyText = Template.bind({});

SkeletonBodyText.args = {
    lines: 5,
}

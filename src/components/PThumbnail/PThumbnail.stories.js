import PThumbnail from './PThumbnail';

export default {
    title: 'Images & Icons / Thumbnail',
    component: PThumbnail,
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
        PThumbnail,
    },
    template: `
        <PThumbnail
            v-bind="$props"
        ></PThumbnail>`,
});

export const Thumbnail = Template.bind({});

Thumbnail.args = {
    alt: 'Black choker necklace',
    source: 'https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg',
}

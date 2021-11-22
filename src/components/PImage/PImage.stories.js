import { PImage } from './index.js';

export default {
    title: 'Images & Icons / Image',
    component: PImage,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        height: {
            description: 'Image height',
        },
        width: {
            description: 'Image width',
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PImage,
    },
    template: `<PImage v-bind="$props"/>`
});

export const Image = Template.bind({});

Image.args = {
    source: "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
    alt: "Black choker necklace",
    height: 100,
    width: 100,
}

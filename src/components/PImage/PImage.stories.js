import { PImage } from './index';

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

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PImage,
    },
    template: `
        <PImage v-bind="args"/>`
});

export const Image = Template.bind({});

Image.args = {
    source: "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
    alt: "Black choker necklace",
    height: 100,
    width: 100,
}

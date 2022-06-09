import { PThumbnail } from './index';

export default {
    title: 'Images & Icons / Thumbnail',
    component: PThumbnail,
    parameters: {
        layout: 'centered',
    },
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
        PThumbnail,
    },
    template: `
        <PThumbnail
            v-bind="args"
        ></PThumbnail>`,
});

export const Thumbnail = Template.bind({});

Thumbnail.args = {
    alt: 'Black choker necklace',
    source: 'https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg',
}

Thumbnail.parameters= {
    docs: {
        source: {
            code: `<PThumbnail/>`
        },
    },
};

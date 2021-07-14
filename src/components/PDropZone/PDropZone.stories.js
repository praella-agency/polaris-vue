import {PDropZone} from "./index";

export default {
    title: 'Actions / DropZone',
    component: PDropZone,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PDropZone
    },
    template: `
        <PDropZone></PDropZone>`,
})

export const DropZone = Template.bind({});

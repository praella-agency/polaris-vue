import {PDropZone} from './index';
import PFileUpload from './components/PFileUpload';

export default {
    title: 'Actions / Drop Zone',
    component: PDropZone,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PDropZone, PFileUpload
    },
    data() {
        return {
            images: [],
        };
    },
    template: `
        <PDropZone
            v-bind="$props"
            :handleOnDrop="handleDropZoneDrop"
            :files="images"
        >
        </PDropZone>`,
    methods: {
        handleDropZoneDrop(files, acceptedFiles, rejectedFiles) {
            acceptedFiles.map((file) => {
                this.images.push(file);
            })
        },
    },
})

export const DropZone = Template.bind({});

DropZone.args = {
    allowMultiple: true,
}

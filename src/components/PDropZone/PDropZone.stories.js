import {PDropZone} from './index';
import {PStack} from '../PStack';
import {PThumbnail} from '../PThumbnail';
import {PCaption} from '../PCaption';
import PFileUpload from './components/PFileUpload';
import {NoteMinor} from '../../assets/shopify-polaris-icons/index';

export default {
    title: 'Actions / Drop Zone',
    component: PDropZone,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PDropZone, PStack, PThumbnail, PCaption, PFileUpload,
    },
    data() {
        return {
            files: [],
        };
    },
    template: `
        <PDropZone
            v-bind="$props"
            :handleOnDrop="handleDropZoneDrop"
        >
            <PStack
                v-for="(file, key) in this.files"
                :key="key"
                alignment="center"
                v-slot="uploadedFiles"
            >
                <PThumbnail 
                    size="small" 
                    :alt="file.name" 
                    :source="['image/gif', 'image/jpeg', 'image/png'].includes(file.type) ? 
                        URL.createObjectURL(file) : 'NoteMinor'"
                />
                <div>
                    {{ file.name }} <PCaption>{{ file.size }} bytes</PCaption> 
                </div> 
            </PStack>
            <PFileUpload v-if="!files.length" />
        </PDropZone>`,
    methods: {
        handleDropZoneDrop(files, acceptedFiles, rejectedFiles) {
            console.log(files, acceptedFiles, rejectedFiles);
            this.files.push(files, acceptedFiles);
        },
    },
})

export const DropZone = Template.bind({});

DropZone.args = {
    allowMultiple: false,
}

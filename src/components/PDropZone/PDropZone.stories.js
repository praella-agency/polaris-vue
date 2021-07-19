import {PDropZone} from './index';
import {PStack, PStackItem} from '../PStack';
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
        PDropZone, PStack, PThumbnail, PCaption, PFileUpload,PStackItem
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
            :files="files"
        >
            <PStack
                v-for="(file, key) in this.files"
                :key="key"
                alignment="center"
                v-slot="uploadedFiles"
            >
                <PStackItem>
                  <PThumbnail
                      size="small"
                      :alt="file.name"
                      :source="['image/gif', 'image/jpeg', 'image/png'].indexOf(file.type) > -1 ? 
                        createUrl(file) : NoteMinor"
                  />
                </PStackItem>
                <PStackItem>
                  <div>
                    {{ file.name }} <PCaption>{{ file.size }} bytes</PCaption>
                  </div>
                </PStackItem>
            </PStack>
            <PFileUpload v-if="!files.length" />
        </PDropZone>`,
    methods: {
        handleDropZoneDrop(files, acceptedFiles, rejectedFiles) {
            acceptedFiles.map((file) => {
                this.files.push(file);
            })
        },
        createUrl(file) {
            return window.URL.createObjectURL(file);
        }
    },
})

export const DropZone = Template.bind({});

DropZone.args = {
    allowMultiple: true,
    disabled: true,
}

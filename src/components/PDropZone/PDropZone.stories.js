import { PDropZone } from './index';
import { PCard } from '../PCard';
import { PCardHeader } from '../PCard/components/PCardHeader';
import { PCardSection } from '../PCard/components/PCardSection';

export default {
    title: 'Actions / Drop Zone',
    component: PDropZone,
    argTypes: {
        type: {
            options: ['file', 'image'],
            control: {
                type: 'select',
            },
        },
        // size: {
        //     options: ['extraLarge', 'large'],
        //     control: {
        //         type: 'select',
        //     },
        // },
        validImageTypes: {
            control: {
                type: 'array',
            },
            table: {
                type: {
                    summary: 'array',
                },
                defaultValue: {
                    summary: '[]',
                    detail: `
['image/gif', 'image/jpeg', 'image/png']`,
                },
            },
        },
        uploadFiles: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        files: {
            table: {
                type: {
                    summary: 'array',
                },
                defaultValue: {
                    summary: '[]',
                },
            },
        },
        id: {
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        handleOnDrop: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: {
                    summary: '()',
                    detail: `(files: File[], acceptedFiles: File[], rejectedFiles: File[]): void => {}`,
                },
            },
        },
        handleOnDropAccepted: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: {
                    summary: '()',
                    detail: `(acceptedFiles: File[]): void => {}`,
                },
            },
        },
        handleOnDropRejected: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: {
                    summary: '()',
                    detail: `(rejectedFiles: File[]): void => {}`,
                },
            },
        },
        handleOnFileDialogClose: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: {
                    summary: '()',
                    detail: `(): void => {}`,
                },
            },
        },
        handleOnDragOver: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: {
                    summary: '()',
                    detail: `(): void => {}`,
                },
            },
        },
        handleOnDragLeave: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: {
                    summary: '()',
                    detail: `(): void => {}`,
                },
            },
        },
        handleOnDragEnter: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: {
                    summary: '()',
                    detail: `(): void => {}`,
                },
            },
        },
        blur: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
        },
        focus: {
            control: {
                type: null,
            },
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
                },
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PDropZone
    },
    data() {
        return {
            images: [],
        };
    },
    template: `
        <PDropZone
            :handleOnDrop="handleDropZoneDrop"
            :files="images"
            v-bind="args"
        />`,
    methods: {
        handleDropZoneDrop(files, acceptedFiles, rejectedFiles) {
            acceptedFiles.map((file) => {
                this.images.push(file);
            });
        },
    },
})

export const DropZone = Template.bind({});

DropZone.args = {
    type: "image"
}

DropZone.parameters = {
    docs: {
        source: {
            code: `<PDropZone/>`
        },
    },
};

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PCard, PCardHeader, PCardSection, PDropZone
    },
    data() {
        return {
            images: [],
            openFilesDialog: false,
        };
    },
    template: `
        <PCard>
            <PCardHeader
                title="Product Images"
                :actions='[{
                    content: "Upload Image",
                    onAction: toggleOpenFileDialog,
                }]'
            />
            <PCardSection>
                <PDropZone
                    :files="images"
                    :openFileDialog="openFilesDialog"
                    :handleOnDrop="handleDropZoneDrop"
                    :handleOnFileDialogClose="toggleCloseFileDialog"
                    v-bind="args"
                />
            </PCardSection>
        </PCard>`,
    methods: {
        toggleOpenFileDialog() {
            this.openFilesDialog = true;
        },
        toggleCloseFileDialog() {
            this.openFilesDialog = false;
        },
        handleDropZoneDrop(files, acceptedFiles, rejectedFiles) {
            acceptedFiles.map((file) => {
                this.images.push(file);
            });
        },
    }
})

export const DropZoneWithCustomFileDialogTrigger = Template1.bind({});

DropZoneWithCustomFileDialogTrigger.args = {
    validImageTypes: ['image/gif', 'image/jpeg', 'image/png'],
}

DropZoneWithCustomFileDialogTrigger.parameters = {
    docs: {
        source: {
            code: `
<PCard>
    <PCardHeadertitle="Product Images"/>
    <PCardSection>
        <PDropZone/>
    </PCardSection>
</PCard>`
        },
    },
};

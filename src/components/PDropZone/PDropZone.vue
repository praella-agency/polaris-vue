<template>
    <div :style="styleBasedOnSize">
        <PLabelled
            :id="id"
            :label="label"
            :action="labelAction"
            :labelHidden="label ? labelHidden : true"
        >
            <div
                ref="node"
                :class="className"
                :aria-disabled="disabled"
                @click="handleOnClick"
                @dragstart="stopEvent"
            >
                <template
                    v-if="(active || dragging) && !intervalError && !error && overlay"
                >
                    <div
                        :class="overlayClassName"
                    >
                        <PStack vertical spacing="tight">
                            <!--                            <PIcon v-if="size === 'small'" source="UploadMajor" color="interactive"/>-->
                            <PDisplayText v-if="size === 'extraLarge'" size="small" element="p">
                                {{ overlayTextWithDefault }}
                            </PDisplayText>
                        </PStack>
                    </div>
                </template>
                <template
                    v-if="dragging && (intervalError || error)"
                >
                    <div
                        :class="overlayClassName"
                    >
                        <PStack vertical spacing="tight">
                            <!--                            <PIcon v-if="size === 'small'" source="CircleAlertMajor" color="critical"/>-->
                            <PDisplayText v-if="size === 'extraLarge'" size="small" element="p">
                                {{ errorOverlayTextWithDefault }}
                            </PDisplayText>
                        </PStack>
                    </div>
                </template>
                <span class="Polaris-VisuallyHidden">
                    <!--
                        Triggered on focus
                        @event focus
                    -->
                    <!--
                        Triggered on blur
                        @event blur
                    -->
                    <PDropZoneInput
                        :id="id"
                        :accept="accept"
                        :disabled="disabled"
                        :type="type"
                        :multiple="allowMultiple"
                        @change="handleDrop"
                        @focus="$emit('focus', $event)"
                        @blur="$emit('blur', $event)"
                        :openFileDialog="openFileDialog"
                        :onFileDialogClose="handleOnFileDialogClose"
                    />
                </span>
                <div
                    class="Polaris-DropZone__Container"
                >
                    <PFileUpload
                        v-if="!files.length"
                        :disabled="disabled"
                        :variableHeight="variableHeight"
                        :size="size"
                        :actionTitle="actionTitle"
                        :actionHint="actionHint"
                    />
                    <!-- @slot Preview uploaded files -->
                    <slot name="uploadFiles" v-if="uploadedFiles && files.length > 0">
                        <PStack
                            v-for="(file, key) in files"
                            :key="key"
                            alignment="center"
                        >
                            <PStackItem>
                                <PThumbnail
                                    size="small"
                                    :alt="file.name"
                                    :source="validImageTypes.indexOf(file.type) > -1
                                                 ? createFileURL(file)
                                                 : NoteMinor"
                                />
                            </PStackItem>
                            <PStackItem>
                                <div>
                                    {{ file.name }}
                                    <PCaption>{{ file.size }} bytes</PCaption>
                                </div>
                            </PStackItem>
                            <PStackItem>
                                <PIcon
                                    source="CircleCancelMinor"
                                    color="critical"
                                    @click.native.stop="removeFiles(key)"
                                />
                            </PStackItem>
                        </PStack>
                    </slot>
                </div>
            </div>
        </PLabelled>
    </div>
</template>

<script>
    import { classNames, variationName } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PCaption } from '../../components/PCaption';
    import { PDisplayText } from '../../components/PDisplayText';
    import { PFileUpload } from '../../components/PDropZone/components/PFileUpload';
    import { PDropZoneInput } from '../../components/PDropZone/components/PDropZoneInput';
    import { PLabelled } from '../../components/PLabelled';
    import { PThumbnail } from '../../components/PThumbnail';
    import { Action } from '../../types';
    import { NoteMinor } from '../../assets/shopify-polaris-icons';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import {
        fileAccepted,
        isServer,
        getDataTransferFiles,
        useToggle,
    } from './context';

    const {
        value: focused,
        setTrue: handleFocus,
        setFalse: handleBlur,
    } = useToggle(false);

    const DropZoneFileType = ['file', 'image'];

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The drop zone component lets users upload files by dragging and dropping the files into an area on a
     *  page, or activating a button.</h4>
     */
    export default {
        name: 'PDropZone',
        components: {
            PIcon, PStack, PCaption, PDisplayText, PFileUpload, PLabelled, PDropZoneInput, PThumbnail, PStackItem,
        },
        props: {
            /**
             * Label for the file input
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Adds an action to the label
             */
            labelAction: {
                type: Object,
            },
            /**
             * Visually hide the label
             */
            labelHidden: {
                type: Boolean,
                default: false,
            },
            /**
             * ID for file input
             */
            id: {
                type: [Number, String],
                default: `PDropZone${new Date().getUTCMilliseconds()}`,
            },
            /**
             * Allowed file types
             */
            accept: {
                type: String,
                default: null,
            },
            /**
             * Whether is a file or an image
             * @default 'file'
             */
            type: {
                type: [String, DropZoneFileType],
                default: 'file',
            },
            /**
             * Sets an active state
             */
            active: {
                type: Boolean,
                default: false,
            },
            /**
             * Sets an error state
             */
            error: {
                type: Boolean,
                default: false,
            },
            /**
             * Displays an outline border
             * @default true
             */
            outline: {
                type: Boolean,
                default: true,
            },
            /**
             * Displays an overlay on hover
             * @default true
             */
            overlay: {
                type: Boolean,
                default: true,
            },
            /**
             * Text that appears in the overlay
             */
            overlayText: {
                type: String,
                default: null,
            },
            /**
             * Text that appears in the overlay when set in error state
             */
            errorOverlayText: {
                type: String,
                default: null,
            },
            /**
             * Allows multiple files to be uploaded at once
             * @default true
             */
            allowMultiple: {
                type: Boolean,
                default: true,
            },
            /**
             * Sets a disabled state
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Allows a file to be dropped anywhere on the page
             */
            dropOnPage: {
                type: Boolean,
                default: false,
            },
            /**
             * Sets the default file dialog state
             */
            openFileDialog: {
                type: Boolean,
                default: false,
            },
            /**
             * Allows child content to adjust height
             */
            variableHeight: {
                type: Boolean,
                default: false,
            },
            // /**
            //  * Adds custom validations
            //  */
            // customValidator: {
            //     type: Boolean,
            //     default: false,
            // },
            /**
             *  Callback triggered on any file drop
             */
            handleOnDrop: {
                type: Function,
                // tslint:disable-next-line:no-empty
                default: (files, acceptedFiles, rejectedFiles) => ({}),
                required: true,
            },
            /**
             * Callback triggered when at least one of the files dropped was accepted
             */
            handleOnDropAccepted: {
                type: Function,
                // tslint:disable-next-line:no-empty
                default: (acceptedFiles) => ({}),
            },
            /**
             * Callback triggered when at least one of the files dropped was rejected
             */
            handleOnDropRejected: {
                type: Function,
                // tslint:disable-next-line:no-empty
                default: (rejectedFiles) => ({}),
            },
            /**
             * Callback triggered when one or more files are dragging over the drag area
             */
            handleOnDragOver: {
                type: Function,
                // tslint:disable-next-line:no-empty
                default: () => ({}),
            },
            /**
             * Callback triggered when one or more files entered the drag area
             */
            handleOnDragEnter: {
                type: Function,
                // tslint:disable-next-line:no-empty
                default: () => ({}),
            },
            /**
             * Callback triggered when one or more files left the drag area
             */
            handleOnDragLeave: {
                type: Function,
                // tslint:disable-next-line:no-empty
                default: () => ({}),
            },
            /**
             * Callback triggered when the file dialog is canceled
             */
            handleOnFileDialogClose: {
                type: Function,
                // tslint:disable-next-line:no-empty
                default: () => ({}),
            },
            /**
             * Files
             */
            files: {
                type: Array,
                default: () => ([]),
                required: true,
            },
            /**
             * Display Uploaded Files in DropZone
             */
            uploadedFiles: {
                type: Boolean,
                default: true,
            },
            // /**
            //  * Change size of the DropZone
            //  */
            // size: {
            //     type: String,
            //     default: 'extraLarge',
            // },
            /**
             * Valid Image Types to preview images
             */
            validImageTypes: {
                type: Array,
                default: () => ['image/gif', 'image/jpeg', 'image/png'],
            },
            /**
             * Set the actionTitle
             */
            actionTitle: {
                type: String,
                default: `Add files`,
            },
            /**
             * Set the actionHint
             */
            actionHint: {
                type: String,
                default: `or drop files to upload`,
            },
        },
        data() {
            return {
                dragTargets: [],
                size: 'extraLarge',
                dragging: false,
                intervalError: false,
                measuring: true,
                NoteMinor: NoteMinor,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-DropZone',
                    this.outline && 'Polaris-DropZone--hasOutline',
                    focused && 'Polaris-DropZone--focused',
                    (this.active || this.dragging) && 'Polaris-DropZone--isDragging',
                    this.disabled && 'Polaris-DropZone--isDisabled',
                    (this.intervalError || this.error) && 'Polaris-DropZone--hasError',
                    !this.variableHeight && `Polaris-DropZone--${variationName('size', this.size)}`,
                    this.measuring && 'Polaris-DropZone--measuring',
                );
            },
            overlayClassName() {
                return classNames(
                    'Polaris-DropZone__Overlay',
                );
            },
            overlayTextWithDefault() {
                if (!this.overlayText && this.allowMultiple) {
                    return 'Drop files to upload';
                } else if (!this.overlayText && !this.allowMultiple) {
                    return 'Drop file to upload';
                } else {
                    return this.overlayText;
                }
            },
            errorOverlayTextWithDefault() {
                if (!this.errorOverlayText) {
                    return 'File type is not valid';
                } else {
                    return this.errorOverlayText;
                }
            },
            context() {
                const type = this.type || 'file';
                return [this.disabled, focused, this.size, type, this.measuring, this.allowMultiple];
            },
            styleBasedOnSize() {
                // if (this.size === 'small') {
                //   return 'width: 50px; height: 50px;';
                // } else if(this.size === 'medium') {
                //   return 'width: 114px; height: 114px;';
                // }
                return '';
            },
        },
        methods: {
            stopEvent(event) {
                event.preventDefault();
                event.stopPropagation();
            },
            getValidatedFiles(files) {
                const acceptedFiles = [];
                const rejectedFiles = [];

                Array.from(files).forEach((file) => {
                    !fileAccepted(file, this.accept) ? rejectedFiles.push(file) : acceptedFiles.push(file);
                });

                if (!this.allowMultiple) {
                    acceptedFiles.slice(1, acceptedFiles.length);
                    rejectedFiles.push(...acceptedFiles.slice(1));
                }

                return {files, acceptedFiles, rejectedFiles};
            },
            handleDrop(event) {
                this.stopEvent(event);
                if (this.disabled) {
                    return;
                }
                const fileList = getDataTransferFiles(event);

                const {files, acceptedFiles, rejectedFiles} = this.getValidatedFiles(fileList);

                this.dragTargets = [];
                this.dragging = false;
                this.intervalError = rejectedFiles.length > 0;

                // tslint:disable-next-line:no-unused-expression
                this.handleOnDrop && this.handleOnDrop(files, acceptedFiles, rejectedFiles);
                // tslint:disable-next-line:no-unused-expression
                this.handleOnDropAccepted && acceptedFiles.length && this.handleOnDropAccepted(acceptedFiles);
                // tslint:disable-next-line:no-unused-expression
                this.handleOnDropRejected && rejectedFiles.length && this.handleOnDropRejected(rejectedFiles);

                (event.target).value = '';
            },
            handleDragOver(event) {
                this.stopEvent(event);
                if (this.disabled) {
                    return;
                }
                // tslint:disable-next-line:no-unused-expression
                this.handleOnDragOver && this.handleOnDragOver();
            },
            handleDragEnter(event) {
                this.stopEvent(event);
                if (this.disabled) {
                    return;
                }

                const fileList = getDataTransferFiles(event);

                if (event.target && !this.dragTargets.includes(event.target)) {
                    this.dragTargets.push(event.target);
                }

                if (this.dragging) {
                    return;
                }

                const {rejectedFiles} = this.getValidatedFiles(fileList);
                this.dragging = true;
                this.intervalError = rejectedFiles.length > 0;

                // tslint:disable-next-line:no-unused-expression
                this.handleOnDragEnter && this.handleOnDragEnter();
            },
            handleDragLeave(event) {
                event.preventDefault();

                if (this.disabled) {
                    return;
                }

                this.dragTargets = this.dragTargets.filter((el) => {
                    const compareNode = this.dropOnPage && !isServer ? document : this.$refs.node;

                    return el !== event.target && compareNode && compareNode.contains(el);
                });

                if (this.dragTargets.length > 0) {
                    return;
                }

                this.dragging = false;
                this.intervalError = false;

                // tslint:disable-next-line:no-unused-expression
                this.handleOnDragLeave && this.handleOnDragLeave();
            },
            adjustSize() {
                if (!this.$refs.node) {
                    return;
                }

                if (this.variableHeight) {
                    this.measuring = false;
                    return;
                }

                let size = 'extraLarge';
                const width = this.$refs.node.getBoundingClientRect().width;

                if (width < 100) {
                    size = 'small';
                } else if (width < 160) {
                    size = 'medium';
                } else if (width < 300) {
                    size = 'large';
                }

                this.size = size;
                // tslint:disable-next-line:no-unused-expression
                this.measuring && (this.measuring = false);
            },
            /**
             * Callback triggered on click
             */
            handleOnClick() {
                if (this.disabled) {
                    return;
                }

                return onclick ? onclick : this.open();
            },
            open() {
                const fileInputNode = this.$refs.node && this.$refs.node.querySelector(`#${this.id}`);
                // tslint:disable-next-line:no-unused-expression
                fileInputNode && fileInputNode instanceof HTMLElement && fileInputNode.click();
            },
            createFileURL(file) {
                return window.URL.createObjectURL(file);
            },
            removeFiles(key) {
                this.files.splice(key, 1);
            },
        },
        mounted() {
            this.adjustSize();
            const dropNode = this.dropOnPage ? document : this.$refs.node;
            if (!dropNode) {
                return;
            }

            dropNode.addEventListener('drop', this.handleDrop);
            dropNode.addEventListener('dragover', this.handleDragOver);
            dropNode.addEventListener('dragenter', this.handleDragEnter);
            dropNode.addEventListener('dragleave', this.handleDragLeave);
            window.addEventListener('resize', this.adjustSize);
        },
        destroyed() {
            const dropNode = this.dropOnPage ? document : this.$refs.node;
            if (!dropNode) {
                return;
            }

            dropNode.removeEventListener('drop', this.handleDrop);
            dropNode.removeEventListener('dragover', this.handleDragOver);
            dropNode.removeEventListener('dragenter', this.handleDragEnter);
            dropNode.removeEventListener('dragleave', this.handleDragLeave);
            window.removeEventListener('resize', this.adjustSize);
        },
    }
</script>

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
                    <PFileUpload v-if="!files.length"
                                 :disabled="disabled"
                                 :variableHeight="variableHeight"
                                 :size="size"
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

<script lang="ts">
  import {Component, Vue, Prop, Emit, Ref} from 'vue-property-decorator';
  import {classNames, variationName} from '@/utilities/css';
  import {PIcon} from '@/components/PIcon';
  import {PStack, PStackItem} from '@/components/PStack';
  import {PCaption} from '@/components/PCaption';
  import {PDisplayText} from '@/components/PDisplayText';
  import PFileUpload from './components/PFileUpload.vue';
  import PDropZoneInput from './components/PDropZoneInput.vue';
  import {PLabelled} from '@/components/PLabelled';
  import {PThumbnail} from '@/components/PThumbnail';
  import {Action} from '@/types';
  import {NoteMinor} from "@/assets/shopify-polaris-icons";

  import {
    fileAccepted,
    isServer,
    getDataTransferFiles,
    useToggle
  } from './context';

  const {
    value: focused,
    setTrue: handleFocus,
    setFalse: handleBlur,
  } = useToggle(false);

  type DropZoneFileType = 'file' | 'image';

  @Component({
    components: {
      PIcon, PStack, PCaption, PDisplayText, PFileUpload, PLabelled, PDropZoneInput, PThumbnail, PStackItem
    },
  })
  export default class PDropZone extends Vue {
    /**
     * Label for the file input
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * Adds an action to the label
     */
    @Prop({type: Function}) public labelAction!: Action;

    /**
     * Visually hide the label
     */
    @Prop({type: Boolean, default: false}) public labelHidden!: boolean;

    /**
     * ID for file input
     */
    @Prop({type: String, default: `PDropZone${new Date().getUTCMilliseconds()}`}) public id!: string;

    /**
     * Allowed file types
     */
    @Prop({type: String, default: null}) public accept!: string;

    /**
     * Whether is a file or an image
     * @default 'file'
     */
    @Prop({type: String, default: 'file'}) public type!: DropZoneFileType;

    /**
     * Sets an active state
     */
    @Prop({type: Boolean, default: false}) public active!: boolean;

    /**
     * Sets an error state
     */
    @Prop({type: Boolean, default: false}) public error!: boolean;

    /**
     * Displays an outline border
     * @default true
     */
    @Prop({type: Boolean, default: true}) public outline!: boolean;

    /**
     * Displays an overlay on hover
     * @default true
     */
    @Prop({type: Boolean, default: true}) public overlay!: boolean;

    /**
     * Text that appears in the overlay
     */
    @Prop({type: String, default: null}) public overlayText!: string;

    /**
     * Text that appears in the overlay when set in error state
     */
    @Prop({type: String, default: null}) public errorOverlayText!: string;

    /**
     * Allows multiple files to be uploaded at once
     * @default true
     */
    @Prop({type: Boolean, default: true}) public allowMultiple!: boolean;

    /**
     * Sets a disabled state
     */
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    /**
     * Allows a file to be dropped anywhere on the page
     */
    @Prop({type: Boolean, default: false}) public dropOnPage!: boolean;

    /**
     * Sets the default file dialog state
     */
    @Prop({type: Boolean, default: false}) public openFileDialog!: boolean;

    /**
     * Allows child content to adjust height
     */
    @Prop({type: Boolean, default: false}) public variableHeight!: boolean;

    // /**
    //  * Adds custom validations
    //  */
    // @Prop({type: Boolean, default: false}) public customValidator!: boolean;

    /**
     *  Callback triggered on any file drop
     */
    @Prop({
      type: Function,
      default: (files: File[], acceptedFiles: File[], rejectedFiles: File[]): void => {
      }
    }) public handleOnDrop!: any;

    /**
     * Callback triggered when at least one of the files dropped was accepted
     */
    @Prop({
      type: Function,
      default: (acceptedFiles: File[]): void => {
      }
    }) public handleOnDropAccepted!: any;

    /**
     * Callback triggered when at least one of the files dropped was rejected
     */
    @Prop({
      type: Function,
      default: (rejectedFiles: File[]): void => {
      }
    }) public handleOnDropRejected!: any;

    /**
     * Callback triggered when one or more files are dragging over the drag area
     */
    @Prop({
      type: Function,
      default: (): void => {
      }
    }) public handleOnDragOver!: any;

    /**
     * Callback triggered when one or more files entered the drag area
     */
    @Prop({
      type: Function,
      default: (): void => {
      }
    }) public handleOnDragEnter!: any;

    /**
     * Callback triggered when one or more files left the drag area
     */
    @Prop({
      type: Function,
      default: (): void => {
      }
    }) public handleOnDragLeave!: any;

    /**
     * Callback triggered when the file dialog is canceled
     */
    @Prop({
      type: Function,
      default: (): void => {
      }
    }) public handleOnFileDialogClose!: any;

    /**
     * Files
     */
    @Prop({type: Array, default: [], required: true}) public files!: [];

    /**
     * Display Uploaded Files in DropZone
     */
    @Prop({type: Boolean, default: true}) public uploadedFiles!: boolean;

    // /**
    //  * Change size of the DropZone
    //  * @originalValues extraLarge | large | medium | small
    //  * @values extraLarge | large
    //  */
    // @Prop({type: String, default: 'extraLarge'}) public size!: string;

    /**
     * Valid Image Types to preview images
     */
    @Prop({type: [Array, String], default: null}) public validImageTypes!: [];

    @Ref() node!: HTMLDivElement;

    public dragTargets: EventTarget[] = [];

    public size = 'extraLarge';

    public dragging = false;
    public intervalError = false;
    public measuring = true;

    public NoteMinor = NoteMinor

    public stopEvent(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
    }

    public getValidatedFiles(files: File[] | DataTransferItem[] | ArrayLike<File>) {
      const acceptedFiles: File[] = [];
      const rejectedFiles: File[] = [];

      Array.from(files as File[]).forEach((file: File) => {
        !fileAccepted(file, this.accept) ? rejectedFiles.push(file) : acceptedFiles.push(file);
      });

      if (!this.allowMultiple) {
        acceptedFiles.slice(1, acceptedFiles.length);
        rejectedFiles.push(...acceptedFiles.slice(1));
      }

      return {files, acceptedFiles, rejectedFiles};
    }

    public handleDrop(event: DragEvent) {
      this.stopEvent(event);
      if (this.disabled) {
        return;
      }
      const fileList = getDataTransferFiles(event) as ArrayLike<File>;

      const {files, acceptedFiles, rejectedFiles} = this.getValidatedFiles(fileList);

      this.dragTargets = [];
      this.dragging = false;
      this.intervalError = rejectedFiles.length > 0;

      this.handleOnDrop && this.handleOnDrop(files as File[], acceptedFiles, rejectedFiles);
      this.handleOnDropAccepted && acceptedFiles.length && this.handleOnDropAccepted(acceptedFiles);
      this.handleOnDropRejected && rejectedFiles.length && this.handleOnDropRejected(rejectedFiles);

      (event.target as HTMLInputElement).value = '';
    }

    public handleDragOver(event: DragEvent) {
      this.stopEvent(event);
      if (this.disabled) {
        return;
      }
      this.handleOnDragOver && this.handleOnDragOver();
    }

    public handleDragEnter(event: DragEvent) {
      this.stopEvent(event);
      if (this.disabled) {
        return;
      }

      const fileList = getDataTransferFiles(event) as ArrayLike<File>;

      if (event.target && !this.dragTargets.includes(event.target)) {
        this.dragTargets.push(event.target);
      }

      if (this.dragging) {
        return;
      }

      const {rejectedFiles} = this.getValidatedFiles(fileList);
      this.dragging = true;
      this.intervalError = rejectedFiles.length > 0;

      this.handleOnDragEnter && this.handleOnDragEnter();
    }

    public handleDragLeave(event: DragEvent) {
      event.preventDefault();

      if (this.disabled) {
        return;
      }

      this.dragTargets = this.dragTargets.filter((el) => {
        const compareNode = this.dropOnPage && !isServer ? document : this.node;

        return el !== event.target && compareNode && compareNode.contains(el as Node);
      });

      if (this.dragTargets.length > 0) {
        return;
      }

      this.dragging = false;
      this.intervalError = false;

      this.handleOnDragLeave && this.handleOnDragLeave();
    }

    public adjustSize() {
      if (!this.node) {
        return;
      }

      if (this.variableHeight) {
        this.measuring = false;
        return;
      }

      let size = 'extraLarge';
      const width = this.node.getBoundingClientRect().width;

      if (width < 100) {
        size = 'small';
      } else if (width < 160) {
        size = 'medium';
      } else if (width < 300) {
        size = 'large';
      }

      this.size = size;
      this.measuring && (this.measuring = false);
    }

    public mounted() {
      this.adjustSize();
      const dropNode = this.dropOnPage ? document : this.node;
      if (!dropNode) {
        return;
      }

      dropNode.addEventListener('drop', this.handleDrop as EventListener);
      dropNode.addEventListener('dragover', this.handleDragOver as EventListener);
      dropNode.addEventListener('dragenter', this.handleDragEnter as EventListener);
      dropNode.addEventListener('dragleave', this.handleDragLeave as EventListener);
      window.addEventListener('resize', this.adjustSize);
    }

    public destroyed() {
      const dropNode = this.dropOnPage ? document : this.node;
      if (!dropNode) {
        return;
      }

      dropNode.removeEventListener('drop', this.handleDrop as EventListener);
      dropNode.removeEventListener('dragover', this.handleDragOver as EventListener);
      dropNode.removeEventListener('dragenter', this.handleDragEnter as EventListener);
      dropNode.removeEventListener('dragleave', this.handleDragLeave as EventListener);
      window.removeEventListener('resize', this.adjustSize);
    }

    /**
     * Callback triggered on click
     */
    public handleOnClick() {
      if (this.disabled) {
        return;
      }

      return onclick ? onclick : this.open();
    }

    public open() {
      let fileInputNode = this.node && this.node.querySelector(`#${this.id}`);
      fileInputNode && fileInputNode instanceof HTMLElement && fileInputNode.click();
    }

    public createFileURL(file) {
      return window.URL.createObjectURL(file);
    }

    public removeFiles(key) {
      console.log(this.files, key);
      this.files.splice(key, 1);
    }

    public get className() {
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
    }

    public get overlayClassName() {
      return classNames(
        'Polaris-DropZone__Overlay',
      );
    }

    public get overlayTextWithDefault() {
      if (!this.overlayText && this.allowMultiple) {
        return 'Drop files to upload';
      } else if (!this.overlayText && !this.allowMultiple) {
        return 'Drop file to upload';
      } else {
        return this.overlayText;
      }
    }

    public get errorOverlayTextWithDefault() {
      if (!this.errorOverlayText) {
        return 'File type is not valid';
      } else {
        return this.errorOverlayText;
      }
    }

    public get context() {
      let type = this.type || 'file';
      return [this.disabled, focused, this.size, type, this.measuring, this.allowMultiple];
    }

    public get styleBasedOnSize() {
      // if (this.size === 'small') {
      //   return 'width: 50px; height: 50px;';
      // } else if(this.size === 'medium') {
      //   return 'width: 114px; height: 114px;';
      // }
      return '';
    }
  }
</script>

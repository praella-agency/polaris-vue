<template>
    <div :value="context">
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
                            <PIcon v-if="size === 'small'" source="UploadMajor" color="interactive"/>
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
                            <PIcon v-if="size === 'small'" source="CircleAlertMajor" color="critical"/>
                            <PDisplayText v-if="size === 'extraLarge'" size="small" element="p">
                                {{ errorOverlayTextWithDefault }}
                            </PDisplayText>
                        </PStack>
                    </div>
                </template>
                <span class="Polaris-VisuallyHidden">
                    <PDropZoneInput
                        :id="id"
                        :accept="accept"
                        :disabled="disabled"
                        :type="type"
                        :multiple="allowMultiple"
                        @change="handleDrop"
                        @focus="handleFocus"
                        @blue="handleBlur"
                        :openFileDialog="openFileDialog"
                        :onFileDialogClose="handleOnFileDialogClose"
                    />
                </span>
                <div
                    class="Polaris-DropZone__Container"
                >
                    <slot />
                </div>
            </div>
        </PLabelled>
    </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
  import {classNames, variationName} from '@/utilities/css';
  import {PIcon} from '@/components/PIcon';
  import {PStack} from '@/components/PStack';
  import {PCaption} from '@/components/PCaption';
  import {PDisplayText} from '@/components/PDisplayText';
  import {PFileUpload, PDropZoneInput} from './components/index';
  import {PLabelled} from '@/components/PLabelled';
  import {Action} from '@/types';
  import {
    Context,
    fileAccepted,
    defaultAllowMultiple,
    createAllowMultipleKey,
    capitalize,
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
      PIcon, PStack, PCaption, PDisplayText, PFileUpload, PLabelled, PDropZoneInput
    },
  })
  export default class PDropZone extends Vue {
    /**
     * Label for the file input
     */
    @Prop({
      type: String,
      default: 'Polaris.DropZone.' + this.allowMultipleKey + '.label' + this.typeSuffix
    }) public label!: string;

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
    @Prop({type: Boolean, default: defaultAllowMultiple}) public allowMultiple!: boolean;

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

    /**
     * Adds custom validations
     */
    @Prop({type: Boolean, default: false}) public customValidator(file: File): boolean;

    public dragging = false;
    public intervalError = false;
    public size = 'extraLarge';
    public measuring = true;

    public allowMultipleKey = createAllowMultipleKey(this.allowMultiple);
    public typeSuffix = capitalize(this.type);

    /** Callback triggered on click */
    @Emit()
    public handleOnClick(event) {
      return event;
    }

    /** Callback triggered on any file drop */
    @Emit()
    public handleOnDrop(file: File[], acceptedFiles: File[], rejectedFiles: File[]) {

    }

    /** Callback triggered when at least one of the files dropped was accepted */
    @Emit()
    public handleOnDropAccepted(acceptedFiles: File[]) {

    }

    /** Callback triggered when at least one of the files dropped was rejected */
    @Emit()
    public handleOnDropRejected(rejectedFiles: File[]) {

    }

    /** Callback triggered when one or more files are dragging over the drag area */
    @Emit()
    public handleOnDragOver() {

    }

    /** Callback triggered when one or more files entered the drag area */
    @Emit()
    public handleOnDragEnter() {

    }

    /** Callback triggered when one or more files left the drag area */
    @Emit()
    public handleOnDragLeave() {

    }

    /** Callback triggered when the file dialog is canceled */
    @Emit()
    public handleOnFileDialogClose() {

    }

    // /** Callback triggered on click */
    // onClick?(event: React.MouseEvent<HTMLElement>): void;
    //
    // /** Callback triggered on any file drop */
    // onDrop?(files: File[], acceptedFiles: File[], rejectedFiles: File[]): void;
    //
    // /** Callback triggered when at least one of the files dropped was accepted */
    // onDropAccepted?(acceptedFiles: File[]): void;
    //
    // /** Callback triggered when at least one of the files dropped was rejected */
    // onDropRejected?(rejectedFiles: File[]): void;
    //
    // /** Callback triggered when one or more files are dragging over the drag area */
    // onDragOver?(): void;
    //
    // /** Callback triggered when one or more files entered the drag area */
    // onDragEnter?(): void;
    //
    // /** Callback triggered when one or more files left the drag area */
    // onDragLeave?(): void;
    //
    // /** Callback triggered when the file dialog is canceled */
    // onFileDialogClose?(): void;

    public stopEvent(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
    }

    public getValidatedFiles(files: File[] | DataTransferItem[]) {
      const acceptedFiles: File[] = [];
      const rejectedFiles: File[] = [];

      Array.from(files as File[]).forEach((file: File) => {
        !fileAccepted(file, this.accept) || (this.customValidator && !this.customValidator(file))
          ? rejectedFiles.push(file) : acceptedFiles.push(file);
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

      const fileList = getDataTransferFiles(event);
      const {files, acceptedFiles, rejectedFiles} = this.getValidatedFiles(fileList);

      // dragTargets.current = [];
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

      const fileList = getDataTransferFiles(event);

      if (event.target) {
        // if (!dragTargets.current.includes(event.target)) {
        // dragTargets.current.push(event.target);
        // }
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

      // dragTargets.current = dragTargets.current.filter((el: Node) => {
      //   const compareNode = dropOnPage && !isServer ? document : node.current;
      //
      //   return el !== event.target && compareNode && compareNode.contains(el);
      // });

      // if (dragTargets.current.length > 0) {
      //   return;
      // }

      this.dragging = false;
      this.intervalError = false;

      this.handleOnDragLeave && this.handleOnDragLeave();
    }

    public adjustSize() {
      if (!node.current) {
        return;
      }

      if (this.variableHeight) {
        this.measuring = false;
        return;
      }

      let size = 'extraLarge';
      const width = node.current.getBoundingClientRect().width;

      if (width < 100) {
        size = 'small';
      } else if (width < 160) {
        size = 'medium';
      } else if (width < 300) {
        size = 'large';
      }

      this.size = size;
      this.measuring && (this.measuring = false);

      // 50,
      //   {trailing: true},
    }

    public mounted() {
      this.adjustSize();
      const dropNode = this.dropOnPage ? document : this.$refs.node;
      if (!dropNode) {
        return;
      }

      // dropNode.addEventListener('drop', this.handleDrop);
      document.addEventListener('drop', this.handleDrop);
      document.addEventListener('dragover', this.handleDragOver);
      document.addEventListener('dragenter', this.handleDragEnter);
      document.addEventListener('dragleave', this.handleDragLeave);
      window.addEventListener('resize', this.adjustSize);
    }

    public destroyed() {
      const dropNode = this.dropOnPage ? document : this.$refs.node;
      if (!dropNode) {
        return;
      }

      // dropNode.addEventListener('drop', this.handleDrop);
      document.removeEventListener('drop', this.handleDrop);
      document.removeEventListener('dragover', this.handleDragOver);
      document.removeEventListener('dragenter', this.handleDragEnter);
      document.removeEventListener('dragleave', this.handleDragLeave);
      window.removeEventListener('resize', this.adjustSize);
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
      if (this.overlayText) {
        return this.overlayText;
      } else {
        return 'Polaris.DropZone.' + this.allowMultipleKey + '.overlayText' + this.typeSuffix;
      }
    }

    public get errorOverlayTextWithDefault() {
      if (this.errorOverlayText) {
        return this.errorOverlayText;
      } else {
        return 'Polaris.DropZone.errorOverlayText' + this.typeSuffix;
      }
    }

    public get context() {
      let type = this.type || 'file';
      return [this.disabled, focused, this.size, type, this.measuring, this.allowMultiple];
    }
  }
</script>

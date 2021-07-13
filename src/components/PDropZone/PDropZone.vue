<template>

</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {classNames, variationName} from '@/utilities/css';
  import {PIcon} from '@/components/PIcon';
  import {UploadMajor, CircleAlertMajor} from '@/assets/shopify-polaris-icons/index';
  import {PStack} from '@/components/PStack';
  import {PCaption} from '@/components/PCaption';
  import {PDisplayText} from '@/components/PDisplayText';
  import {PFileUpload} from './components/index';
  import {PLabelled} from '@/components/PLabelled';
  import {Action} from '@/types';
  import {
    Context,
    fileAccepted,
    defaultAllowMultiple,
    createAllowMultipleKey,
    capitalize,
    isServer
  } from './context';

  type DropZoneFileType = 'file' | 'image';

  @Component({
    components: {
      PIcon, PStack, PCaption, PDisplayText, PFileUpload, PLabelled,
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
    @Prop({type: String, default: null}) public id!: string;

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

    /**
     * Adds custom validations
     */
    @Prop({type: File})
    public customValidator?(file: File): boolean;

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

    public mounted() {
      window.addEventListener('drop', handledrop);
    }

    public get className() {
      return classNames(
        'Polaris-DropZone',
        this.outline && 'Polaris-DropZone--hasOutline',
        // this.spacing && `Polaris-DropZone--${variationName('spacing', this.spacing)}`,
      );
    }

  }
</script>

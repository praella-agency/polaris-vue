<template>
    <span role="img" :class="className">
        <span v-if="!hasImage" class="Polaris-Avatar__Initials">
            <svg class="Polaris-Avatar__Svg" viewBox="0 0 40 40">
                <path v-if="customer || !initials" fill="currentColor" d="M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z" />
                <text v-else x="50%" y="50%" dy="0.35em" fill="currentColor" font-size="20" text-anchor="middle">{{initials}}</text>
            </svg>
        </span>
        <PImage v-if="source && status !== 'ERRORED'" class="Polaris-Avatar__Image" :source="source" alt="" role="presentation" />
    </span>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import {PImage} from '@/components/PImage';

    type Size = 'small' | 'medium' | 'large';
    enum Status {
        Pending = 'PENDING',
        Loaded = 'LOADED',
        Errored = 'ERRORED',
    }

    @Component({
        components: {
            PImage,
        },
    })
    export default class PAvatar extends Vue {

        @Prop({type: String, default: 'medium'}) public size!: Size;
        @Prop(Boolean) public customer!: boolean;
        @Prop(String) public name!: string;
        @Prop(String) public initials!: string;
        @Prop(String) public source!: string;

        public status = Status.Pending;
        public hasImage = this.source && this.status !== Status.Errored;
        public nameString = this.name || this.initials;

        public mounted() {
            console.log(this.hasImage);
        }

        public get className() {
            return classNames(
                'Polaris-Avatar',
                this.size && `Polaris-Avatar--${variationName('size', this.size)}`,
                !this.customer && `Polaris-Avatar--${variationName('style', this.styleClass(this.nameString))}`,
                // (this.hasImage || (this.initials && this.initials.length === 0)) && this.status !== Status.Loaded && 'Polaris-Avatar--hidden',
                this.hasImage && 'Polaris-Avatar--hasImage',
            );
        }

        public styleClass(name?: string) {
            const finalStyleClasses = ['one', 'two', 'three', 'four', 'five', 'six'];
            return name ? finalStyleClasses[name.charCodeAt(0) % finalStyleClasses.length] : finalStyleClasses[0];
        }
    }
</script>

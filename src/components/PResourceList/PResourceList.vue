<template>

    <div :class="className">
        <div class="Polaris-ResourceList__FiltersWrapper">
            <slot name="filter" />
        </div>

        <div class="Polaris-EmptyState Polaris-EmptyState--withinContentContainer">
            <div class="Polaris-EmptyState__Section">
                <div class="Polaris-EmptyState__DetailsContainer">
                    <div class="Polaris-EmptyState__Details">
                        <div class="Polaris-TextContainer">
                            <p class="Polaris-DisplayText Polaris-DisplayText--sizeSmall">Upload a file to get started</p>
                            <div class="Polaris-EmptyState__Content">
                                <p>You can use the Files section to upload images, videos, and other documents</p>
                            </div>
                        </div>
                        <div class="Polaris-EmptyState__Actions">
                            <div class="Polaris-Stack Polaris-Stack--alignmentCenter">
                                <div class="Polaris-Stack__Item"><button type="button" class="Polaris-Button Polaris-Button--primary"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Upload files</span></span></button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Polaris-EmptyState__ImageContainer"><img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" role="presentation" alt="" class="Polaris-EmptyState__Image"></div>
            </div>
        </div>
    </div>
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
    export default class PResourceList extends Vue {

        @Prop({type: String, default: 'medium'}) public size!: Size;
        @Prop(Boolean) public customer!: boolean;
        @Prop(Object) public resourceName!: object;
        @Prop(String) public initials!: string;
        @Prop(String) public source!: string;

        public status = Status.Pending;


        public get className() {
            return classNames(
                'Polaris-ResourceList__ResourceListWrapper'
            );
        }

        public styleClass(name?: string) {
            const finalStyleClasses = ['one', 'two', 'three', 'four', 'five', 'six'];
            return name ? finalStyleClasses[name.charCodeAt(0) % finalStyleClasses.length] : finalStyleClasses[0];
        }
    }
</script>

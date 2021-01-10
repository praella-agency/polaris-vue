<template>
    <div :class="pageTitleClassName">
        <div v-if="$slots.thumbnail">
            <slot name="thumbnail" />
        </div>
        <div class="Polaris-Header-Title__TitleAndSubtitleWrapper">
            <div v-if="titleMetadata || $slots.titleMetadata" class="Polaris-Header-Title__TitleWithMetadataWrapper">
                <div class="Polaris-Header-Title">
                    <PDisplayText size="large" element="h1">
                        <PTextStyle variation="strong">{{title}}</PTextStyle>
                    </PDisplayText>
                </div>
                <div class="Polaris-Header-Title__TitleMetadata">
                    <template v-if="titleMetadata">{{titleMetadata}}</template>
                    <slot v-else name="titleMetadata" />
                </div>
            </div>
            <div v-else class="Polaris-Header-Title">
                <PDisplayText size="large" element="h1">
                    <PTextStyle variation="strong">{{title}}</PTextStyle>
                </PDisplayText>
            </div>
            <div v-if="subtitle" class="Polaris-Header-Title__SubTitle">
                <p>{{subtitle}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {PDisplayText} from '@/components/PDisplayText';
    import {PTextStyle} from '@/components/PTextStyle';
    import {classNames} from '@/utilities/css';

    export interface PPageHeaderTitleProps {
        title?: string;
        subtitle?: string;
        titleMetadata?: string;
    }

    @Component({
        components: {
            PDisplayText,
            PTextStyle,
        },
    })
    export default class PPageHeaderTitle extends Vue {

        @Prop(String) public title!: string;
        @Prop(String) public subtitle!: string;
        @Prop(String) public titleMetadata!: string;

        public get pageTitleClassName() {
            return classNames(
                this.hasThumbnailSlot() && 'Polaris-Header-Title--hasThumbnail',
            );
        }

        public hasThumbnailSlot() {
            return !!this.$slots.thumbnail;
        }
    }
</script>

<template>
    <div :class="pageTitleClassName">
        <div v-if="source">
            <PThumbnail size="medium" :source="source" :alt="alt"/>
        </div>
        <div class="Polaris-Header-Title__TitleAndSubtitleWrapper" v-if="title || subtitle">
            <div class="Polaris-Header-Title__TitleWithMetadataWrapper">
                <PDisplayText element="h1" v-html="title" class="Polaris-Header-Title"/>
                <div class="Polaris-Header-Title__TitleMetadata"
                     v-if="titleMetadata || hasSlot($slots.titleMetadata)">
                    <template v-if="titleMetadata">
                        {{ titleMetadata }}
                    </template>
                    <template v-else>
                        <slot name="titleMetadata"/>
                    </template>
                </div>
            </div>
            <div v-if="subtitle" class="Polaris-Header-Title__SubTitle">
                <p>{{ subtitle }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PDisplayText } from '../../../../components/PDisplayText';
    import { PTextStyle } from '../../../../components/PTextStyle';
    import { PThumbnail } from '../../../../components/PThumbnail';

    export default {
        name: 'PPageHeaderTitle',
        components: {
            PDisplayText, PTextStyle, PThumbnail,
        },
        props: {
            title: {
                type: String,
            },
            source: {
                type: String,
            },
            alt: {
                type: String,
            },
            subtitle: {
                type: String,
            },
            titleMetadata: {
                type: String,
            },
        },
        computed: {
            pageTitleClassName() {
                return classNames(
                    this.source && 'Polaris-Header-Title--hasThumbnail',
                );
            },
            hasSlot() {
                return hasSlot;
            },
        },
        methods: {
            hasThumbnailSlot() {
                return hasSlot(this.$slots.thumbnail);
            },
        },
    }
</script>

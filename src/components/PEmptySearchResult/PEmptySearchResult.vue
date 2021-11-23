<template>
    <PStack alignment="center" vertical>
        <PStackItem>
            <PImage
                v-if="withIllustration"
                alt="Empty search results"
                source="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                draggable="false"
            />
        </PStackItem>
        <PStackItem>
            <PDisplayText
                size="small"
            >
                {{ title }}
            </PDisplayText>
        </PStackItem>
        <PStackItem
            variation="subdued"
        >
            <p v-if="description">
                {{ description }}
            </p>
        </PStackItem>
    </PStack>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { PStack } from '@/components/PStack';
    import { PStackItem } from '@/components/PStack/components/PStackItem';
    import { PDisplayText } from './../../components/PDisplayText/index.js';
    import { PTextStyle } from './../../components/PTextStyle/index.js';
    import { PImage } from './../../components/PImage/index.js';

    @Component({
      components: {
        PStack, PStackItem, PDisplayText, PTextStyle, PImage,
      },
    })
    export default class PEmptySearchResult extends Vue {
        @Prop({type: String, required: true}) public title!: string;
        @Prop({type: String, default: null}) public description!: string;
        @Prop({type: Boolean, default: false}) public withIllustration!: boolean;
    }
</script>

<style scoped>

</style>
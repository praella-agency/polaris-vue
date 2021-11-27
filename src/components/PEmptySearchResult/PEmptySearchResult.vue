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

<script>
    import { PStack } from '@/components/PStack';
    import { PStackItem } from '@/components/PStack/components/PStackItem';
    import { PDisplayText } from './../../components/PDisplayText/index.js';
    import { PTextStyle } from './../../components/PTextStyle/index.js';
    import { PImage } from './../../components/PImage/index.js';

    export default {
      name: 'PEmptySearchResult',
      components: {
        PStack, PStackItem, PDisplayText, PTextStyle, PImage,
      },
      props: {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          default: null
        },
        withIllustration: {
          type: Boolean,
          default: false
        },
      },
    }
</script>

<style scoped>

</style>
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
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PDisplayText } from '../../components/PDisplayText';
    import { PTextStyle } from '../../components/PTextStyle';
    import { PImage } from '../../components/PImage';

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
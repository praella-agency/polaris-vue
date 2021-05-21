PMediaCard example:

```vue

<template>
  <PMediaCard portrait
              title="Getting Started"
              :primaryAction="{content:'Test', onAction: handlePrimaryButtonEvent}"
              :secondaryAction="{content:'Test', onAction: handleSecondaryButtonEvent}"
              videoThumbSrc="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
              :videoSrc="[{src:'https://static.videezy.com/system/resources/previews/000/055/864/original/rorschach_test_2992.mp4',
              type:'video/mp4',
              }]"
  >
    Discover how Shopify can power up your entrepreneurial journey.
  </PMediaCard>
</template>

<script>
export default {
  methods: {
    handlePrimaryButtonEvent(event) {
      alert(`Triggered ${event} event`)
    },
    handleSecondaryButtonEvent(event) {
      alert(`Triggered Secondary event`)
    }
  }
}
</script>
```
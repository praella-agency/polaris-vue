PAvatar example:

Small Avatar
```vue
<template>

  <PEmptyState
      heading="Manage your inventory transfers"
      :fullWidth="true"
      :primaryAction="{ content: 'Add transfer', onAction: this.handlePrimaryAction}"
      :secondaryAction="{ content: 'Learn more', onAction: this.handleSecondaryAction}"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png">
    <div slot="footer" class="Polaris-TextContainer"><p>If you don’t want to add a transfer, you can import your inventory
      from <a class="Polaris-Link Polaris-Link--monochrome" href="/settings" data-polaris-unstyled="true">settings</a>.
    </p></div>
    <p>You can use the Files section to upload images, videos, and
      other documents. This example shows the content with a centered layout and full width.</p>
  </PEmptyState>
</template>


<script>
export default {
  methods: {
    handlePrimaryAction() {
      alert(`transferred`)
    },
    handleSecondaryAction() {
      alert(`Learn more`)
    }
  }
}
</script>
```
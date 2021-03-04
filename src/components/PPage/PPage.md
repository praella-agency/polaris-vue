PPage example:

```vue
<template>
    
    <PPage
      separator
      :primaryAction="primaryAction"
      :secondaryActions="[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Secondary action label',
          onAction: triggerSecondaryAction1,
          icon: 'DuplicateMinor'
        },
        {
          content: 'View on your store',
          onAction: triggerSecondaryAction2,
          icon: 'DuplicateMinor'
        },
      ]"
      :pagination="{
        hasPrevious: true,
        hasNext: true,
        onNext: handleNext,
        onPrevious: handlePrevious
      }"

      title="3/4 inch Leather pet collar" subtitle="Perfect for any pet" :breadcrumbs="[{content: 'Products', url: '/products'}]">
        <PBadge slot="titleMetadata" status="success">Paid</PBadge>
        <PThumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" slot="thumbnail"></PThumbnail>
        <PAvatar initials="HA" slot="additionalNavigation"></PAvatar>
        Page Content
    </PPage>
</template>
<script>
export default {
  data() {
    return {
      primaryAction: {
        content: 'Save',
        onAction: this.triggerPrimaryAction,
      }
    }
  },
  methods: {
    triggerPrimaryAction() {
        alert(`Saved`)
    },
    triggerSecondaryAction1() {
        alert(`Duplicate Action`)
    },
    triggerSecondaryAction2() {
        alert(`View on your store`)
    },
    handleNext() {
        alert(`Next`)
    },
    handlePrevious() {
        alert(`Previous`)
    }
  }
}
</script>
```

Fullwidth Page
```vue
<template>
    
    <PPage
      fullWidth
      title="Orders"
      :primaryAction="primaryAction"
      :secondaryActions="[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Secondary action label',
          onAction: triggerSecondaryAction1,
          icon: 'DuplicateMinor'
        },
        {
          content: 'View on your store',
          onAction: triggerSecondaryAction2,
          icon: 'DuplicateMinor'
        },
        {
          content: 'View on your store',
          url: 'https://jsfiddle.net/nm55jnjk/17/',
          external: true,
          icon: 'DuplicateMinor'
        },
      ]"
    
      :pagination="{
        hasPrevious: false,
        hasNext: true,
        onNext: handleNext,
        onPrevious: handlePrevious
      }">
        Wide page content
    </PPage>
</template>
<script>
export default {
  data() {
    return {
      primaryAction: {
        content: 'Save',
        onAction: this.triggerPrimaryAction,
      }
    }
  },
  methods: {
    triggerPrimaryAction() {
      alert(`Saved`)
    },
    triggerSecondaryAction1() {
      alert(`Duplicate Action`)
    },
    triggerSecondaryAction2() {
      alert(`View on your store`)
    },
    handleNext() {
      alert(`Next`)
    },
    handlePrevious() {
      alert(`Previous`)
    }
  }
}
</script>
```
PSettingToggle example:

PSettingToggle

```vue

<template>
  <PSettingToggle
      :action="{
        contentStatus: status ? 'Deactivate' : 'Activate',
        onAction: toggleStatus,
      }"
      :enabled="status"
  > This setting is <PTextStyle variation="strong">{{ status ? 'activated' : 'deactivated' }}</PTextStyle>
  </PSettingToggle>
</template>

<script>
export default {
  data() {
    return {
      status: false,
    };
  },
  methods: {
    toggleStatus() {
      this.status = !this.status
    }
  }
}
</script>
```
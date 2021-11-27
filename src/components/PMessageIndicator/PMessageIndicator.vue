<template>
  <div class="Polaris-MessageIndicator__MessageIndicatorWrapper">
    <div v-show="active" class="Polaris-MessageIndicator"/>
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'PMessageIndicator',
  props: {
    active: {
      type: Boolean,
      default: true
    }
  }
}
</script>

PModal example:

```vue
<template>
  <div>
    <PModal :primaryAction="{content: 'Save Customer', onAction: handlePrimaryAction}" :secondaryActions="[{content: 'Delete Customer', 'destructive': true, onAction: handleDeleteAction}, {content:'Cancel', onAction: () => {is_active = false}}]" title="Enter Customer Details" :open="is_active" sectioned @close="is_active = false">
        <PFormLayout>
            <PTextField label="First Name"/>
            <PTextField label="Last Name Name"/>
            <PTextField label="Email" type="email"/>
            <PBanner status="critical" title="Notice">
                We ensure complete privacy all of out customers 
            </PBanner>
        </PFormLayout>
      </PModal>
      <PButton @click="is_active = true">Open Modal</PButton>
  </div>

</template>

<script>
export default {
      
    data() {
        return {
          is_active:false
        }
    },

  methods: {
    handlePrimaryAction() {
        alert(`Customer saved`)
    },
    handleDeleteAction() {
        alert(`Customer deleted`)
    }
  }
}
</script>
```

Load external url in iFrame
```vue
<template>
  <div>
    <PModal title="Polaris Components" iFrameName="Polaris Components" src="https://polaris-vue.hulkapps.com/" :open="is_active" @close="is_active = false">
       
      </PModal>
      <PButton @click="is_active = true">Open Modal</PButton>
  </div>

</template>

<script>
export default {
      
    data() {
        return {
          is_active:false
        }
    },

  methods: {
    handlePrimaryAction() {
        alert(`Customer saved`)
    }
  }
}
</script>
```
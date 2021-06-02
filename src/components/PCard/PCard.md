PCard example:

```vue
<PCard>
  View a summary of your online store’s performance.
</PCard>
```

Sectioned Card
```vue
<PCard sectioned>
  View a summary of your online store’s performance.
</PCard>
```

Card with inline Header (Title and description)
```vue
<PCard sectioned title="Online store dashboard" shortDescription="Store performance">
  View a summary of your online store’s performance.
</PCard>
```

Card with subdued
```vue
<PCard subdued sectioned title="Card title" shortDescription="Tag line">
  Card content
</PCard>
```

Card with multiple sections
```vue
<template>
    <PCard title="Online store dashboard" sectioned>
        <PCardSection title="Reports">
          <p>View a summary of your online store’s performance.</p>
        </PCardSection>
        
        <PCardSection title="Summary" subdued>
          <p>
            View a summary of your online store’s performance, including sales,
            visitors, top products, and referrals.
          </p>
        </PCardSection>
    </PCard>
</template>

<script>
import PCardSection from './PCardSection.vue';

export default {
  components: {
    PCardSection,
  }
}
</script>
```

Card with sub-sections
```vue
<template>
    <PCard title="Customer" sectioned>
        <PCardSection>
          John Smith
        </PCardSection>
        <PCardSection title='address'>
          <PCardSubsection>
              123 First St <br/>
              Somewhere <br/>
              The Universe <br/>
          </PCardSubsection>
          <PCardSubsection>
              123 First St <br/>
              Somewhere <br/>
              The Universe <br/>
          </PCardSubsection>
        </PCardSection>
        <PCardSection>
          A single subsection without a sibling has no visual appearance
        </PCardSection>
    </PCard>
</template>

<script>
import PCardSection from './PCardSection.vue';
import PCardSubsection from './PCardSubsection.vue';

export default {
  components: {
    PCardSection,
    PCardSubsection,
  }
}
</script>
```


Card with Footer action

```vue
<template>
  <PCard sectioned title="Shipment 1234">
    <PList>
      <PListItem>1 × Oasis Glass, 4-Pack</PListItem>
      <PListItem>1 × Anubis Cup, 2-Pack</PListItem>
    </PList>

    <PButtonGroup slot="footer">
      <PButton destructive @click="handleCancelShipment">Cancel shipment</PButton>
      <PButton @click="handleAddTracking">Add tracking number</PButton>
    </PButtonGroup>

  </PCard>
</template>

<script>
import PListItem from "../PList/PListItem";

export default {
  components:{
    PListItem,
  },
  methods: {
    handleCancelShipment() {
      alert(`Triggered event for CancelShipment`)
    },
    handleAddTracking() {
      alert(`Triggered event for Add tracking number`)
    }
  }
}
</script>
```
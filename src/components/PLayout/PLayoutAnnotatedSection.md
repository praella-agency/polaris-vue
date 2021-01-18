PLayoutAnnotatedSection example:

```vue
<PLayout>
  <PLayoutAnnotatedSection
    title="Store details"
    description="Shopify and your customers will use this information to contact you.">
    <PCard sectioned>
      <PFormLayout>
        <PTextField label="Store name"  />
        <PTextField label="Account email" type="email"  />
      </PFormLayout>
    </PCard>
  </PLayoutAnnotatedSection>
</PLayout>
```
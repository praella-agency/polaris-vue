PLayout example:

One Column Layout
```vue
<PLayout sectioned>
  <PCard sectioned>
    View a summary of your online store’s performance
  </PCard>
</PLayout>
```


Two columns with primary and secondary widths
```vue
<PLayout>
  <PLayoutSection>
    <PCard sectioned title="Order details">
      View a summary of your order.
    </PCard>
  </PLayoutSection>
  <PLayoutSection secondary>
    <PCard sectioned title="Tags">
      Add tags to your order.
    </PCard>
  </PLayoutSection>
</PLayout>
```

Two columns with equal width
```vue
<PLayout>
  <PLayoutSection oneHalf>
    <PCard sectioned title="Order details">
      View a summary of your order.
    </PCard>
  </PLayoutSection>
  <PLayoutSection oneHalf>
    <PCard sectioned title="Tags">
      Add tags to your order.
    </PCard>
  </PLayoutSection>
</PLayout>
```

Two columns with equal width
```vue
<PLayout>
  <PLayoutSection oneThird>
    <PCard sectioned title="Order details">
      View a summary of your order.
    </PCard>
  </PLayoutSection>
  <PLayoutSection oneThird>
    <PCard sectioned title="Variant">
      Add Variant
    </PCard>
  </PLayoutSection>
  <PLayoutSection oneThird>
    <PCard sectioned title="Tags">
      Add tags to your order.
    </PCard>
  </PLayoutSection>
</PLayout>
```
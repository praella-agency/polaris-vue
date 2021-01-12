PFormLayoutGroup example:

Grouped layout
```vue
<PFormLayout>
  <PFormLayoutGroup helpText="Order details">
    <PTextField type='currency' label="Price" align="right" suffix="$" />
    <PTextField type='number' label="Minimum order" />
    <PTextField type='number' label="Maximum order" />
    <PTextField type='text' label="Product" />
  </PFormLayoutGroup>
</PFormLayout>
```

Condensed layout
```vue
<PFormLayout>
  <PFormLayoutGroup condensed>    
      <PTextField label="Length" />
      <PTextField label="Width" />
      <PTextField label="Height" />
      <PTextField label="Unit" />
  </PFormLayoutGroup>
</PFormLayout>
```
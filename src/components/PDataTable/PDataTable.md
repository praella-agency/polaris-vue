PDataTable example:

```vue
<PDataTable
  :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric']"
  :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales']"
  :rows="[
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$445.00', 124518, 32, '$14,240.00'],
  ]"
  :totals="['', '', '', 255, '$155,830.00']"
  footerContent="Showing 3 of 3 results"/>
```

PButton example:

Default button
```vue
<PButton v-tooltip="'This is example button'">Example Button</PButton>
```

Primary with different properties
```vue
<PButton primary>Primary button</PButton> <br /><br />
<PButton monochrome>Monochrome Button</PButton> <br /><br />
<PButton outline>Outline Button</PButton> <br /><br />
<PButton destructive>Destructive Button</PButton> <br /><br />
<PButton plain>Plain Button</PButton> <br /><br />
<PButton loading>Loading Button</PButton> <br /><br />
<PButton disabled>Disabled Button</PButton> <br /><br />
<PButton fullWidth>Full Width Button</PButton> <br /><br />
<PButton disclosure>Button with Disclosure</PButton> <br /><br />
<PButton disclosure="up">Button with Up Disclosure</PButton> <br /><br />
```


Button text align
```vue
<PButton textAlign='left' fullWidth>Example Button</PButton> <br />
<PButton textAlign='right' fullWidth>Example Button</PButton> <br />
<PButton textAlign='center' fullWidth>Example Button</PButton>
```


Button With Icon
```vue
<PButton icon="DeleteMinor">Button with DeleteMinor Icon</PButton> <br />
```


Button With Link
```vue
<PButton href="https://www.hulkapps.com/">Button with link</PButton> <br />
```

Button Actions
```vue
<template>
    <div>
        <PButton @click="handleButtonEvent('click')">Click Me</PButton> <br /><br />
        <PButton @blur="handleButtonEvent('blur')">Blur</PButton> <br /><br />
        <PButton @focus="handleButtonEvent('focus')">Focus</PButton> <br /><br />
    </div>
</template>

<script>
export default {
  methods: {
    handleButtonEvent(event) {
        alert(`Triggered ${event} event`)
    }
  }
}
</script>
```

`PTextField inherits the PROPS, EVENTS & SLOTS from ` [PInput](/#!/PInput) `component, please refer` [PInput](/#!/PInput) `for more detail`


PTextField example:

```vue
<PTextField id="input_field" label="Store Name" value="Test Store" />
```

Disabled TextField
```vue
<PTextField id="input_field" label="Store Name" value="Test Store" disabled />
```

Password field
```vue
<PTextField id="input_field" label="Password" value="" type="password" />
```

Numeric TextField
```vue
<template>
  <PTextField :value="val" type="number" id="input_field" label="Product price" @change="handleChange" />
</template>
<script>
export default {
  data() {
    return {
      val:0
    }
  },
  methods: {
    handleChange(val) {
      this.val = val;
    }
  }
}
</script>
```

Currency TextField
```vue
<template>
  <PTextField :value="val" type="currency" id="input_field" label="Product price" @change="handleChange" />
</template>
<script>
export default {
  data() {
    return {
      val:0
    }
  },
  methods: {
    handleChange(val) {
      this.val = val;
    }
  }
}
</script>
```

TextField with error
```vue
<PTextField id="input_field" label="Store Name" error="This field is required" />
```

Text area
```vue
<template>
  <div>
    <PTextField @input="handleChange" :value="desc" multiline id="input_field" label="Store Description" /> <br/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desc:''
    } 
  },
  methods: {
    handleChange(val) {
      this.desc = val
    }
  }
}
</script>
```

Text area with 100px min height
```vue
<template>
  <div>
    <PTextField @input="handleChange" :minHeight="100" :value="desc" multiline id="input_field" label="Store Description" /> <br/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desc:''
    } 
  },
  methods: {
    handleChange(val) {
      this.desc = val
    }
  }
}
</script>
```

Date and time picker
```vue
<template>
  <div>
      <PTextField @input="handleDateChange" type="date" id="input_field" label="Order date" /> <br />
      <PTextField @input="handleTimeChange" type="time" id="input_field" label="Order time" /> <br />
      <PTextField @input="handleDateTimeChange" type="datetime-local" id="input_field" label="Order date time" /> <br />
      <PTextField @input="handleWeekChange" type="week" id="input_field" label="Weekly Order Report" /> <br />
      <PTextField type="month" id="input_field" label="Monthly Order Report" /> 
  </div>
</template>

<script>
export default {
  methods: {
    handleDateChange(val) {
        alert(`selected date ${val}`)
    },
    handleTimeChange(val) {
        alert(`selected time ${val}`)
    },
    handleDateTimeChange(val) {
        alert(`selected date-time ${val}`)
    },
    handleWeekChange(val) {
        alert(`selected week ${val}`)
    }
  }
}
</script>
```


TextField with suffix
```vue
<PTextField id="input_field" label="Store Name" align="right" suffix="$" />
```


TextField with prefix
```vue
<PTextField type="email" id="input_field" label="User email">
  <PIcon source="CustomersMajorFilled" slot="prefix"></PIcon>
</PTextField>
```

Connected TextField
```vue
<PTextField id="input_field" label="First Name" connected align="right" type="number">
  <PButton slot="connectedRight">Submit</PButton>
  <PSelect :options="['%','$']" slot="connectedLeft" />
</PTextField>
```

RichText Editor
```vue
<PTextField id="input_field" richEditor label="Description"></PTextField>
```
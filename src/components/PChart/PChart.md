PChart example:

Default chart

```vue

<template>
  <div>
    <PChart
        title="Bar Chart"
        height="500"
        :series="series"
        :x-axis="xAxis"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      xAxis: [
        'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
        'Italy', 'France', 'Japan', 'United States', 'India',
        'Germany',
      ],
      series: [
        {
          data: [
            400, 430, 448, 470, 540, 580, 690, 1100, 1400, 1380
          ],
        }
      ]
    };
  }
}
</script>
```

Vertical Grouped Bar Chart

```vue

<template>
  <div>
    <PChart
        title="Vertical Grouped Bar Chart"
        width="800"
        :vertical="true"
        height="500"
        :series="series"
        :x-axis="xAxis"
        :chart-options="{
            colors: ['#ff0048', '#ff0098']
          }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      xAxis: [
        'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
        'Italy', 'France', 'Japan', 'United States', 'India',
        'Germany',
      ],
      series: [
        {
          data: [
            400, 430, 448, 470, 540, 580, 690, 1100, 1400, 1380
          ],
        },
        {
          data: [
            300, 330, 548, 570, 240, 280, 650, 1000, 1500, 1280
          ],
        }
      ]
    };
  }
}
</script>
```

Line Chart

```vue

<template>
  <div>
    <PChart
        title="Line Chart"
        type="line"
        height="500"
        :series="series"
        :x-axis="xAxis"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      xAxis: [
        'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
        'Italy', 'France', 'Japan', 'United States', 'India',
        'Germany',
      ],
      series: [
        {
          data: [
            400, 430, 448, 470, 540, 580, 690, 1100, 1400, 1380
          ],
        }
      ]
    };
  }
}
</script>
```

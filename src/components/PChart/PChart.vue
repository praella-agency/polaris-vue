<template>
  <PCard :title="title">
    <VueApexCharts
        :type="type"
        :width="width"
        :height="height"
        :options="options"
        :series="series"
    />
  </PCard>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator';
import {PCard} from '@/components/PCard';
import VueApexCharts from 'vue-apexcharts';

@Component({
  components: {
    VueApexCharts,
    PCard,
  },
})

export default class PChart extends Vue {
  public options = this.chartObject();

  /**
   * Title content for the chart.
   */
  @Prop({type: String, default: null}) public title!: string;

  /**
   * Type of chart
   */
  @Prop({type: String, default: 'bar'}) public type!: string;

  /**
   * Width for the chart.
   */
  @Prop({type: String, default: '100%'}) public width!: string;

  /**
   * Height for the chart.
   */
  @Prop({type: String, default: 'auto'}) public height!: string;

  /**
   * To get vertical view of chart.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public vertical!: boolean;

  /**
   * Series for the chart.
   */
  @Prop({
    type: Array, default: () => ([]),
  }) public series!: any[];

  /**
   * xAxis for the chart.
   */
  @Prop({
    type: Array, default: () => ([]),
  }) public xAxis!: any[];

  /**
   * Apex Chart Options.
   *
   * Visit this [Documentation](https://apexcharts.com/docs/options/annotations/)
   * to get detailed option values.
   */
  @Prop({type: Object, default: Object}) public chartOptions!: object;

  /**
   * Method to getChartObject
   */
  @Emit('chartObject')
  public chartObject(xAxis = []) {
    let xData;
    if (xAxis.length > 0) {
      xData = xAxis;
    } else {
      xData = this.xAxis;
    }

    const object = {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'linear',
        },
      },
      noData: {
        text: 'Loading...',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
          horizontal: this.vertical,
        },
      },
      dataLabels: {
        enabled: false,
        offsetY: -20,
        style: {
          fontSize: '10px',
          colors: ['#304758'],
        },
      },
      stroke: {},
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        type: 'category',
        categories: xData,
        position: 'bottom',
        tickAmount: 10,
        axisBorder: {
          show: false,
        },
        label: {
          hideOverlappingLabels: true,
        },
      },
      yaxis: {
        forceNiceScale: true,
        min: 0,
        max(max) {
          if (max < 10) {
            return 10;
          } else {
            return max + 1;
          }
        },
        labels: {
          show: true,
        },
      },
    };

    return Object.assign({}, object, this.chartOptions);
  }

  @Watch('xAxis')
  public onValueChanged(value) {
    this.options = this.chartObject(value);
  }
}
</script>

<style>
div.apexcharts-tooltip-title {
  font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif !important;
}
.apexcharts-tooltip.apexcharts-theme-light {
  box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05), 0px 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 0.8rem;
  border: none !important;
}
</style>

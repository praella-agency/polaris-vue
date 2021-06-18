import PChart from './PChart';

export default {
    title: 'Data visualizations / Chart',
    component: PChart,
    argTypes: {
        type: {
            options: ['bar', 'line'],
            control: {
                type: 'boolean',
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PChart,
    },
    template: `
      <PChart
          v-bind="$props"
      />`,
});

export const Chart = Template.bind({});

Chart.args = {
    title: "Bar Chart",
    height: "500",
    series: [
        {
            data: [
                400, 430, 448, 470, 540, 580, 690, 1100, 1400, 1380
            ],
        }
    ],
    xAxis: [
        'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
        'Italy', 'France', 'Japan', 'United States', 'India',
        'Germany',
    ],
    chartOptions: {},
}

const Template1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PChart,
    },
    template: `
      <PChart
          v-bind="$props"
      />`,
});

export const GroupedChart = Template1.bind({});

GroupedChart.args = {
    title: "Vertical Grouped Bar Chart",
    width: "800",
    vertical: true,
    height: "500",
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
    ],
    xAxis: [
        'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
        'Italy', 'France', 'Japan', 'United States', 'India',
        'Germany',
    ],
    chartOptions: {
        colors: ['#ff0048', '#ff0098']
    },
}

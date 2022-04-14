import { PChart } from './index';

export default {
    title: 'Data visualizations / Chart',
    component: PChart,
    argTypes: {
        type: {
            options: ['bar', 'line'],
            control: {
                type: 'select',
            },
        },
        chartObject: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PChart,
    },
    template: `
        <PChart
            v-bind="args"
        />`,
});

export const Chart = Template.bind({});

Chart.args = {
    title: "Default Chart",
    width: "100%",
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
    chartOptions: {
        colors: ['#007B5C']
    },
}

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PChart,
    },
    template: `
        <PChart
            v-bind="args"
        />`,
});

export const GroupedChart = Template1.bind({});

GroupedChart.args = {
    title: "Horizontal Grouped Bar Chart",
    width: "100%",
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
        colors: ['#39A9A2', '#f49342']
    },
}

import { PChart } from './index';
import { PCard } from '../PCard';

export default {
    title: 'Data visualizations / Dark Chart',
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
                defaultValue: {

                },
            },
        },
    },
}

const DarkTemplate = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PChart, PCard,
    },
    template: `
        <PCard sectioned>
      <PChart
          v-bind="$props"
      /></PCard>`,
});

export const DarkChart = DarkTemplate.bind({});

DarkChart.args = {
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
        chart: {
            background: '#1f1f25'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            },
        },
        xaxis: {
            categories: [
                'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
                'Italy', 'France', 'Japan', 'United States', 'India',
                'Germany',
            ],
            labels: {
                show: true,
                style: {
                    colors: '#FFFFFF',
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: '#FFFFFF',
                },
            },
        },
        grid: {
            show: true,
            borderColor: '#2d2e36',
            strokeDashArray: 0,
            position: 'back',
            yaxis: {
                lines: {
                    show: true
                },
            },
        },
    },
}

const DarkTemplate1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PChart,
    },
    template: `
      <PChart
          v-bind="$props"
      />`,
});

export const GroupedDarkChart = DarkTemplate1.bind({});

GroupedDarkChart.args = {
    title: "Horizontal Grouped Bar Chart",
    width: "100%",
    vertical: true,
    type: 'line',
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
        chart: {
            background: '#1f1f25'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            },
        },
        stroke: {
            show: true,
            curve: 'smooth',
            colors: undefined,
            width: 2,
            dashArray: 0,
        },
        xaxis: {
            categories: [
                'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
                'Italy', 'France', 'Japan', 'United States', 'India',
                'Germany',
            ],
            labels: {
                show: true,
                style: {
                    colors: '#FFFFFF',
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: '#FFFFFF',
                },
            },
        },
        grid: {
            show: true,
            borderColor: '#2d2e36',
            strokeDashArray: 0,
            position: 'back',
            yaxis: {
                lines: {
                    show: true
                },
            },
        },
    },
}

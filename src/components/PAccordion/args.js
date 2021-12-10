export default {
    accordions: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `
[{
    /** Accordion Title */
    title: [string, number],
    /** Accordion Content */
    content: [string, number],
    /** Accordion Icon */
    icon: {
        /** Icon to display when accordion is opened */
        open: {
            type: [string, object],
            properties: {
                source: string,
                color: string,
            },
        },
        /** Icon to display when accordion is closed */
        close: {
            type: [string, object],
            properties: {
                source: string,
                color: string,
            },
        },
    },
    /** Accordion Animation */
    animation: {
        type: object,
        properties: {
            duration: string,
            timingFunction: string,
        }
    }
}]`,
            },
        },
    },
    animation: {
        table: {
            defaultValue: {
                summary: '{}',
                detail: `
{
    /** Duration in millisecond */
    duration: string,
    /** Timing function for accordion */
    timingFunction: {
        type: string,
        expectedValues: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'initial', 'inherit'],
    },
}`,
            },
        },
    },
    icon: {
        table: {
            defaultValue: {
                summary: 'string | object',
                detail: `
{
    /** Icon to display when accordion is opened */
    open: {
        type: [string, object],
        properties: {
            source: string,
            color: string,
        },
    },
    /** Icon to display when accordion is closed */
    close: {
        type: [string, object],
        properties: {
            source: string,
            color: string,
        },
    },
}`,
            },
        },
    },
    default: {
        table: {
            type: {
                summary: null,
            },
        },
    },
}
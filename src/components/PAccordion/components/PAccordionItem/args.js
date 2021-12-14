export default {
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
    actions: {
        table: {
            type: {
                summary: null,
            },
        },
    },
    content: {
        table: {
            type: {
                summary: null,
            },
        },
    },
    title: {
        table: {
            type: {
                summary: null,
            },
        },
    },
}
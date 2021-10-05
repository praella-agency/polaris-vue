export default {
    bulkActions: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `[{
    content: string,
    onAction: void,
}]`,
            },
        },
    },
    headings: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `[{
    title: string,
    value: string,
    new?: boolean,
    hidden?: boolean,
}]`,
            },
        },
    },
    promotedBulkActions: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `[{
    content: string,
    onAction: void,
}]`,
            },
        },
    },
    resourceName: {
        table: {
            type: {
                summary: 'object',
            },
            defaultValue: {
                summary: '{}',
                detail: `{
    singular: string,
    plural: string,
}`,
            },
        },
    },
    rows: {
        table: {
            type: {
                summary: 'Array',
            },
            defaultValue: {
                summary: '[]',
                detail: `Heading value should be matched with row column`,
            },
        },
    },
    selectedItemsCount: {
        table: {
            type: {
                summary: 'number | string'
            },
        },
        control: {
            type: 'number',
        },
    },
    // slot
    filterOptions: {
        table: {
            type: {
                summary: null,
            },
        },
    },
    auxiliaryContainer: {
        table: {
            type: {
                summary: null,
            },
        },
    },
    emptyState: {
        table: {
            type: {
                summary: null,
            },
        },
    },
    sort: {
        table: {
            type: {
                summary: null,
            },
        },
    },
    default: {
        name: 'item.<heading-value>',
        table: {
            type: {
                summary: null,
            },
        },
    },
}
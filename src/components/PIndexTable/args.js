export default {
    bulkActions: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `[{
    content: string,
    onAction: void,
    icon: string,
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
    icon: {
        source: string,
        color: string,
    },
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
                detail: `[{
    <heading.value>: 'value',
}]`,
            },
        },
    },
    selectedItemsCount: {
        table: {
            type: {
                summary: 'number | string',
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
        control: {
            type: null,
        },
    },
    pagination: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    auxiliaryContainer: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    emptyState: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    sort: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    default: {
        name: 'item.<heading-value>',
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    // events
    selectionChange: {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(selectionType, toggleType, selectedResources)',
            },
        },
        control: {
            type: null,
        },
    },
    'filter-removed': {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(tag)',
            },
        },
        control: {
            type: null,
        },
    },
    'input-filter-changed': {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(value)',
            },
        },
        control: {
            type: null,
        },
    },
    navigation: {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(row)',
            },
        },
        control: {
            type: null,
        },
    },
}
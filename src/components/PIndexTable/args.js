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
    pagination: {
        table: {
            type: {
                summary: 'object',
            },
            defaultValue: {
                summary: '{}',
                detail: `{
    nextURL?: string,
    previousURL?: string,
    hasNext?: boolean,
    hasPrevious?: boolean,
    accessibilityLabel?: string,
    onNext?(): void,
    onPrevious?(): void,
}`,
            },
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
    // events
    selectionChange: {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(selectionType, toggleType, selectedResources)',
            },
        },
    },
    'filter-removed': {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(tag)',
            },
        },
    },
    'input-filter-changed': {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(value)',
            },
        },
    },
    navigation: {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(row)',
            },
        },
    },
}
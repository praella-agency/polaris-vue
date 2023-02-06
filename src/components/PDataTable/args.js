export default {
    verticalAlign: {
        options: ['top', 'bottom', 'middle', 'baseline'],
        control: {
            type: 'select',
        },
    },
    defaultSortDirection: {
        options: ['ascending', 'descending', 'none'],
        control: {
            type: 'select',
            labels: {
                'none': 'default',
            },
        },
    },
    footerContent: {
        control: {
            type: 'text',
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
    body: {
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
    filter: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    footer: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    head: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    item: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    tbody: {
        table: {
            type: {
                summary: null,
            },
        },
        control: {
            type: null,
        },
    },
    actions: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `
[{
    /** stringVisually hidden text for screen readers */
    accessibilityLabel?: string,
    /** stringContent the action displays */
    content?: string,
    /** booleanWhether or not the action is disabled */
    disabled?: boolean,
    /** booleanForces url to open in a new tab */
    external?: boolean,
    /** stringA unique identifier for the action */
    id?: string,
    /** stringA destination to link to, rendered in the action */
    url?: string,
    /** Destructive action */
    destructive?: boolean,
    /** Icon support */
    icon?: string,
    /** Spinner for the element */
    loading?: boolean,
    /** voidCallback when an action takes place */
    onAction()?: void,
}]`,
            },
        },
    },
    columnContentTypes: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `
Array of type: ("text" | "numeric")[]

text
type: "text"
numeric
type: "numeric"`,
            },
        },
    },
    headings: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `
[{
    /** Header title */
    content: string,
    /** Header value */
    value: string,
    /** Value type */
    type: string,
    /** Sortable values. @default true */
    sortable?: boolean,
    /** Header Column width */
    width?: string,
}]`,
            },
        },
    },
    ids: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `
/** Contains numeric value */
[1, 2, 3, ...]`,
            },
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
//     pagination: {
//         table: {
//             defaultValue: {
//                 summary: '{}',
//                 detail: `{
//     nextURL?: string,
//     previousURL?: string,
//     hasNext?: boolean,
//     hasPrevious?: boolean,
//     accessibilityLabel?: string,
//     onNext?(): void,
//     onPrevious?(): void,
// }`
//             },
//         },
//     },
    rows: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `[{
    <heading.value>: 'value',
}]`,
            },
        },
    },
    sort: {
        table: {
            defaultValue: {
                summary: '{}',
                detail: `{
    value: string,
    direction: 'ascending' | 'descending' | 'none',
}`,
            },
        },
    },
    totals: {
        table: {
            defaultValue: {
                summary: '[]',
                detail: `
Array of type: ("text" | "numeric")[]

text
type: "text"
numeric
type: "numeric"
`,
            },
        },
    },
    totalsName: {
        table: {
            defaultValue: {
                summary: '{}',
                detail: `{
    /** Singular label */
    singular: string;
    /** Plural label */
    plural: string;
}`
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
    'sort-changed': {
        table: {
            defaultValue: {
                summary: '()',
                detail: '(value, direction)',
            },
        },
        control: {
            type: null,
        },
    },
};

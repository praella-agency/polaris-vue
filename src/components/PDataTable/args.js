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
                'none': 'Default',
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
}`
            },
        },
    },
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
};

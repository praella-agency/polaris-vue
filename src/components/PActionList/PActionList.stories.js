import { PActionList } from './index';

export default {
    title: 'Actions / Action List',
    component: PActionList,
    argTypes: {
        items: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** Content the action displays */
    content?: string,
    /** Icon to display */
    icon?: boolean,
    /** HelpText for the element */
    helpText?: boolean,
    /** Callback when an action takes place */
    onAction?(): void,
}]`,
                },
            },
        },
        sections: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** Title for the section */
    title?: string,
    /** Collection of action items for the list */
    items: [],
}]`,
                },
            },
        },
        'item-action': {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(action)',
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    components: {
        PActionList,
    },
    setup() {
        return { args };
    },
    template: `
        <PActionList 
            v-bind="args"
        ></PActionList>`,
});

export const ActionList = Template.bind({});

ActionList.args = {
    items: [
        {
            content: 'Action 1',
            onAction: () => {
                alert('Action 1 handled');
            },
        },
        {
            content: 'Action 2',
            onAction: () => {
                alert('Action 2 handled');
            },
        },
    ],
    sections: [
        {
            "title": "Traffic",
            "items": [
                {
                    content: 'Action 3',
                    onAction: () => {
                        alert('Action 3 handled');
                    },
                },
                {
                    content: 'Action 4',
                    onAction: () => {
                        alert('Action 4 handled');
                    },
                },
            ],
        },
    ],
}

import { PVisuallyHidden } from './index';

export default {
    title: 'Titles & Text / Visually Hidden',
    component: PVisuallyHidden,
    argTypes: {
        id: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        default: {
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
        PVisuallyHidden,
    },
    template: `
        <table>
            <thead>
            <tr>
                <th scope="col">
                    <PVisuallyHidden v-bind="args">Line item</PVisuallyHidden>
                </th>
                <th scope="col">
                    <PVisuallyHidden>Value</PVisuallyHidden>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Subtotal</th>
                <td>$184.13</td>
            </tr>
            <tr>
                <th scope="row">Tax</th>
                <td>$0.00</td>
            </tr>
            <tr>
                <th scope="row">Total</th>
                <td>$184.13</td>
            </tr>
            </tbody>
        </table>`,
});
export const VisuallyHidden = Template.bind({});

VisuallyHidden.parameters = {
    docs: {
        source: {
            code: `
<table>
    <thead>
        <tr>
            <th scope="col">
                <PVisuallyHidden v-bind="args">Line item</PVisuallyHidden>
            </th>
            <th scope="col">
                <PVisuallyHidden>Value</PVisuallyHidden>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Subtotal</th>
            <td>$184.13</td>
        </tr>
        <tr>
            <th scope="row">Tax</th>
            <td>$0.00</td>
        </tr>
        <tr>
            <th scope="row">Total</th>
            <td>$184.13</td>
        </tr>
    </tbody>
</table>`
        },
    },
};

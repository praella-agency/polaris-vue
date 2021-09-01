import { PVisuallyHidden } from './index';

export default {
    title: 'Titles & Text / Visually Hidden',
    component: PVisuallyHidden,
}

const Template = (args, {argTypes}) => ({
    components: {
        PVisuallyHidden,
    },
    template: `
      <table>
        <thead>
        <tr>
          <th scope="col">
            <PVisuallyHidden>Line item</PVisuallyHidden>
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

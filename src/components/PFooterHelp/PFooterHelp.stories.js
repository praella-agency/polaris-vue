import { PFooterHelp } from './index';
import { PLink } from '../PLink';

export default {
    title: 'Navigation / Footer Help',
    component: PFooterHelp,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        id: {
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        icon: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PFooterHelp, PLink,
    },
    template: `
      <PFooterHelp
          v-bind="$props"
      >
          Learn more about
          <PLink 
              url="javascript:void(0);"
          >
            fulfilling orders
          </PLink>
      </PFooterHelp>`,
});

export const FooterHelp = Template.bind({});

FooterHelp.args = {
    id: 'MyFooter',
}

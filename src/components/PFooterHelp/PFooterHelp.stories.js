import PFooterHelp from './PFooterHelp';
import { PLink } from '../PLink';

export default {
    title: 'Navigation / Footer Help',
    component: PFooterHelp,
    argTypes: {
        default: {
            table: {
                disable: true,
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

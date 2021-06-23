import PFooterHelp from './PFooterHelp';
import { PLink } from '../PLink';

export default {
    title: 'Navigation / Footer Help',
    component: PFooterHelp,
    argTypes: {
        icon: {
            table: {
                disable: true,
            },
        },
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
              url="https://www.hulkapps.com/" 
              external
          >
            fulfilling orders
          </PLink>
      </PFooterHelp>`,
});

export const FooterHelp = Template.bind({});

FooterHelp.args = {
    id: 'MyFooter',
}

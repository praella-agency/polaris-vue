import PLoading from './PLoading';
import { PFrame } from '../PFrame';

export default {
    title: 'Feedback indicators / Loading',
    component: PLoading,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PLoading, PFrame
    },
    template: `
      <PFrame>
        <PLoading/>
      </PFrame>`,
});

export const Loading = Template.bind({});

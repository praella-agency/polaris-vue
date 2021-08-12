import { PFrame } from './index';

export default {
    title: 'Structure / Frame',
    component: PFrame,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PFrame,
    },
    template: `
      <PFrame></PFrame>`,
});

export const Frame = Template.bind({});

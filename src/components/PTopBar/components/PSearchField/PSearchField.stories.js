import PSearchField from './PSearchField.vue';

export default {
    title: 'Structure / SearchField',
    component: PSearchField,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PSearchField },
    template: `
<PSearchField
    v-bind="$props"
>
</PSearchField>
`,
});

export const SearchField = Template.bind({});

SearchField.args = {

}

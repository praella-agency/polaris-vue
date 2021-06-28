import PIcon from './PIcon';
import IconMDX from './PIcon.mdx';
import * as AllIcon from '@/assets/shopify-polaris-icons';

export default {
    title: 'Images & Icons / Icon',
    component: PIcon,
    parameters: {
        docs: {
            page: IconMDX,
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PIcon,
    },
    template: `
        <PIcon v-bind="$props" />`,
    created() {
        let icons = [];
        for (let iconKey in AllIcon) {
            icons.push(iconKey);
        }
        console.log(icons);
    },
});

export const Icon = Template.bind({});

Icon.args = {
    source: "CodeMajorTwotone",
    color: "red",
}

const IconWrapper = ({ name }: { name: AllIcon }) => {
    const borderColor = theme.colors.border2;

    return (
        <div
            className={css`
        width: 150px;
        padding: 12px;
        border: 1px solid ${borderColor};
        text-align: center;

        &:hover {
          background: ${borderColor};
        }
      `}
        >
            <Icon name={name} />
            <div
                className={css`
          padding-top: 16px;
          word-break: break-all;
          font-family: ${theme.typography.fontFamily.monospace};
          font-size: ${theme.typography.size.xs};
        `}
            >
                {name}
            </div>
        </div>
    );
};

const icons = [...getAvailableIcons()];
icons.sort((a, b) => a.localeCompare(b));

export const IconsOverview = () => {
    const [filter, setFilter] = useState('');

    const searchIcon = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    return (
        <div
            className={css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
        >
            <Field
                className={css`
          width: 300px;
        `}
            >
                <Input onChange={searchIcon} placeholder="Search icons by name" />
            </Field>
            <div
                className={css`
          display: flex;
          flex-wrap: wrap;
        `}
            >
                {icons
                    .filter((val) => val.includes(filter))
                    .map((i) => {
                        return <IconWrapper name={i} key={i} />;
                    })}z`
            </div>
        </div>
    );
};

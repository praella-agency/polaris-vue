import PMediaCard from './PMediaCard';

export default {
    title: 'Structure / Media Card',
    component: PMediaCard,
    argTypes: {
        size: {
            options: ['small', 'medium'],
            control: {
                type: 'select',
            },
        },
        default: {
            table: {
                disable: true,
            },
        },
        primaryAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Content the action displays */
    content?: string;
    /** Callback when an action takes place */
    onAction?(): void;
}`,
                },
            },
        },
        secondaryAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Content the action displays */
    content?: string;
    /** Callback when an action takes place */
    onAction?(): void;
}`,
                },
            },
        },
        videoSrc: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** Media source */
    src: string;
    /** Media Type*/
    type: string;
}]`
                }
            }
        }
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PMediaCard,
    },
    template: `
      <PMediaCard v-bind="$props">
        Discover how Shopify can power up your entrepreneurial journey.
      </PMediaCard>`,
});

export const MediaCard = Template.bind({});

MediaCard.args = {
    portrait: true,
    title: "Getting Started",
    primaryAction: {
        content:'Test',
        onAction: (event) => {
            alert('Triggered Primary ' + event + ' event');
        },
    },
    secondaryAction: {
        content:'Test',
        onAction: (event) => {
            alert('Triggered Secondary ' + event + ' event');
        },
    },
    videoThumbSrc: "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
    videoSrc: [
        {
            src:'https://static.videezy.com/system/resources/previews/000/055/864/original/rorschach_test_2992.mp4',
            type:'video/mp4',
        }
    ],
}

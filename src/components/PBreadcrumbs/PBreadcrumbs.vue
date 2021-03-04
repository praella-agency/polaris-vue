<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { CallbackAction, LinkAction } from '@/types';
import { PUnstyledLink } from '@/components/PUnstyledLink';
import { PIcon } from '@/components/PIcon';

export interface PBreadcrumbsProps {
    breadcrumbs: Array<CallbackAction | LinkAction>;
}

@Component({
    components: {
        PUnstyledLink,
        PIcon,
    },
})
export default class PBreadcrumbs extends Vue {

    /**
     * Collection of breadcrumbs
     */
    @Prop({type: Array, default: []}) public breadcrumbs!: PBreadcrumbsProps['breadcrumbs'];

    public render(h: any) {

        const breadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
        if (breadcrumb == null) {
            return null;
        }

        const { content } = breadcrumb;

        const contentMarkup = (
            <span class='Polaris-Breadcrumbs__ContentWrapper'>
                <span class='Polaris-Breadcrumbs__Icon'>
                    <PIcon source='ChevronLeftMinor' />
                </span>
                <span class='Polaris-Breadcrumbs__Content'>{content}</span>
            </span>
        );

        const breadcrumbClassNames = classNames(
            'Polaris-Breadcrumbs__Breadcrumb',
        );

        const breadcrumbMarkup =
            'url' in breadcrumb ? (
                <PUnstyledLink
                    key={content}
                    url={breadcrumb.url}
                    class={breadcrumbClassNames}
                >
                    {contentMarkup}
                </PUnstyledLink>
            ) : (
                <button
                    key={content}
                    class={breadcrumbClassNames}
                    onClick={breadcrumb.onAction}
                    type='button'
                >
                    {contentMarkup}
                </button>
            );

        return <nav role='navigation'>{breadcrumbMarkup}</nav>;
    }
}
</script>

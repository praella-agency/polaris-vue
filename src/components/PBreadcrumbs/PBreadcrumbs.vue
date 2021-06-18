<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PUnstyledLink } from '@/components/PUnstyledLink';
import { PIcon } from '@/components/PIcon';

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
    @Prop({type: Array, default: Array}) public breadcrumbs!: [];

    public render(h: any) {

        const breadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
        if (breadcrumb == null) {
            return null;
        }

        const { content } = breadcrumb;

        // const contentOldMarkup = (
        //     <span class='Polaris-Breadcrumbs__ContentWrapper'>
        //         <span class='Polaris-Breadcrumbs__Icon'>
        //             <PIcon source='ChevronLeftMinor' />
        //         </span>
        //         <span class='Polaris-Breadcrumbs__Content'>{content}</span>
        //     </span>
        // );

        const contentMarkup = this.$createElement('span', {
            class: 'Polaris-Breadcrumbs__ContentWrapper',
        }, [
            this.$createElement('span', {
              class: 'Polaris-Breadcrumbs__Icon',
            }, [
              this.$createElement(PIcon, {
                attrs: {
                  source: 'ChevronLeftMinor',
                },
              }),
            ]),
            this.$createElement('span', {
              class: 'Polaris-Breadcrumbs__Content',
            }, content),
        ]);

        const breadcrumbClassNames = classNames(
            'Polaris-Breadcrumbs__Breadcrumb',
        );

        // const breadcrumbOldMarkup =
        //     'url' in breadcrumb || 'to' in breadcrumb ? (
        //         <PUnstyledLink
        //             key={content}
        //             url={breadcrumb.url}
        //             to={breadcrumb.to}
        //             class={breadcrumbClassNames}
        //         >
        //             {contentMarkup}
        //         </PUnstyledLink>
        //     ) : (
        //         <button
        //             key={content}
        //             class={breadcrumbClassNames}
        //             onClick={breadcrumb.onAction}
        //             type='button'
        //         >
        //             {contentMarkup}
        //         </button>
        //     );

        const breadcrumbMarkup =
            'url' in breadcrumb || 'to' in breadcrumb ? (
                this.$createElement(PUnstyledLink, {
                  class: breadcrumbClassNames,
                  attrs: {
                    key: content,
                    url: breadcrumb.url,
                    to: breadcrumb.to,
                  },
                }, [contentMarkup])
            ) : (
                this.$createElement('button', {
                  attrs: {
                    key: content,
                    onClick: breadcrumb.onAction,
                    type: 'button',
                  },
                }, [contentMarkup])
            );

        // return <nav role='navigation'>{breadcrumbMarkup}</nav>;
        return this.$createElement('nav', {
          attrs: {
            role: 'navigation',
          },
        }, [breadcrumbMarkup]);
    }
}
</script>

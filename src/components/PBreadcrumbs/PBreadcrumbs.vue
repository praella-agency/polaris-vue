<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PUnstyledLink } from '@/components/PUnstyledLink';
import { PIcon } from '@/components/PIcon';

interface PBreadcrumbsProps {
  content?: any;
  url?: any;
  to?: any;
  onAction?(): void;
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
    @Prop({type: Array, default: Array}) public breadcrumbs!: [];

    public render(h: any) {

        const breadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1] as PBreadcrumbsProps;
        if (breadcrumb == null) {
            return null;
        }

        const { content } = breadcrumb;
        const { onAction } = breadcrumb;

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

        const breadcrumbMarkup =
            'url' in breadcrumb || 'to' in breadcrumb ? (
                this.$createElement(PUnstyledLink, {
                  class: breadcrumbClassNames,
                  attrs: {
                    key: content,
                    url: breadcrumb.url,
                    to: breadcrumb.to,
                  },
                  nativeOn: {
                    click: onAction,
                  },
                }, [contentMarkup])
            ) : (
                this.$createElement('button', {
                  attrs: {
                    key: content,
                    type: 'button',
                  },
                  on: {
                    click: onAction,
                  },
                }, [contentMarkup])
            );

        return this.$createElement('nav', {
          attrs: {
            role: 'navigation',
          },
        }, [breadcrumbMarkup]);
    }
}
</script>

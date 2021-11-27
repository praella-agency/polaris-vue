<script>
    import { classNames } from '../../utilities/css';
    import { PUnstyledLink } from '../../components/PUnstyledLink';
    import { PIcon } from '../../components/PIcon';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';

    const PBreadcrumbsProps = {
        content: [String, Object],
        url: String,
        to: [String, Object],
        accessibilityLabel: String,
        onAction: Function,
    }

    export default {
        name: 'PBreadcrumbs',
        components: {
            PUnstyledLink, PIcon,
        },
        props: {
            /**
             * Collection of breadcrumbs
             */
            breadcrumbs: {
                type: Array,
                default: () => ([]),
                ...ArrayValidator('breadcrumbs', PBreadcrumbsProps),
            },
        },
        render(h) {
            const breadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
            if (breadcrumb == null) {
                return null;
            }

            const {content} = breadcrumb;
            const {onAction} = breadcrumb;

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
                            ariaLabel: breadcrumb.accessibilityLabel,
                        },
                        nativeOn: {
                            // tslint:disable-next-line:no-empty
                            click: onAction ? onAction : () => {
                            },
                        },
                    }, [contentMarkup])
                ) : (
                    this.$createElement('button', {
                        class: breadcrumbClassNames,
                        attrs: {
                            key: content,
                            type: 'button',
                            ariaLabel: breadcrumb.accessibilityLabel,
                        },
                        on: {
                            // tslint:disable-next-line:no-empty
                            click: onAction ? onAction : () => {
                            },
                        },
                    }, [contentMarkup])
                );

            return this.$createElement('nav', {
                attrs: {
                    role: 'navigation',
                },
            }, [breadcrumbMarkup]);
        },
    }
</script>

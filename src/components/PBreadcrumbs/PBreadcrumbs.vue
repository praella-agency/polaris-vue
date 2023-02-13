<script>
    import { vue } from '../../ComponentHelpers';
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

    let render = {};

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
        render() {
            const breadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
            if (breadcrumb == null) {
                return null;
            }

            const {content} = breadcrumb;
            const {onAction} = breadcrumb;
            let contentMarkup = null;


            contentMarkup = vue.h('span', {
                class: 'Polaris-Breadcrumbs__ContentWrapper',
            }, [
                vue.h('span', {
                    class: 'Polaris-Breadcrumbs__Icon',
                }, [
                    vue.h(PIcon, {
                        source: 'ChevronLeftMinor',
                    }),
                ]),
                vue.h('span', {
                    class: 'Polaris-Breadcrumbs__Content',
                }, content),
            ]);

            const breadcrumbClassNames = classNames(
                'Polaris-Breadcrumbs__Breadcrumb',
            );

            let breadcrumbMarkup = null;
            breadcrumbMarkup = 'url' in breadcrumb || 'to' in breadcrumb ? (
                vue.h(PUnstyledLink, {
                    class: breadcrumbClassNames,
                    key: content,
                    url: breadcrumb.url,
                    to: breadcrumb.to,
                    ariaLabel: breadcrumb.accessibilityLabel,
                    // tslint:disable-next-line:no-empty
                    onClick: onAction ? onAction : () => {
                    },
                }, () => [contentMarkup])
            ) : (
                vue.h('button', {
                    class: breadcrumbClassNames,
                    key: content,
                    type: 'button',
                    ariaLabel: breadcrumb.accessibilityLabel,
                    // tslint:disable-next-line:no-empty
                    onClick: onAction ? onAction : () => {
                    },
                }, [contentMarkup])
            );

            return vue.h('nav', {
                    role: 'navigation',
            }, [breadcrumbMarkup]);

        },
    }
</script>

<script>
    import utils from '../../utilities';
    import { h } from 'vue';
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

    if (utils.isVue3) {

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
        render() {
            const breadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
            if (breadcrumb == null) {
                return null;
            }

            const {content} = breadcrumb;
            const {onAction} = breadcrumb;
            let contentMarkup = null;

            if (utils.isVue3) {
                contentMarkup = h('span', {
                    class: 'Polaris-Breadcrumbs__ContentWrapper',
                }, [
                    h('span', {
                        class: 'Polaris-Breadcrumbs__Icon',
                    }, [
                        h(PIcon, {
                            source: 'ChevronLeftMinor',
                        }),
                    ]),
                    h('span', {
                        class: 'Polaris-Breadcrumbs__Content',
                    }, content),
                ]);
            } else {
                contentMarkup = this.$createElement('span', {
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
            }

            const breadcrumbClassNames = classNames(
                'Polaris-Breadcrumbs__Breadcrumb',
            );

            let breadcrumbMarkup = null;

            if (utils.isVue3) {
                breadcrumbMarkup = 'url' in breadcrumb || 'to' in breadcrumb ? (
                    h(PUnstyledLink, {
                        class: breadcrumbClassNames,
                        key: content,
                        url: breadcrumb.url,
                        to: breadcrumb.to,
                        ariaLabel: breadcrumb.accessibilityLabel,
                        // tslint:disable-next-line:no-empty
                        onClick: onAction ? onAction : () => {
                        },
                    }, [contentMarkup])
                ) : (
                    h('button', {
                        class: breadcrumbClassNames,
                        key: content,
                        type: 'button',
                        ariaLabel: breadcrumb.accessibilityLabel,
                        // tslint:disable-next-line:no-empty
                        onClick: onAction ? onAction : () => {
                        },
                    }, [contentMarkup])
                );

                return h('nav', {
                        role: 'navigation',
                }, [breadcrumbMarkup]);
            } else {
                breadcrumbMarkup = 'url' in breadcrumb || 'to' in breadcrumb ? (
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
            }
        },
    }
</script>

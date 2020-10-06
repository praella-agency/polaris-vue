<template>
    <nav role="navigation">
        <PUnstyledLink v-if="breadcrumb.url" :key="breadcrumb.content" :url="breadcrumb.url" class="Polaris-Breadcrumbs__Breadcrumb">
            <span class="Polaris-Breadcrumbs__ContentWrapper">
                <span class="Polaris-Breadcrumbs__Icon">
                    <PIcon source="ChevronLeftMinor" />
                </span>
                <span class="Polaris-Breadcrumbs__Content">{{breadcrumb.content}}</span>
            </span>
        </PUnstyledLink>
        <button v-else type="button" :key="breadcrumb.content" class="Polaris-Breadcrumbs__Breadcrumb" @click="$emit('click', $event)">
            <span class="Polaris-Breadcrumbs__ContentWrapper">
                <span class="Polaris-Breadcrumbs__Icon">
                    <PIcon source="ChevronLeftMinor" />
                </span>
                <span class="Polaris-Breadcrumbs__Content">{{breadcrumb.content}}</span>
            </span>
        </button>
    </nav>
</template>

<script lang="tsx">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import {CallbackAction, LinkAction} from '@/types';
    import {PUnstyledLink} from '@/components/PUnstyledLink';
    import {PIcon} from '@/components/PIcon';

    export interface PBreadcrumbsProps {
        breadcrumbs: (CallbackAction | LinkAction)[];
    }

    @Component({
        components: {
            PUnstyledLink,
            PIcon,
        },
    })
    export class PBreadcrumbs extends Vue {

        public get breadcrumbs() {

            return this.$props;
        }

        public get breadcrumb() {
            return this.breadcrumbs[this.breadcrumbs.length - 1];
        }

        public render(h: any) {

            const {breadcrumbs} = this.$props;
            const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
            if (breadcrumb == null) {
                return null;
            }

            const {content} = breadcrumb;

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
                        type="button"
                    >
                        {contentMarkup}
                    </button>
                );

            return <nav role='navigation'>{breadcrumbMarkup}</nav>;
        }
    }
</script>

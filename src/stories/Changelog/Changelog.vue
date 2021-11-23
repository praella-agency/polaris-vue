<template>
    <PFrame>
        <PTopBar
            slot="topBar"
            :searchField="{
                value: search,
                placeholder: 'Search',
                showFocusBorder: true,
          }"
            :searchResultsVisible="false"
            @searchFieldChange="searchRelease"
            @searchResultsDismiss="handleSearchResultsDismiss"
        />
        <PStack vertical>
            <PStackItem v-for="(release, key) in releases" :key="key">
                <PCard sectioned>
                    <PStack vertical>
                        <PStackItem>
                            <PButton
                                @click="handleToggle(key)"
                                :aria-expanded="isOpen[key]"
                                aria-controls="basic-collapsible"
                                plain
                            >
                                {{ release['tag_name'] + ' - ' + release['name'] }}
                            </PButton>
                        </PStackItem>
                        <PStackItem style="margin: 0 0 0 -1px;">
                            {{ formatDate(release['published_at']) }}
                        </PStackItem>
                        <PStackItem>
                            <PCollapsible
                                :open="isOpen[key]"
                                :id="`basic-collapsible-${key}`"
                                :transition="{duration: '500ms', timingFunction: 'ease-in-out'}"
                                :expandOnPrint="true"
                            >
                                <PTextContainer>
                                    <p v-html="formattedContent(release['body'])"/>
                                </PTextContainer>
                            </PCollapsible>
                        </PStackItem>
                    </PStack>
                </PCard>
            </PStackItem>
        </PStack>
    </PFrame>
</template>

<script>
    import { PDisplayText } from '../../components/PDisplayText';
    import { PLayout } from '../../components/PLayout';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PList } from '../../components/PList';
    import { PListItem } from '../../components/PList/components/PListItem';
    import { PLink } from '../../components/PLink/index.js';
    import { PCard } from '../../components/PCard';
    import { PCardSection } from '../../components/PCard/components/PCardSection';
    import { PCardHeader } from '../../components/PCard/components/PCardHeader';
    import { PHeading } from '../../components/PHeading';
    import { PTextContainer } from '../../components/PTextContainer';
    import { PCollapsible } from '../../components/PCollapsible';
    import { PButton } from '../../components/PButton/index.js';
    import { PFrame } from '../../components/PFrame';
    import { PTopBar } from '../../components/PTopBar';
    import dayjs from 'dayjs';
    import showdown from 'showdown';

    export default {
        name: 'Changelog',
        data() {
            return {
                published_month: '',
                releases: {},
                isOpen: {},
                search: '',
            };
        },
        components: {
            PDisplayText, PLayout, PStack, PStackItem, PList, PListItem, PLink, PCard, PCardHeader, PCardSection,
            PHeading, PTextContainer, PCollapsible, PButton, PFrame, PTopBar,
        },
        filters: {
            trimContent(content) {
                content = content.trim();
                if (content.startsWith('*')) {
                    content = content.replace('*', '');
                }
                return content;
            },
        },
        methods: {
            formatDate(date) {
                return dayjs(date).format('DD MMMM YYYY');
            },
            formattedContent(text) {
                const converter = new showdown.Converter();
                return converter.makeHtml(text);
            },
            handleToggle(key) {
                if (!this.isOpen[key] || this.isOpen[key] === false) {
                    this.$set(this.isOpen, key, true);
                } else {
                    this.$set(this.isOpen, key, false);
                }
            },
            handleSearchResultsDismiss() {
                this.releases.forEach((item, index) => {
                    this.$set(this.isOpen, index, false);
                });
            },
            searchRelease(value) {
                if (value) {
                    this.releases.forEach((item, index) => {
                        if (
                            /* tslint:disable-next-line */
                            item['tag_name'].toLowerCase().includes(value.toLowerCase()) ||
                            /* tslint:disable-next-line */
                            item['name'].toLowerCase().includes(value.toLowerCase()) ||
                            /* tslint:disable-next-line */
                            item['published_at'].toLowerCase().includes(value.toLowerCase()) ||
                            /* tslint:disable-next-line */
                            item['body'].toLowerCase().includes(value.toLowerCase())
                        ) {
                            this.$set(this.isOpen, index, true);
                        } else {
                            this.$set(this.isOpen, index, false);
                        }
                    });
                } else {
                    this.releases.forEach((item, index) => {
                        this.$set(this.isOpen, index, false);
                    });
                }
            },
        },
        async created() {
            const response = await fetch('https://api.github.com/repos/hulkapps/polaris-vue/releases');
            this.releases = await response.json();
        },
    };
</script>

<style>
    .release-content > ul {
        padding-left: 2rem;
        margin-top: 0;
        margin-bottom: 0;
        list-style: disc outside none;
    }

    .release-content > ul > li {
        margin-bottom: .8rem;
    }
</style>
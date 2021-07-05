<template>
    <PStack spacing="extraLoose">
        <PStackItem fill>
            <PCard v-for="(release, key) in releases" :key="key" :actions="[]" subdued>
                <PCardHeader
                        :title="release['tag_name']+ ' - ' +release['name']"
                        :shortDescription="formatDate(release['published_at'])"
                />
                <PCardSection>
                    <PList>
                        <PListItem  v-for="(bodyContent, key1) in bodyText(release['id'])"
                                    v-if="bodyContent.trim()"
                                    :key="key1">{{ bodyContent | trimContent }}</PListItem>
                    </PList>
                </PCardSection>
            </PCard>

        </PStackItem>
    </PStack>
</template>

<script>
    import { PDisplayText } from "../../components/PDisplayText";
    import { PLayout } from "../../components/PLayout";
    import { PStack, PStackItem } from "../../components/PStack";
    import { PList, PListItem } from "../../components/PList";
    import { PLink } from "../../components/PLink";
    import { PCard, PCardHeader, PCardSection } from "../../components/PCard";
    import { PHeading } from "../../components/PHeading";
    import { PTextContainer } from "../../components/PTextContainer";
    import dayjs from "dayjs";

    export default {
        name: "Changelog",
        data() {
            return {
                published_month: '',
                releases: {},
            };
        },
        components: {
            PDisplayText, PLayout, PStack, PStackItem, PList, PListItem, PLink, PCard, PCardHeader, PCardSection,
            PHeading, PTextContainer,
        },
        filters: {
            trimContent(content) {
                content = content.trim();
                if(content.startsWith('*')) {
                    content = content.replace('*', '');
                }
                return content;
            }
        },
        methods: {
            formatDate(date) {
                return dayjs(date).format('DD MMMM YYYY');
            },
            bodyText(id) {
                for (let release of this.releases) {
                    if (release['id'] === id) {
                        let bodyText = release['body'].split('\r\n');
                        for (let [index, text] of Object.entries(bodyText)) {
                            if(text === "") {
                                delete bodyText[index];
                            }
                        }
                        bodyText = Object.values(bodyText);
                        return bodyText;
                    }
                }
            },
        },
        async created() {
            const response = await fetch("https://api.github.com/repos/hulkapps/polaris-vue/releases");
            this.releases = await response.json();
        },
    }
</script>

<style scoped>

</style>
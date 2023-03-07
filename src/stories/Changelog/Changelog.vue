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
                                :aria-controls="`basic-collapsible-${key}`"
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
                                :open="key <= 2 ? true : isOpen[key]"
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

<script setup>
    import { onMounted, ref } from 'vue';
    import { PFrame } from '../../components/PFrame';
    import { PTopBar } from '../../components/PTopBar';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PCard } from '../../components/PCard';
    import { PTextContainer } from '../../components/PTextContainer';
    import { PCollapsible } from '../../components/PCollapsible';
    import { PButton } from '../../components/PButton';
    import dayjs from 'dayjs';
    import showdown from 'showdown';

    let releases = ref({});
    let isOpen = ref({});
    let search = ref('');

    function formatDate(date) {
        return dayjs(date).format('DD MMMM YYYY');
    }

    function formattedContent(text) {
        const converter = new showdown.Converter();
        return converter.makeHtml(text);
    }

    function handleToggle(key) {
        if (key > 2) {
            isOpen.value[key] = !isOpen.value[key] || isOpen.value[key] === false;
        }
    }

    function handleSearchResultsDismiss() {
        releases.value.forEach((item, index) => {
            isOpen.value[index] = false;
        });
    }

    function searchRelease(value) {
        if (value) {
            releases.value.forEach((item, index) => {
                isOpen.value[index] = item['tag_name'].toLowerCase().includes(value.toLowerCase()) ||
                    /* tslint:disable-next-line */
                    item['name'].toLowerCase().includes(value.toLowerCase()) ||
                    /* tslint:disable-next-line */
                    item['published_at'].toLowerCase().includes(value.toLowerCase()) ||
                    /* tslint:disable-next-line */
                    item['body'].toLowerCase().includes(value.toLowerCase());
            });
        } else {
            releases.value.forEach((item, index) => {
                isOpen.value[index] = false;
            });
        }
    }

    onMounted(async () => {
        const response = await fetch('https://api.github.com/repos/hulkapps/polaris-vue/releases');
        releases.value = await response.json();
    })
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
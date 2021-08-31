<template>
  <PStack spacing="extraLoose">
    <PStackItem fill>
      <PCard v-for="(release, key) in releases" :key="key" :actions="[]" subdued>
        <PCardHeader
            :title="release['tag_name']+ ' - ' +release['name']"
            :shortDescription="formatDate(release['published_at'])"
        />
        <PCardSection class="release-content" v-html="formattedContent(release['body'])">
        </PCardSection>
      </PCard>
    </PStackItem>
  </PStack>
</template>

<script>
import {PDisplayText} from '../../components/PDisplayText';
import {PLayout} from '../../components/PLayout';
import {PStack, PStackItem} from '../../components/PStack';
import {PList, PListItem} from '../../components/PList';
import {PLink} from '../../components/PLink';
import {PCard, PCardHeader, PCardSection} from '../../components/PCard';
import {PHeading} from '../../components/PHeading';
import {PTextContainer} from '../../components/PTextContainer';
import dayjs from 'dayjs';
import showdown from 'showdown';

export default {
  name: 'Changelog',
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
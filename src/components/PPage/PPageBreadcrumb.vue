<template>
    <div>
        <div class="Polaris-Page-Header__Navigation">
            <div class="Polaris-Page-Header__BreadcrumbWrapper">
                <nav role="navigation">
                    <a v-for="breadcrumb in breadcrumbs" class="Polaris-Breadcrumbs__Breadcrumb" :href="breadcrumb.url" data-polaris-unstyled="true">
                        <span class="Polaris-Breadcrumbs__ContentWrapper">
                            <span class="Polaris-Breadcrumbs__Icon">
                                <PIcon source="ChevronLeftMinor" />
                            </span>
                            <span class="Polaris-Breadcrumbs__Content">{{ breadcrumb.content }}</span>
                        </span>
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';
  import { PIcon } from '@/components/PIcon';
  @Component({
    components: { PIcon },
  })
  export default class PPageBreadcrumb extends Vue {
    @Prop(Object) public breadcrumbs!: object;
    public get className() {
      return classNames(
        'Polaris-Page-Header__Navigation',
      );
    }
  }
</script>

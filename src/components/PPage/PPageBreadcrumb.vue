<template>
    <div>
        <div class="Polaris-Page-Header__Navigation">
            <div class="Polaris-Page-Header__BreadcrumbWrapper">
                <nav role="navigation">
                    <a v-for="breadcrumb in breadcrumbs" class="Polaris-Breadcrumbs__Breadcrumb" :href="breadcrumb.url" data-polaris-unstyled="true">
                        <span class="Polaris-Breadcrumbs__ContentWrapper">
                            <span class="Polaris-Breadcrumbs__Icon">
                                <span class="Polaris-Icon">
                                    <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                      <path d="M12 16a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L8.414 10l4.293 4.293A.999.999 0 0 1 12 16" fill-rule="evenodd"></path>
                                    </svg>
                                </span>
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

  @Component({
    components: { },
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

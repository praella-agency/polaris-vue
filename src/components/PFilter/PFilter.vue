<template>
  <div>
    <div class="Polaris-Filters">
      <div class="Polaris-Filters-ConnectedFilterControl__Wrapper">
        <div class="Polaris-Filters-ConnectedFilterControl Polaris-Filters-ConnectedFilterControl--right">
          <PFilterItemWrapper position="center" v-if="!hideQueryField">
            <PTextField
                id="Polaris-Input-Filter"
                connected
                labelHidden
                showPrefix
                showClearButton
                :placeholder="queryPlaceholder || resourceTitle || resource"
                @change="onQueryChange"
                @blur="onQueryBlur"
                @focus="onQueryFocus"
                :value="queryValue || inputFilter"
                :autoFocus="focused"
                :label="queryPlaceholder || resourceTitle || resource"
                clearable
                :disabled="disabled"
                v-on="$listeners"
            >
              <PIcon source="SearchMinor" slot="prefix"/>
            </PTextField>
          </PFilterItemWrapper>
          <PFilterItemWrapper v-if="$slots.hasOwnProperty('default')" position="right">
            <!-- @slot The content to display inline with the controls -->
            <slot/>
          </PFilterItemWrapper>
        </div>
        <div class="Polaris-Filters-ConnectedFilterControl__AuxiliaryContainer">
          <!-- @slot Add extra elements -->
          <slot name="auxiliaryContainer"/>
        </div>
      </div>
      <div class="Polaris-Filters__TagsContainer" v-if="!hideTags">
        <PTag v-for="(filter, key) in appliedFilters" :key="key" v-on="$listeners" removable :tag="filter"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { PTextField } from '@/components/PTextField';
  import { PIcon } from './../../components/PIcon/index.js';
  import { PTag } from '@/components/PTag';
  import { PFilterItemWrapper } from '@/components/PFilter/components/PFilterItemWrapper';

  interface ResourceNameInterface {
    singular: string;
    plural: string;
  }

  interface AppliedFiltersInterface {
    value: string;
    key: string;
  }

  export interface FilterInterface {
    /** A unique key used to identify the filter */
    key: string;
    /** The label for the filter */
    label: string;
    /** The markup for the given filter */
    filter: string;
    /** Whether or not the filter should have a shortcut popover displayed */
    shortcut?: boolean;
    /** Whether or not the filter is disabled */
    disabled?: boolean;
    /**
     * @default false
     * Whether or not the clear button is displayed
     */
    hideClearButton?: boolean;
  }

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">Filters is a composite component that filters the items of a list or table.</h4>
   */
  @Component({
    components: {
      PTextField, PIcon, PTag, PFilterItemWrapper,
    },
  })
  export default class PFilter extends Vue {

    /**
     * Title or placeholder for the element
     */
    @Prop({type: Object}) public resourceName!: ResourceNameInterface;

    /**
     * Title or placeholder for the element. **Deprecated** ResourceTitle will be removed in version 3.0.0
     */
    @Prop({type: String, default: null}) public resourceTitle!: string;

    /**
     * Add default value to filter
     */
    @Prop({type: String, default: null}) public inputFilter!: string;

    /**
     * Applied filters which are rendered as tags. The remove callback is called with respective key
     */
    @Prop({type: Array, default: Array}) public appliedFilters!: AppliedFiltersInterface[];

    /**
     * Currently entered text in the query field
     */
    @Prop({type: String, default: null}) public queryValue!: string;

    /**
     * Placeholder text for the query field
     */
    @Prop({type: String, default: null}) public queryPlaceholder!: string;

    /**
     * Whether the query field is focused
     */
    @Prop({type: Boolean, default: false}) public focused!: boolean;

    /**
     * Available filters added to the sheet. Shortcut filters are exposed outside of the sheet.
     */
    @Prop({type: Array, default: () => ([])}) public filters!: FilterInterface[];

    /**
     * Callback when the query field is changed
     */
    @Prop({
      // tslint:disable-next-line:no-empty
      type: Function, default: (queryValue) => {
      },
    }) public onQueryChange!: void;

    /**
     * Callback when the clear button is triggered
     */
    @Prop({
      // tslint:disable-next-line:no-empty
      type: Function, default: () => {
      },
    }) public onQueryClear!: void;

    /**
     * Callback when the reset all button is pressed
     */
    @Prop({
      // tslint:disable-next-line:no-empty
      type: Function, default: () => {
      },
    }) public onQueryClearAll!: void;

    /**
     * Callback when the query field is blurred
     */
    @Prop({
      // tslint:disable-next-line:no-empty
      type: Function, default: () => {
      },
    }) public onQueryBlur!: void;

    /**
     * Callback when the query field is focused
     */
    @Prop({
      // tslint:disable-next-line:no-empty
      type: Function, default: () => {
      },
    }) public onQueryFocus!: void;

    /**
     * Disable all filters
     */
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    /**
     * Additional hint text to display below the filters
     */
    @Prop({type: String, default: null}) public helpText!: string;

    /**
     * Hide tags for applied filters
     */
    @Prop({type: Boolean, default: false}) public hideTags!: boolean;

    /**
     * Hide the query field
     */
    @Prop({type: Boolean, default: false}) public hideQueryField!: boolean;

    public appliedFiltersCount = this.appliedFilters ? this.appliedFilters.length : 0;

    public get prefix() {
      return `${this.resourceName.plural.toLowerCase()}`;
    }

    public get resource() {
      const resourceName: ResourceNameInterface = this.resourceName;
      return this.resourceName ? 'Filter ' + resourceName.plural.toLowerCase() :
        (this.resourceName ? 'Filter ' + resourceName.singular.toLowerCase() : '');
    }

    public mounted() {
      if (this.resourceTitle != null) {
        // tslint:disable-next-line:no-console
        console.error('Deprecation Notice: `resourceTitle` will be removed in version 3.0.0, use `resourceName` ' +
          'instead.');
      }

      if (this.inputFilter != null) {
        // tslint:disable-next-line:no-console
        console.error('Deprecation Notice: `inputFilter` will be removed in version 3.0.0, use `queryValue` instead.');
      }
    }
  }
</script>

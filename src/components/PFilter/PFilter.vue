<template>
    <div>
        <div class="Polaris-Filters">
            <div class="Polaris-Filters-ConnectedFilterControl__Wrapper">
                <div class="Polaris-Filters-ConnectedFilterControl Polaris-Filters-ConnectedFilterControl--right">
                    <div class="Polaris-Filters-ConnectedFilterControl__CenterContainer">
                        <div class="Polaris-Filters-ConnectedFilterControl__Item">
                            <PTextField id="Polaris-Input-Filter" :value="inputFilter" connected labelHidden showPrefix showClearButton :placeholder="prefix" v-on="$listeners">
                                <PIcon source="SearchMinor" slot="prefix"></PIcon>
                            </PTextField>
                        </div>
                    </div>
                    <div class="Polaris-Filters-ConnectedFilterControl__RightContainer">
                        <slot />
                    </div>
                </div>
            </div>
            <div class="Polaris-Filters__TagsContainer">
                <PTag v-for="(filter, key) in appliedFilters" v-on="$listeners" removable :tag="filter"></PTag>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import { PTextField } from '@/components/PTextField';
import { PIcon } from '@/components/PIcon';
import { PTag } from '@/components/PTag';

interface AppliedFiltersInterface {
    value: string;
    key: string;
}

@Component({
    components: {
        PTextField, PIcon, PTag,
    },
})
export default class PFilter extends Vue {

    @Prop(String) public resourceTitle!: string;
    @Prop(String) public inputFilter!: string;
    @Prop(Array) public appliedFilters!: AppliedFiltersInterface[];

    public get prefix() {

        return `Filter ${this.resourceTitle.toLowerCase()}`;
    }
}
</script>

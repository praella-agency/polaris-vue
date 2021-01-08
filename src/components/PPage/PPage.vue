<template>
    <div :class="className">
        <PPageHeader
            v-if="hasHeaderContent"
            :title="title"
            :breadcrumbs="breadcrumbs"
            :primaryAction="primaryAction"
            :secondaryActions="secondaryActions"
            :actionGroups="actionGroups"
            v-bind="$attrs"
            v-on="$listeners">
            <slot slot="primaryAction" name="primaryAction" />
            <slot slot="thumbnail" name="thumbnail" />
            <slot slot="titleMetadata" name="titleMetadata" />
            <slot slot="additionalNavigation" name="additionalNavigation" />
        </PPageHeader>
        <div class="Polaris-Page__Content">
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';
import {PPageHeader, PPageHeaderProps} from './components';
import {PBreadcrumbsProps} from '@/components/PBreadcrumbs';
import {
    DestructableAction,
    DisableableAction, IconableAction,
    LoadableAction,
    MenuActionDescriptor,
    MenuGroupDescriptor,
} from '@/types';

export interface PPageProps extends PPageHeaderProps {
    fullWidth?: boolean;
    narrowWidth?: boolean;
}

interface PrimaryAction
    extends DestructableAction,
        DisableableAction,
        LoadableAction,
        IconableAction {
    primary?: boolean;
}

@Component({
    components: {
        PPageHeader,
    },
})
export default class PPage extends Vue {

    @Prop(Boolean) public fullWidth!: boolean;
    @Prop(Boolean) public narrowWidth!: boolean;
    @Prop(String) public title!: string;
    @Prop(Object) public primaryAction!: PrimaryAction;
    @Prop({type: Array, default: () => []}) public secondaryActions!: MenuActionDescriptor[];
    @Prop({type: Array, default: () => []}) public actionGroups!: MenuGroupDescriptor[];
    @Prop({type: Array, default: () => []}) public breadcrumbs!: PBreadcrumbsProps['breadcrumbs'];

    public get hasHeaderContent() {
        return (this.title != null && this.title !== '') ||
            this.primaryAction != null ||
            (this.secondaryActions != null && this.secondaryActions.length > 0) ||
            (this.actionGroups != null && this.actionGroups.length > 0) ||
            (this.breadcrumbs != null && this.breadcrumbs.length > 0);
    }

    public get className() {
        return classNames(
            'Polaris-Page',
            this.fullWidth && 'Polaris-Page--fullWidth',
            this.narrowWidth && 'Polaris-Page--narrowWidth',
        );
    }
}
</script>

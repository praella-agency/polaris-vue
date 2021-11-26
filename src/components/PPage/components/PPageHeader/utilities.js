import {
    MenuGroupDescriptor,
    MenuActionDescriptor,
    DestructableAction,
    DisableableAction,
    LoadableAction,
    IconableAction,
} from '../../../../types/types';
import { PPageHeaderTitleProps } from '../../../../components/PPage/components/PPageHeaderTitle/utilities';
import { PPaginationDescriptor } from '../../../../components/PPagination';

const PrimaryAction = {
    ...DestructableAction,
    ...DisableableAction,
    ...LoadableAction,
    ...IconableAction,
    primary: Boolean,
}

export const PPageHeaderProps = {
    ...PPageHeaderTitleProps,
    titleHidden: Boolean,
    separator: Boolean,
    primaryAction: {
        type: Object,
        properties: PrimaryAction,
    },
    pagination: {
        type: Object,
        properties: PPaginationDescriptor,
    },
    breadcrumbs: Array,
    secondaryActions: {
        type: Array,
        properties: MenuActionDescriptor
    },
    actionGroups: {
        type: Array,
        properties: MenuGroupDescriptor,
    },
    additionalMetaData: String,
}

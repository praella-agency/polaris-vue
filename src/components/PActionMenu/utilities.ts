import {MenuActionDescriptor, MenuGroupDescriptor} from '@/types';

type MenuDescriptorWithIndex = (MenuActionDescriptor | MenuGroupDescriptor) & {
    index: number;
};

export function sortAndOverrideActionOrder(
    actions: Array<MenuActionDescriptor | MenuGroupDescriptor>,
) {
    const actionsWithOverrides = actions.filter(
        (action) => action.index !== undefined,
    ) as MenuDescriptorWithIndex[];

    if (actionsWithOverrides.length === 0) {
        return actions;
    }

    const sortedActionsWithOverrides = actionsWithOverrides.sort(
        ({index: indexA}, {index: indexB}) => {
            return indexA - indexB;
        },
    );

    const actionsWithoutOverrides = actions.filter(
        (action) => action.index === undefined,
    );

    const overriddenActions: Array<MenuActionDescriptor | MenuGroupDescriptor> = [
        ...actionsWithoutOverrides,
    ];

    sortedActionsWithOverrides.forEach((action) => {
        overriddenActions.splice(action.index, 0, action);
    });

    return overriddenActions;
}

export interface ActionMenuProps {
    actions?: MenuActionDescriptor[];
    groups?: MenuGroupDescriptor[];
    rollup?: boolean;
}

export function hasGroupsWithActions(groups: ActionMenuProps['groups'] = []) {
    return groups.length === 0
      ? false
      : groups.some((group) => group.actions.length > 0);
}

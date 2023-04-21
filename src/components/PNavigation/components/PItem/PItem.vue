<template>
    <li :class="className">
        <div class="Polaris-Navigation__ItemWrapper">
            <PUnstyledLink
                :class="itemClassName"
                :url="url"
                :to="to"
                :external="external"
                :tabindex="tabIndex"
                :aria-disabled="disabled"
                :aria-label="accessibilityLabel"
                @click="getClickHandler"
                @keyup="handleKeyUp"
                @blur="handleBlur"
                :aria-expanded="normalizeAriaAttributesForExpanded"
                :aria-controls="normalizeAriaAttributesForControls"
            >

                <div v-if="icon" :class="iconSlotClassName">
                    <span class="Polaris-Navigation__Icon--span">
                        <slot name="icon" :item="itemValue">
                            <PIcon :source="icon"/>
                        </slot>
                    </span>
                </div>
                <span class="Polaris-Navigation__Text">
                    {{ label }}
                    <span v-if="hasNewChild" class="Polaris-Navigation__Indicator">
                        <span class="Polaris-Indicator Polaris-Indicator--pulseIndicator"/>
                    </span>
                </span>
                <div v-if="this.new || badge || isSlot($slots.badge)"
                     class="Polaris-Navigation__Badge">
                    <PBadge v-if="this.new" status="new" size="small">
                        New
                    </PBadge>
                    <PBadge v-else-if="badge" status="new" size="small">
                        {{ badge }}
                    </PBadge>
                    <slot v-else name="badge"/>
                </div>

                <div v-if="external" class="Polaris-Navigation__ExternalIcon">
                    <PIcon
                        :accessibilityLabel="accessibilityLabel"
                        source="ExternalMinor"
                        color="base"
                    />
                </div>
            </PUnstyledLink>
            <PUnstyledLink
                v-if="Object.keys(secondaryAction).length > 0"
                class="Polaris-Navigation__SecondaryAction"
                external
                :url="secondaryAction.url"
                :to="secondaryAction.to"
                :tabindex="tabIndex"
                :aria-disabled="disabled"
                :aria-label="secondaryAction.accessibilityLabel"
            >
                <PIcon :source="secondaryAction.icon"/>
            </PUnstyledLink>
        </div>
        <div v-if="subNavigationItems.length > 0" :class="secondaryNavigationClassName">
            <PSecondary
                :expanded="showExpanded"
                :id="secondaryNavigationId"
            >
                <PItem
                    v-for="(subNavigationItem, key) in subNavigationItems"
                    :key="key"
                    v-bind="subNavigationItem"
                    :label="subNavigationItem.label"
                    :matches="subNavigationItem === longestMatch"
                    @click="onNavigationDismiss ? onNavigationDismiss : {}"
                >
                    <template v-slot:icon="slotProps">
                        <slot name="icon" :item="slotProps ? slotProps.item : {}"/>
                    </template>
                </PItem>
            </PSecondary>
        </div>
    </li>
</template>

<script setup>
    import { ref, computed, useSlots, nextTick, onMounted, onUnmounted } from 'vue';
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PUnstyledLink } from '../../../../components/PUnstyledLink';
    import { PIcon } from '../../../../components/PIcon';
    import { PBadge } from '../../../../components/PBadge';
    import { PSecondary } from '../../../../components/PNavigation/components/PItem/components/PSecondary';
    import PItem from '../../../../components/PNavigation/components/PItem/PItem.vue';
    import { MatchState } from '../../../variables';

    let props = defineProps({
        icon: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        accessibilityLabel: {
            type: String,
            default: null,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        exactMatch: {
            type: Boolean,
            default: false,
        },
        new: {
            type: Boolean,
            default: false,
        },
        badge: {
            type: String,
            default: null,
        },
        subNavigationItems: {
            type: Array,
            default: () => ([]),
        },
        secondaryAction: {
            type: Object,
            default: () => ({}),
        },
        /* Navigation Props */
        location: {
            type: String,
            default: null,
        },
        onNavigationDismiss: {
            type: Function,
        },
        // ItemURLDetails Props
        url: {
            type: String,
            default: null,
        },
        to: {
            type: [Object, String],
            default: null,
        },
        matches: {
            type: Boolean,
            default: false,
        },
        excludePaths: {
            type: Array,
            default: null,
        },
        external: {
            type: Boolean,
            default: false,
        },
    });

    let emit = defineEmits(['click']);
    let slots = useSlots();

    let expanded = ref(false);
    let keyFocused = ref(false);
    let tabIndex = ref(props.disabled ? -1 : 0);
    let isNavigationCollapsed = ref(false);
    let secondaryNavigationId = ref(`SecondaryNavigation${uuid()}`);

    let matchState = ref(matchStateForItem({
        url: props.url,
        to: props.to,
        matches: props.matches,
        exactMatch: props.exactMatch,
        matchPaths: null,
        excludePaths: props.excludePaths,
    }, props.location));

    let selectedOverride = ref(!props.selected
        ? matchState.value === MatchState.MatchForced || matchState.value === MatchState.MatchUrl || matchState.value === MatchState.MatchPaths
        : props.selected);

    let matchingSubNavigationItems = ref(props.subNavigationItems.filter((item) => {
        const subMatchState = matchStateForItem(item, props.location);
        return ( subMatchState === MatchState.MatchForced || subMatchState === MatchState.MatchUrl || subMatchState === MatchState.MatchPaths );
    }));

    let className = computed(() => {
        return classNames(
            'Polaris-Navigation__ListItem',
            Object.keys(props.secondaryAction).length > 0 && 'Polaris-Navigation__ListItem--hasAction',
        );
    });

    let childIsActive = computed(() => {
        return matchingSubNavigationItems.value.length > 0;
    });

    let showExpanded = computed(() => {
        return selectedOverride.value || expanded.value || childIsActive.value;
    });

    let itemClassName = computed(() => {
        return classNames(
            'Polaris-Navigation__Item',
            props.disabled && 'Polaris-Navigation__Item--disabled',
            props.selected && props.subNavigationItems.length === 0 && 'Polaris-Navigation__Item--selected',
            showExpanded.value && 'Polaris-Navigation--subNavigationActive',
            keyFocused.value && 'Polaris-Navigation--keyFocused',
        );
    });

    let secondaryNavigationClassName = computed(() => {
        return classNames(
            'Polaris-Navigation__SecondaryNavigation',
            showExpanded.value && 'Polaris-Navigation--isExpanded',
            !props.icon && 'Polaris-Navigation__SecondaryNavigation--noIcon',
        );
    });

    let iconSlotClassName = computed(() => {
        if (hasSlot(slots.icon)) {
            return 'Polaris-Navigation__Icon--slot';
        }
        return 'Polaris-Navigation__Icon';
    });

    let longestMatch = computed(() => {
        if (props.subNavigationItems.length > 0) {
            return matchingSubNavigationItems.value.sort(
                /* tslint:disable-next-line */
                function ({url: firstUrl}, {url: secondUrl}) {
                    if (firstUrl !== undefined && secondUrl !== undefined) {
                        return secondUrl.length - firstUrl.length;
                    }
                    return 0;
                },
            )[0];
        }
    });

    let hasNewChild = computed(() => {
        if (props.subNavigationItems.length > 0) {
            return props.subNavigationItems.filter((subNavigationItem) => subNavigationItem.new).length > 0;
        }
    });

    let normalizeAriaAttributesForExpanded = computed(() => {
        if (props.subNavigationItems.length > 0) {
            return showExpanded.value;
        }
    });

    let normalizeAriaAttributesForControls = computed(() => {
        if (props.subNavigationItems.length > 0) {
            return secondaryNavigationId.value;
        }
    });

    let itemValue = computed(() => {
        return {
            icon: props.icon,
            label: props.label,
            disabled: props.disabled,
            accessibilityLabel: props.accessibilityLabel,
            selected: props.selected,
            exactMatch: props.exactMatch,
            new: props.new,
            badge: props.badge,
            subNavigationItems: props.subNavigationItems,
            secondaryAction: props.secondaryAction
        };
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function useMediaQuery() {
        isNavigationCollapsed.value = window.innerWidth <= 768;
    }

    function getClickHandler(event) {
        const {currentTarget} = event;

        if ((currentTarget).getAttribute('href') === props.location) {
            event.preventDefault();
        }

        if (props.subNavigationItems && props.subNavigationItems.length > 0 && isNavigationCollapsed.value) {
            event.preventDefault();
            expanded.value = !expanded.value;
        } else if (props.onNavigationDismiss !== undefined) {
            nextTick().then(props.onNavigationDismiss());
            if (emit('click')) {
                emit('click');
            }
            return;
        }
        emit('click');
    }

    function handleKeyUp(event) {
        if (event.keyCode === 9) {
            if (!keyFocused.value) {
                keyFocused.value = true;
            }
        }
    }

    function handleBlur() {
        if (keyFocused.value) {
            keyFocused.value = false;
        }
    }

    function normalizePathname(pathname) {
        if (pathname === undefined) {
            return '/';
        }
        const barePathname = pathname.split('?')[0].split('#')[0];
        return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
    }

    function safeEqual(location, path) {
        return normalizePathname(location) === normalizePathname(path);
    }

    function safeStartsWith(location, path) {
        return normalizePathname(location).startsWith(normalizePathname(path));
    }

    function matchStateForItem({url, to, matches, exactMatch, matchPaths, excludePaths}, location) {
        if (url === '') {
            return MatchState.NoMatch;
        }

        if (to === '') {
            return MatchState.NoMatch;
        }

        if (matches) {
            return MatchState.MatchForced;
        }

        if (matches === false || (excludePaths && excludePaths.some((path) => safeStartsWith(location, path)))) {
            return MatchState.Excluded;
        }

        if (matchPaths && matchPaths.some((path) => safeStartsWith(location, path))) {
            return MatchState.MatchPaths;
        }

        const matchesUrl = exactMatch ? safeEqual(location, url) : safeStartsWith(location, url);
        return matchesUrl ? MatchState.MatchUrl : MatchState.NoMatch;
    }

    onMounted(() => {
        window.addEventListener('resize', useMediaQuery);
        useMediaQuery();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', useMediaQuery);
    });
</script>

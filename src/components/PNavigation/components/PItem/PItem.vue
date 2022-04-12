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
                <template>
                    <div v-if="icon" :class="$slots.icon() ? 'Polaris-Navigation__Icon--slot' : 'Polaris-Navigation__Icon'">
                        <span class="Polaris-Navigation__Icon--span">
                            <slot name="icon" :item="itemValue">
                                <PIcon :source="icon"/>
                            </slot>
                        </span>
                    </div>
                    <div v-if="!icon" class="Polaris-Navigation__Icon--slot">
                        <span class="Polaris-Navigation__Icon--span">
                            <slot name="icon" :item="itemValue"/>
                        </span>
                    </div>
                    <span class="Polaris-Navigation__Text">
                        {{ label }}
                        <span v-if="hasNewChild" class="Polaris-Navigation__Indicator">
                            <span class="Polaris-Indicator Polaris-Indicator--pulseIndicator"/>
                        </span>
                    </span>
                    <div v-if="this.new || this.badge || $slots.hasOwnProperty('badge')"
                         class="Polaris-Navigation__Badge">
                        <PBadge v-if="this.new" status="new" size="small">
                            New
                        </PBadge>
                        <PBadge v-else-if="badge" status="new" size="small">
                            {{ badge }}
                        </PBadge>
                        <slot v-else name="badge"/>
                    </div>
                </template>
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
                        <slot name="icon" :item="slotProps.item"/>
                    </template>
                </PItem>
            </PSecondary>
        </div>
    </li>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PUnstyledLink } from '../../../../components/PUnstyledLink';
    import { PIcon } from '../../../../components/PIcon';
    import { PBadge } from '../../../../components/PBadge';
    import { PSecondary } from '../../../../components/PNavigation/components/PItem/components/PSecondary';
    import { PItem } from '../../../../components/PNavigation/components/PItem';

    const MatchState = {
        MatchForced: 0,
        MatchUrl: 1,
        MatchPaths: 2,
        Excluded: 3,
        NoMatch: 4,
    };

    export default {
        name: 'PItem',
        components: {
            PUnstyledLink, PIcon, PBadge, PSecondary, PItem,
        },
        props: {
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
        },
        data() {
            return {
                expanded: false,
                keyFocused: false,
                tabIndex: this.disabled ? -1 : 0,
                isNavigationCollapsed: false,
                secondaryNavigationId: `SecondaryNavigation${new Date().getUTCMilliseconds()}`,
                matchState: this.matchStateForItem({
                    url: this.url,
                    to: this.to,
                    matches: this.matches,
                    exactMatch: this.exactMatch,
                    matchPaths: this.matchPaths,
                    excludePaths: this.excludePaths,
                }, this.location),
                selectedOverride: !this.selected
                    ? this.matchState === MatchState.MatchForced ||
                    this.matchState === MatchState.MatchUrl ||
                    this.matchState === MatchState.MatchPaths
                    : this.selected,
                matchingSubNavigationItems: this.subNavigationItems.filter((item) => {
                    const subMatchState = this.matchStateForItem(item, this.location);
                    return (
                        subMatchState === MatchState.MatchForced ||
                        subMatchState === MatchState.MatchUrl ||
                        subMatchState === MatchState.MatchPaths
                    );
                }),
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Navigation__ListItem',
                    Object.keys(this.secondaryAction).length > 0 && 'Polaris-Navigation__ListItem--hasAction',
                );
            },
            childIsActive() {
                return this.matchingSubNavigationItems.length > 0;
            },
            showExpanded() {
                return this.selectedOverride || this.expanded || this.childIsActive;
            },
            itemClassName() {
                return classNames(
                    'Polaris-Navigation__Item',
                    this.disabled && 'Polaris-Navigation__Item--disabled',
                    this.selected && this.subNavigationItems.length === 0 && 'Polaris-Navigation__Item--selected',
                    this.showExpanded && 'Polaris-Navigation--subNavigationActive',
                    this.keyFocused && 'Polaris-Navigation--keyFocused',
                );
            },
            secondaryNavigationClassName() {
                return classNames(
                    'Polaris-Navigation__SecondaryNavigation',
                    this.showExpanded && 'Polaris-Navigation--isExpanded',
                    !this.icon && 'Polaris-Navigation__SecondaryNavigation--noIcon',
                );
            },
            longestMatch() {
                if (this.subNavigationItems.length > 0) {
                    return this.matchingSubNavigationItems.sort(
                        /* tslint:disable-next-line */
                        function ({url: firstUrl}, {url: secondUrl}) {
                            if (firstUrl !== undefined && secondUrl !== undefined) {
                                return secondUrl.length - firstUrl.length;
                            }
                            return 0;
                        },
                    )[0];
                }
            },
            hasNewChild() {
                if (this.subNavigationItems.length > 0) {
                    return this.subNavigationItems.filter((subNavigationItem) => subNavigationItem.new).length > 0;
                }
            },
            normalizeAriaAttributesForExpanded() {
                if (this.subNavigationItems.length > 0) {
                    return this.showExpanded;
                }
            },
            normalizeAriaAttributesForControls() {
                if (this.subNavigationItems.length > 0) {
                    return this.secondaryNavigationId;
                }
            },
            itemValue() {
                return {
                    icon: this.icon,
                    label: this.label,
                    disabled: this.disabled,
                    accessibilityLabel: this.accessibilityLabel,
                    selected: this.selected,
                    exactMatch: this.exactMatch,
                    new: this.new,
                    badge: this.badge,
                    subNavigationItems: this.subNavigationItems,
                    secondaryAction: this.secondaryAction
                };
            },
        },
        methods: {
            useMediaQuery() {
                if (window.innerWidth <= 768) {
                    this.isNavigationCollapsed = true;
                } else {
                    this.isNavigationCollapsed = false;
                }
            },
            getClickHandler(event) {
                const {currentTarget} = event;

                if ((currentTarget).getAttribute('href') === this.location) {
                    event.preventDefault();
                }

                if (
                    this.subNavigationItems &&
                    this.subNavigationItems.length > 0 &&
                    this.isNavigationCollapsed
                ) {
                    event.preventDefault();
                    this.expanded = !this.expanded;
                } else if (this.onNavigationDismiss !== undefined) {
                    this.$nextTick(this.onNavigationDismiss());
                    if (this.$emit('click')) {
                        this.$emit('click');
                    }
                    return;
                }

                this.$emit('click');
            },
            handleKeyUp(event) {
                if (event.keyCode === 9) {
                    if (!this.keyFocused) {
                        this.keyFocused = true;
                    }
                }
            },
            handleBlur() {
                if (this.keyFocused) {
                    this.keyFocused = false;
                }
            },
            normalizePathname(pathname) {
                if (pathname === undefined) {
                    return '/';
                }
                const barePathname = pathname.split('?')[0].split('#')[0];
                return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
            },
            safeEqual(location, path) {
                return this.normalizePathname(location) === this.normalizePathname(path);
            },
            safeStartsWith(location, path) {
                return this.normalizePathname(location).startsWith(this.normalizePathname(path));
            },
            matchStateForItem({url, to, matches, exactMatch, matchPaths, excludePaths}, location) {
                if (url === '') {
                    return MatchState.NoMatch;
                }

                if (to === '') {
                    return MatchState.NoMatch;
                }

                if (matches) {
                    return MatchState.MatchForced;
                }

                if (matches === false || (excludePaths && excludePaths.some((path) => this.safeStartsWith(location, path)))) {
                    return MatchState.Excluded;
                }

                if (matchPaths && matchPaths.some((path) => this.safeStartsWith(location, path))) {
                    return MatchState.MatchPaths;
                }

                const matchesUrl = exactMatch ? this.safeEqual(location, url) : this.safeStartsWith(location, url);
                return matchesUrl ? MatchState.MatchUrl : MatchState.NoMatch;
            },
        },
        created() {
            window.addEventListener('resize', this.useMediaQuery);
            this.useMediaQuery();
        },
        destroyed() {
            window.removeEventListener('resize', this.useMediaQuery);
        },
    }
</script>

<style scoped>

</style>
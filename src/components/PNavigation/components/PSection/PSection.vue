<template>
    <ul :class="className">
        <li v-if="title" class="Polaris-Navigation__SectionHeading">
            <span class="Polaris-Navigation__Text">{{ title }}</span>
            <button
                v-if="Object.keys(action).length > 0"
                type="button"
                class="Polaris-Navigation__Action"
                :aria-label="action.accessibilityLabel"
                @click="action.onClick"
            >
                <PIcon :source="action.icon"/>
            </button>
        </li>
        <PItem
            v-for="(sectionItem, key) in sectionItems"
            :key="key"
            :label="sectionItem.label"
            :subNavigationItems="sectionItem.subNavigationItems"
            @click="handleClick(sectionItem.onClick, sectionItem.hasOwnProperty('subNavigationItems') ?
                            sectionItem.subNavigationItems.length > 0 : false)"
            v-bind="sectionItem"
            :location="location"
            :onNavigationDismiss="onNavigationDismiss"
        >
            <template v-slot:icon="slotProps">
<!--                <slot name="icon" :item="slotProps.item"/>-->
            </template>
        </PItem>
        <li
            v-if="Object.keys(rollup).length > 0 && additionalItems.length > 0"
            class="Polaris-Navigation__RollupSection"
        >
            <PCollapsible
                :id="`AdditionalItems#${this['_uid']}`"
                :open="expanded"
            >
                <ul
                    class="Polaris-Navigation__List"
                >
                    <PItem
                        v-for="(additionalItem, key) in additionalItems"
                        :key="key"
                        :label="additionalItem.label"
                        :subNavigationItems="additionalItem.subNavigationItems"
                        @click="handleClick(additionalItem.onClick,
            additionalItem.subNavigationItems ? additionalItem.subNavigationItems.length > 0 : false)"
                        v-bind="additionalItem"
                        :location="location"
                        :onNavigationDismiss="onNavigationDismiss"
                    >
                        <template v-slot:icon="slotProps">
                            <slot name="icon" :item="slotProps.item"/>
                        </template>
                    </PItem>
                </ul>
            </PCollapsible>
            <div
                v-if="Object.keys(rollup).length > 0 && items.length > rollup.after"
                class="Polaris-Navigation__ListItem"
                :key="`List Item`"
            >
                <button
                    type="button"
                    class="Polaris-Navigation__Item Polaris-Navigation__RollupToggle"
                    @click="toggleExpanded"
                    :aria-label="Object.keys(rollup).length > 0 && (expanded ? rollup.view : rollup.hide)"
                    :aria-controls="`AdditionalItems#${this['_uid']}`"
                    :testID="`ToggleViewAll`"
                >
                    <span class="Polaris-Navigation__Icon">
                        <PIcon source="HorizontalDotsMinor"/>
                    </span>
                </button>
            </div>
        </li>
    </ul>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PItem } from '../../../../components/PNavigation/components/PItem';
    import { PIcon } from '../../../../components/PIcon';
    import { PCollapsible } from '../../../../components/PCollapsible';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    const noWindowMatches = {
        media: '',
        /* tslint:disable-next-line */
        addListener: Function,
        /* tslint:disable-next-line */
        removeListener: Function,
        matches: false,
        /* tslint:disable-next-line */
        onchange: Function,
        /* tslint:disable-next-line */
        addEventListener: Function,
        /* tslint:disable-next-line */
        removeEventListener: Function,
        dispatchEvent: () => true,
    };

    const Breakpoints = {
        navigationBarCollapsed: '768px',
        stackedContent: '1043px',
    };

    const Rollup = {
        after: Number,
        view: String,
        hide: String,
        activePath: String,
    };

    export default {
        name: 'PSection',
        components: {
            PItem, PIcon, PCollapsible,
        },
        props: {
            items: {
                type: Array,
                default: null,
            },
            icon: {
                type: String,
                default: null,
            },
            title: {
                type: String,
                default: null,
            },
            fill: {
                type: Boolean,
                default: false,
            },
            rollup: {
                type: [Object, Rollup],
                default: () => ({}),
                ...ObjectValidator('rollup', Rollup),
            },
            action: {
                type: Object,
                default: () => ({}),
            },
            separator: {
                type: Boolean,
                default: false,
            },
            /*Navigation Props*/
            location: {
                type: String,
                default: null,
            },
            onNavigationDismiss: {
                type: Function,
            },
        },
        data() {
            return {
                animationFrame: null,
                itemsMarkup: this.items,
                expanded: false,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Navigation__Section',
                    this.separator && 'Polaris-Navigation__Section--withSeparator',
                    this.fill && 'Polaris-Navigation__Section--fill',
                );
            },
            additionalItems() {
                return Object.keys(this.rollup).length > 0 ? this.itemsMarkup.slice(this.rollup.after) : [];
            },
            sectionItems() {
                return Object.keys(this.rollup).length > 0
                    ? this.itemsMarkup.slice(0, this.rollup.after)
                    : this.itemsMarkup;
            },
        },
        methods: {
            navigationBarCollapsed() {
                return typeof window === 'undefined'
                    ? noWindowMatches
                    : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
            },
            toggleExpanded() {
                this.expanded = !this.expanded;
            },
            handleClick(onClick, hasSubNavItems) {
                if (onClick) {
                    onClick();
                }

                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }

                if (!hasSubNavItems || this.navigationBarCollapsed().matches) {
                    this.animationFrame = requestAnimationFrame(() => {
                            this.expanded = false;
                        },
                    );
                }
            },
        },
        watch: {
            animationFrame(value, oldValue) {
                return value && cancelAnimationFrame(value);
            },
        },
    }
</script>

<style scoped>

</style>
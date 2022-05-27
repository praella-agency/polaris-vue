<template>
    <component
        :is="condensed ? 'li' : 'tr'"
        :key="id"
        :class="rowClassName"
        @mouseenter="setHoverIn"
        @mouseleave="setHoverOut"
        @click="handleRowClick"
        :ref="tableRowCallbackRef"
    >
        <PIndexTableCheckbox
            v-if="selectable"
            :condensed="condensed"
            :itemId="id"
            :selected="selected"
            @interaction="handleInteraction"
        />
        <slot/>
    </component>
</template>

<script>
    import { classNames, variationName } from '../../../../utilities/css';
    import { PIndexTableCheckbox } from '../../../../components/PIndexTable/components/PIndexTableCheckbox';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    const SelectionType = {
        All: 'all',
        Page: 'page',
        Multi: 'multi',
        Single: 'single',
    };

    export default {
        name: 'PIndexTableRow',
        components: {
            PIndexTableCheckbox,
        },
        props: {
            id: {
                type: [String, Number],
                required: true,
            },
            selected: {
                type: Boolean,
                default: false,
            },
            position: {
                type: Number,
                default: 0,
            },
            subdued: {
                type: Boolean,
                default: false,
            },
            status: {
                type: String,
                default: null,
                ...StringValidator('status', ['success', 'subdued']),
            },
            selectable: {
                type: Boolean,
                default: true,
            },
            condensed: {
                type: Boolean,
                default: false,
            },
            selectMode: {
                type: Boolean,
                default: false,
            },
            clickable: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                isNavigating: false,
                hovered: false,
                primaryLinkElement: null,
                tableRowRef: null,
            };
        },
        computed: {
            rowClassName() {
                return classNames(
                    'Polaris-IndexTable__TableRow',
                    this.selectable && this.condensed && 'Polaris-IndexTable--condensedRow',
                    this.selected && 'Polaris-IndexTable__TableRow--selected',
                    this.subdued && 'Polaris-IndexTable__TableRow--subdued',
                    this.hovered && 'Polaris-IndexTable__TableRow--hovered',
                    this.status && 'Polaris-IndexTable--' + variationName('status', this.status),
                    (!this.selectable || this.primaryLinkElement) && 'TableRow-unclickable',
                );
            },
        },
        methods: {
            setHoverIn() {
                this.hovered = true;
            },
            setHoverOut() {
                this.hovered = false;
            },
            handleRowClick(event) {
                if (!this.clickable) {
                    this.$emit('navigation', this.id);
                    return;
                }

                if (this.selectable || this.primaryLinkElement) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (this.primaryLinkElement && !this.selectMode) {
                        this.isNavigating = true;
                        const ctrlKey = event.ctrlKey;
                        const metaKey = event.metaKey;

                        this.$emit('navigation', this.id);

                        if ((ctrlKey || metaKey) && this.primaryLinkElement instanceof HTMLAnchorElement) {
                            this.isNavigating = false;
                            window.open(this.primaryLinkElement.href, '_blank');
                            return;
                        }

                        this.primaryLinkElement.dispatchEvent(new MouseEvent(event.type));
                    } else {
                        this.isNavigating = false;
                        this.handleInteraction(event);
                    }
                }
            },
            handleInteraction(event) {
                event.stopPropagation();

                const selectionType = event.shiftKey ? SelectionType.Multi : SelectionType.Single;

                this.$emit('selectionChange', selectionType, !this.selected, this.id, this.position);
            },
            tableRowCallbackRef(node) {
                this.tableRowRef = node;
                const el = node?.querySelector('[data-primary-link]');

                if (el) {
                    this.primaryLinkElement = el;
                }
            },
        },
    }
</script>

<style scoped>

</style>

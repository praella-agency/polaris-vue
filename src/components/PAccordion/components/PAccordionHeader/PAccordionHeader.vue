<template>
    <h2 :id="`heading${id}`">
        <button
            :id="`accordion-button${this['_uid']}`"
            :class="$slots.default ? slotClassName : className"
            :style="style"
            @click="handleToggle(id)"
            type="button"
        >
            <slot>
                {{ title }}
            </slot>
            <slot name="actions">
                <PIcon
                    v-if="showIcon"
                    class="Polaris-Accordion-Icon"
                    :source="iconSource.source"
                    :color="iconSource.color"
                />
            </slot>
        </button>
    </h2>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PHeading } from '../../../../components/PHeading';
    import { PIcon } from '../../../../components/PIcon';

   export default {
        name: 'PAccordionHeader',
        components: {
            PHeading, PIcon,
        },
        props: {
            id: {
                type: [String, Number],
            },
            title: {
                type: [String, Number],
            },
            showIcon: {
                type: Boolean,
            },
            iconSource: {
                type: [Object, String],
            },
            open: {
                type: Boolean,
            },
            themeOptions: {
                type: Object,
            },
        },
        data() {
            return {
                themeOptionData: {},
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Accordion-Title',
                    this.open && 'Polaris-Accordion-Title--collapsed',
                );
            },
            slotClassName() {
                return classNames(
                    'Polaris-Accordion-Title--slot',
                    this.open && 'Polaris-Accordion-Title--collapsed--slot',
                );
            },
            style() {
                let styles = {};
                if (this.themeOptions.color) {
                    styles.color = this.themeOptions.color;
                }
                if (!this.open && this.themeOptions.background) {
                    styles.backgroundColor = this.themeOptions.background;
                }
                if (this.open && this.themeOptions.backgroundCollapsed) {
                    styles.backgroundColor = this.themeOptions.backgroundCollapsed;
                }
                return styles;
            },
        },
        methods: {
            handleToggle(id) {
                this.$emit('toggle', id);
            },
        },
    }
</script>

<style scoped>

</style>
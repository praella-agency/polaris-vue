<template>
    <h2 :id="`heading${id}`">
        <button
            :id="`accordion-button${uuid}`"
            :class="hasSlot($slots.default) ? slotClassName : className"
            :style="style"
            @click="handleToggle(id)"
            type="button"
        >
            <slot>
                {{ title }}
            </slot>
            <div :class="iconClassName">
                <slot name="actions">
                    <PIcon
                        v-if="!hideIcon"
                        :source="iconSource.source"
                        :color="iconSource.color"
                    />
                </slot>
            </div>
        </button>
    </h2>
</template>

<script>
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
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
            hideIcon: {
                type: Boolean,
                default: false,
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
            disableIconRotate: {
                type: Boolean,
            }
        },
        emits: ['toggle'],
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
            iconClassName() {
                return classNames(
                    'Polaris-Accordion-Icon',
                    !this.disableIconRotate && !this.open && 'Polaris-Accordion__IconFacingUp',
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
            hasSlot() {
                return hasSlot;
            },
            uuid() {
                return uuid();
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
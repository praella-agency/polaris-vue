<template>
    <h2 :id="`heading${id}`">
        <button
            :id="`accordion-button${this['_uid']}`"
            :class="$slots.default ? slotClassName : className"
            @click="handleToggle(id)"
            type="button"
        >
            <slot>
                <PHeading>{{ title }}</PHeading>
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
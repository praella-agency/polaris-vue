<template>
    <h2 :id="`heading${id}`">
        <button
            :id="`accordion-button${uuidVal}`"
            :class="isSlot($slots.default) ? slotClassName : className"
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
    import { defineComponent, computed } from 'vue';
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PHeading } from '../../../../components/PHeading';
    import { PIcon } from '../../../../components/PIcon';

    export default defineComponent({
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
        setup(props, context) {
            const className = computed(() => {
                return classNames(
                    'Polaris-Accordion-Title',
                    props.open && 'Polaris-Accordion-Title--collapsed',
                );
            });

            const slotClassName = computed(() => {
                return classNames(
                    'Polaris-Accordion-Title--slot',
                    props.open && 'Polaris-Accordion-Title--collapsed--slot',
                );
            });

            const iconClassName = computed(() => {
                return classNames(
                    'Polaris-Accordion-Icon',
                    !props.disableIconRotate && !props.open && 'Polaris-Accordion__IconFacingUp',
                );
            });

            const style = computed(() => {
                let styles = {};
                if (props.themeOptions.color) {
                  styles.color = props.themeOptions.color;
                }
                if (!props.open && props.themeOptions.background) {
                  styles.backgroundColor = props.themeOptions.background;
                }
                if (props.open && props.themeOptions.backgroundCollapsed) {
                  styles.backgroundColor = props.themeOptions.backgroundCollapsed;
                }
                return styles;
            });

            const isSlot = computed(() => {
                return hasSlot;
            });

            const uuidVal = computed(() => {
                return uuid();
            });

            function handleToggle(id) {
                this.$emit('toggle', id);
            }

            return { className, slotClassName, iconClassName, style, isSlot, uuidVal, handleToggle };
        },
    });
</script>

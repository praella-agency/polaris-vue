<template>
    <div :id="id" class="Polaris-Accordion">
        <div>
            <template
                v-for="(accordion, index) in accordions"
            >
                <div
                    class="Polaris-Accordion-Item"
                    :aria-expanded="visibility[index]"
                    aria-controls="basic-accordion"
                >
                    <h2 :id="`heading${index}`">
                        <button
                            :class="$slots.title ? slotClassName(index) : className(index)"
                            @click="handleToggle(index)"
                            type="button"
                        >
                            <slot name="title">
                                <PHeading>{{ accordion.title }}</PHeading>
                                <PIcon
                                    v-if="showIcon"
                                    class="Polaris-Accordion-Icon"
                                    :source="setIcon(index)"
                                />
                            </slot>
                        </button>
                    </h2>
                    <PCollapsible
                        id="basic-collapsible"
                        :expandOnPrint="true"
                        :open="visibility[index]"
                        :transition="animation"
                    >
                        <div :id="`accordion${index}`">
                            <div class="Polaris-Accordion-Body">
                                <slot name="body">
                                    {{ accordion.content }}
                                </slot>
                            </div>
                        </div>
                    </PCollapsible>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PCollapsible } from '../../components/PCollapsible';
    import { PIcon } from '../../components/PIcon';
    import { PHeading } from '../../components/PHeading';
    import { PCard } from '../../components/PCard';
    import { PCardHeader } from '../../components/PCard/components/PCardHeader';
    import { PCardSection } from '../../components/PCard/components/PCardSection';
    import { classNames } from '../../utilities/css';

    export default {
        name: 'PAccordion',
        components: {
            PStack, PStackItem, PCollapsible, PIcon, PHeading, PCard, PCardHeader, PCardSection,
        },
        props: {
            id: {
                type: String,
                default: 'Polaris-Accordion',
            },
            accordions: {
                type: Array,
                default: () => ([]),
            },
            animation: {
                type: Object,
                default: () => ({
                    duration: "350ms",
                    timingFunction: "ease-in-out",
                }),
            },
            icon: {
                type: [Object, String],
            },
            open: {
                type: [Array, Number],
            },
            multiple: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                visibility: [],
                showIcon: true,
            };
        },
        methods: {
            className(index) {
                return classNames(
                    'Polaris-Accordion-Title',
                    this.visibility[index] && 'Polaris-Accordion-Title--collapsed',
                );
            },
            slotClassName(index) {
                return classNames(
                    'Polaris-Accordion-Title--slot',
                    this.visibility[index] && 'Polaris-Accordion-Title--collapsed--slot',
                );
            },
            handleToggle(index) {
                if (!this.multiple) {
                    this.visibility.forEach((item, key) => {
                        if (key !== index) {
                            this.$set(this.visibility, key, false);
                        }
                    });
                }
                this.$set(this.visibility, index, !this.visibility[index]);
            },
            setIcon(index) {
                if (this.icon) {
                    if (typeof this.icon === 'object') {
                        return this.visibility[index] ? this.icon.open : this.icon.close;
                    } else if (typeof this.icon === 'string') {
                        return this.icon;
                    }
                } else if (this.accordions[index].icon) {
                    if (typeof this.accordions[index].icon === 'object') {
                        return this.visibility[index] ? this.accordions[index].icon.open : this.accordions[index].icon.close;
                    } else if (typeof this.accordions[index].icon === 'string') {
                        return this.accordions[index].icon;
                    }
                }

                if (this.icon === null || this.icon === '') {
                    this.showIcon = false;
                }
                return this.visibility[index] ? 'CaretUpMinor' : 'CaretDownMinor';
            },
        },
        created() {
            let indexes = [];
            if (this.open) {
                if (Array.isArray(this.open)) {
                    indexes = this.open;
                } else {
                    indexes = [this.open];
                }
            }
            this.accordions.forEach((item, index) => {
                if (indexes.includes(index)) {
                    this.visibility.push(true);
                } else {
                    this.visibility.push(false);
                }
            });
        },
    }
</script>

<style scoped>
    .Polaris-Accordion-Item {
        background-color: #FFFF;
        border: 1px solid rgba(0, 0, 0, 0.125);
    }

    .Polaris-Accordion-Item:first-of-type {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }

    .Polaris-Accordion-Item:last-of-type, .Polaris-Accordion-Title.collapsed {
        border-bottom-right-radius: calc(.25rem - 1px);
        border-bottom-left-radius: calc(.25rem - 1px);
    }

    .Polaris-Accordion-Title {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 1rem 1.25rem;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        background-color: #fff;
        border: 0;
        border-radius: 0;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;
    }

    .Polaris-Accordion-Title--collapsed {
        background-color: #f1f8f5;
    }

    .Polaris-Accordion-Title--slot {
        position: relative;
        width: 100%;
        font-size: 1rem;
        border: 0;
        border-radius: 0;
        background-color: yellow;
        overflow: hidden;
        transition: .15s ease-in-out, .15s ease-in-out, .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;
    }

    .Polaris-Accordion-Title--collapsed--slot {
        background-color: #f1f8f5;
    }

    .Polaris-Accordion-Title:first-of-type .Polaris-Accordion-Title {
        border-top-left-radius: calc(0.25rem - 1px);
        border-top-right-radius: calc(0.25rem - 1px);
    }

    [type="button"]:not(:disabled),
    [type="reset"]:not(:disabled),
    [type="submit"]:not(:disabled), button:not(:disabled) {
        cursor: pointer;
    }

    .Polaris-Accordion-Icon {
        margin: unset !important;
        float: right;
    }

    .Polaris-Accordion-Body {
        padding: 1rem 1.25rem;
    }

    .Polaris-Icon__Svg {
        height: 3rem !important;
        width: 3rem !important;
        max-width: unset !important;
        max-height: unset !important;
    }
</style>
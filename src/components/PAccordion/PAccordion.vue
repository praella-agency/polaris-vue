<template>
    <div :id="id" class="Polaris-Accordion">
        <slot>
            <PAccordionItem
                v-for="(accordion, index) in accordions"
                :key="index"
                v-bind="accordion"
                :id="`${id}-${index}`"
                :open="visibility"
                :showIcon="showIcon"
                :icon="setIcon(`${id}-${index}`)"
            />
        </slot>
    </div>
</template>

<script>
    import { PAccordionItem } from '../../components/PAccordion/components/PAccordionItem';

    export default {
        name: 'PAccordion',
        components: {
            PAccordionItem,
        },
        provide() {
            return {
                getVisibility: this.visibility,
                getAccordionId: this.id,
            };
        },
        props: {
            id: {
                type: [String, Number],
                required: true,
            },
            accordions: {
                type: Array,
                default: () => ([]),
            },
            animation: {
                type: Object,
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
                visibility: {},
                showIcon: true,
            };
        },
        methods: {
            handleToggle(index) {
                if (!this.multiple) {
                    Object.keys(this.visibility).forEach((key) => {
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
                        if (this.visibility[index]) {
                            if (this.icon.hasOwnProperty('open') && Object.keys(this.icon.open).length) {
                                if (typeof this.icon.open === 'object') {
                                    if (!this.icon.open.hasOwnProperty('source') && this.icon.open.hasOwnProperty('color')) {
                                        return {
                                            source: 'CaretUpMinor',
                                            color: this.icon.open.color,
                                        }
                                    }
                                    return this.icon.open;
                                } else if (typeof this.icon.open === 'string') {
                                    return {
                                        source: this.icon.open,
                                        color: '',
                                    }
                                }
                            }
                        } else {
                            if (this.icon.hasOwnProperty('close') && Object.keys(this.icon.close).length) {
                                if (typeof this.icon.close === 'object') {
                                    if (!this.icon.close.hasOwnProperty('source') && this.icon.close.hasOwnProperty('color')) {
                                        return {
                                            source: 'CaretDownMinor',
                                            color: this.icon.close.color,
                                        }
                                    }
                                    return this.icon.close;
                                } else if (typeof this.icon.close === 'string') {
                                    return {
                                        source: this.icon.close,
                                        color: '',
                                    }
                                }
                            }
                        }
                    } else if (typeof this.icon === 'string') {
                        return this.icon;
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
                    this.$set(this.visibility, `${this.id}-${index}`, true);
                } else {
                    this.$set(this.visibility, `${this.id}-${index}`, false);
                }
            });
        },
        mounted() {
            this.$root.$on(`accordion-${this.id}-toggle`, (index) => {
                this.handleToggle(index);
            });
        }
    }
</script>

<style scoped>

</style>
<template>
    <div :id="id" class="Polaris-Accordion">
        <!-- @slot Add Custom Accordion -->
        <slot>
            <PAccordionItem
                v-for="(accordion, index) in accordions"
                :key="index"
                v-bind="accordion"
                :id="index"
                :showIcon="showIcon"
                :themeOptions="themeOptions"
                :icon="icon"
                :disableIconRotate="disableIconRotate"
            />
        </slot>
    </div>
</template>

<script>
    import { PAccordionItem } from '../../components/PAccordion/components/PAccordionItem';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The component is useful for reducing vertical space with large amounts of
     *  information.
     * </h4>
     */
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
            /**
             * Unique Id for the accordion
             */
            id: {
                type: [String, Number],
                required: true,
            },
            /**
             * Lists of accordions
             */
            accordions: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Custom animation
             */
            animation: {
                type: Object,
            },
            /**
             * Custom icon
             */
            icon: {
                type: [Object, String],
            },
            /**
             * Set default open values.
             *
             * **Note**:- Value should be index of accordion.
             */
            open: {
                type: [Array, Number],
            },
            /**
             * Allow multiple accordion to open
             */
            allowMultiple: {
                type: Boolean,
                default: false,
            },
            /**
             * Theme Options
             */
            themeOptions: {
                type: Object,
                default: () => ({}),
            },
            /**
             * Disable Icon Rotation
             */
            disableIconRotate: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                visibility: {},
                showIcon: true,
                accordionItemIds: [],
            };
        },
        methods: {
            handleAccordionItemExpansion() {
                if (this.open || this.open === 0) {
                    if (Array.isArray(this.open)) {
                        this.open.forEach((index) => {
                            if (this.accordionItemIds[index] || this.accordionItemIds[index] === 0) {
                                this.$set(this.visibility, `${this.id}-${this.accordionItemIds[index]}`, true);
                            }
                        });
                    } else {
                        this.$set(this.visibility, `${this.id}-${this.open}`, true);
                    }
                }
            },
            handleToggle(index) {
                if (!this.allowMultiple) {
                    Object.keys(this.visibility).forEach((key) => {
                        if (key.toString() !== index.toString()) {
                            this.$set(this.visibility, key, false);
                        }
                    });
                }
                this.$set(this.visibility, index, !this.visibility[index]);
            },
            setIcon(index, key) {
                if (this.icon) {
                    if (typeof this.icon === 'object') {
                        this.disableIconRotation = true;
                        if (this.visibility[index]) {
                            return this.setOpenCloseIcon(this.icon, 'open', 'CaretUpMinor');
                        } else {
                            return this.setOpenCloseIcon(this.icon, 'close', 'CaretDownMinor');
                        }
                    } else if (typeof this.icon === 'string') {
                        return this.icon;
                    }
                } else if (this.accordions[key].hasOwnProperty('icon')) {
                    if (typeof this.accordions[key].icon === 'object') {
                        this.disableIconRotation = true;
                        if (this.visibility[index]) {
                            return this.setOpenCloseIcon(this.accordions[key].icon, 'open', 'CaretUpMinor');
                        } else {
                            return this.setOpenCloseIcon(this.accordions[key].icon, 'close', 'CaretDownMinor');
                        }
                    } else if (typeof this.accordions[key].icon === 'string') {
                        return this.accordions[key].icon;
                    }
                }

                if (this.icon === null || this.icon === '') {
                    this.showIcon = false;
                }
                return 'CaretUpMinor';
            },
            setOpenCloseIcon(object, type, source) {
                if (object.hasOwnProperty(type) && Object.keys(object[type]).length) {
                    if (typeof object[type] === 'object') {
                        if (!object[type].hasOwnProperty('source') && object[type].hasOwnProperty('color')) {
                            return {
                                source: source,
                                color: object[type].color,
                            }
                        }
                        return object[type];
                    } else if (typeof object[type] === 'string') {
                        return {
                            source: object[type],
                            color: '',
                        }
                    }
                }
            },
        },
        created() {
            this.accordions.forEach((item, index) => {
                this.accordionItemIds.push(index);
            })
            this.handleAccordionItemExpansion();

            this.$root.$on(`accordion-${this.id}-toggle`, (index) => {
                this.handleToggle(index);
            });
            this.accordionItemIds = [];
            this.$root.$on(`accordion-${this.id}-item`, (index) => {
                this.accordionItemIds.push(index);
                this.handleAccordionItemExpansion();
            });
        }
    }
</script>

<style scoped>

</style>
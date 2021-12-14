<template>
    <div
        class="Polaris-Accordion-Item"
        aria-controls="basic-accordion"
    >
        <PAccordionHeader
            :id="accordionItemId"
            :title="title"
            :open="this.getVisibility[accordionItemId]"
            :iconSource="iconSource"
            :hideIcon="hideIcon"
            :disableIconRotate="disableIconRotation"
            :themeOptions="headerThemeOptions"

            @toggle="handleToggle(accordionItemId)"
        >
            <!-- @slot Customize title -->
            <slot name="title"/>
            <template slot="actions">
                <!-- @slot Customizable actions -->
                <slot name="actions"/>
            </template>
        </PAccordionHeader>
        <PAccordionContent
            :id="accordionItemId"
            :content="content"
            :animation="animation"
            :open="this.getVisibility[accordionItemId]"

            :themeOptions="contentThemeOptions"
        >
            <!-- @slot Customize body part -->
            <slot name="content"/>
        </PAccordionContent>
    </div>
</template>

<script>
    import { PAccordionHeader } from '../../../../components/PAccordion/components/PAccordionHeader';
    import { PAccordionContent } from '../../../../components/PAccordion/components/PAccordionContent';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    const Icon = {
        icon: {
            type: [String, Object],
            properties: {
                open: {
                    type: [String, Object],
                    open: {
                        properties: {
                            source: String,
                            color: String,
                        },
                    }
                },
                close: {
                    type: [String, Object],
                    close: {
                        properties: {
                            source: String,
                            color: String,
                        },
                    }
                },
            },
        },
    }

    const ThemeOptions = {
        header: {
            type: Object,
            properties: {
                color: String,
                background: String,
                backgroundCollapsed: String,
            },
        },
        content: {
            type: Object,
            properties: {
                color: String,
                background: String,
            },
        },
    }

    export default {
        name: 'PAccordionItem',
        components: {
            PAccordionHeader, PAccordionContent,
        },
        inject: ['getVisibility', 'getAccordionId'],
        props: {
            /**
             * Unique Id for the accordion
             */
            id: {
                type: [String, Number],
            },
            /**
             * Title for the accordion
             */
            title: {
                type: [String, Number],
            },
            /**
             * Custom animation
             */
            animation: {
                type: Object,
            },
            /**
             * Body part of the accordion
             */
            content: {
                type: String,
            },
            /**
             * Custom icon
             */
            icon: {
                type: [Object, String],
                ...ObjectValidator('icon', Icon),
            },
            /**
             * Hide icon for accordion
             */
            hideIcon: {
                type: Boolean,
            },
            /**
             * ThemeOptions
             */
            themeOptions: {
                type: Object,
                ...ObjectValidator('themeOptions', ThemeOptions),
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
                ID: (this.id || this.id === 0) ? this.id : this['_uid'],
                themeOptionsData: {
                    header: {
                        color: '',
                        background: '',
                        backgroundCollapsed: ''
                    },
                    content: {
                        color: '',
                        background: '',
                    },
                },
                disableIconRotation: this.disableIconRotate,
            };
        },
        computed: {
            accordionItemId() {
                return `${this.getAccordionId}-${this.ID}`;
            },
            iconSource() {
                let source = '';
                let color = '';
                if (typeof this.setIcon === 'object') {
                    this.disableIconRotation = true;
                    source = this.setIcon.source;
                    color = this.setIcon.color;
                } else if (typeof this.setIcon === 'string') {
                    source = this.setIcon;
                    color = '';
                }

                return {
                    source: source,
                    color: color,
                }
            },
            headerThemeOptions() {
                let styleOptions = {
                    color: '',
                    background: '',
                    backgroundCollapsed: '',
                };
                if (this.themeOptions && Object.keys(this.themeOptions).length) {
                    if (this.themeOptions.header) {
                        styleOptions = {
                            color: '',
                            background: '',
                            backgroundCollapsed: '',
                        };
                        let header = this.themeOptions.header;
                        if (header.color) {
                            this.$set(styleOptions, 'color', header.color);
                        }
                        if (header.background) {
                            this.$set(styleOptions, 'background', header.background);
                        }
                        if (header.backgroundCollapsed) {
                            this.$set(styleOptions, 'backgroundCollapsed', header.backgroundCollapsed);
                        }
                    }
                }

                return styleOptions;
            },
            contentThemeOptions() {
                let styleOptions = {
                    color: '',
                    background: '',
                };
                if (this.themeOptions && Object.keys(this.themeOptions).length) {
                    if (this.themeOptions.content) {
                        styleOptions = {
                            color: '',
                            background: '',
                        };
                        let content = this.themeOptions.content;
                        if (content.color) {
                            this.$set(styleOptions, 'color', content.color);
                        }
                        if (content.background) {
                            this.$set(styleOptions, 'background', content.background);
                        }
                    }
                }

                return styleOptions;
            },
            setIcon() {
                if (this.icon) {
                    if (typeof this.icon === 'object') {
                        this.disableIconRotation = true;
                        if (this.getVisibility[this.accordionItemId]) {
                            return this.setOpenCloseIcon(this.icon, 'open', 'CaretUpMinor');
                        } else {
                            return this.setOpenCloseIcon(this.icon, 'close', 'CaretDownMinor');
                        }
                    } else if (typeof this.icon === 'string') {
                        return this.icon;
                    }
                }

                if (this.icon === null || this.icon === '') {
                    this.showIcon = false;
                }
                return 'CaretUpMinor';
            },
        },
        methods: {
            handleToggle(index) {
                this.$root.$emit(`accordion-${this.getAccordionId}-toggle`, index);
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
        mounted() {
            this.$root.$emit(`accordion-${this.getAccordionId}-item`, this.ID);
        }
    }
</script>

<style scoped>

</style>

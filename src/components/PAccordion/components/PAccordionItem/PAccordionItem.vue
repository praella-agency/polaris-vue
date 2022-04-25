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
            <template #actions>
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
    import utils from '../../../../utilities';
    import { PAccordionHeader } from '../../../../components/PAccordion/components/PAccordionHeader';
    import { PAccordionContent } from '../../../../components/PAccordion/components/PAccordionContent';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import mitt from 'mitt';

    const emitter = mitt();

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

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The component is useful for reducing vertical space with large amounts of
     *  information. This component is child component of
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/behavior-accordion--default" target="_blank">
     *      accordion</a>. Use this component for the customization of title and content.
     * </h4>
     */
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
             * Theme Options
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
        // emits: [`accordion-${this.getAccordionId}-toggle`, `accordion-${this.getAccordionId}-item`],
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
                            if (utils.isVue3) {
                                styleOptions.color = header.color;
                            } else {
                                this.$set(styleOptions, 'color', header.color);
                            }
                        }
                        if (header.background) {
                            if (utils.isVue3) {
                                styleOptions.background = header.background;
                            } else {
                                this.$set(styleOptions, 'background', header.background);
                            }
                        }
                        if (header.backgroundCollapsed) {
                            if (utils.isVue3) {
                                styleOptions.backgroundCollapsed = header.backgroundCollapsed;
                            } else {
                                this.$set(styleOptions, 'backgroundCollapsed', header.backgroundCollapsed);
                            }
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
                            if (utils.isVue3) {
                                styleOptions.color = content.color;
                            } else {
                                this.$set(styleOptions, 'color', content.color);
                            }
                        }
                        if (content.background) {
                            if (utils.isVue3) {
                                styleOptions.background = content.background;
                            } else {
                                this.$set(styleOptions, 'background', content.background);
                            }
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
                if (utils.isVue3) {
                    emitter.emit(`accordion-${this.getAccordionId}-toggle`, index);
                } else {
                    this.$root.$emit(`accordion-${this.getAccordionId}-toggle`, index);
                }
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
            if (utils.isVue3) {
                emitter.emit(`accordion-${this.getAccordionId}-item`, this.ID);
            } else {
                this.$root.$emit(`accordion-${this.getAccordionId}-item`, this.ID);
            }
        }
    }
</script>

<style scoped>

</style>

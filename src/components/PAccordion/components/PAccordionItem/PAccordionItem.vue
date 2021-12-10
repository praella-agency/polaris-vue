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
            :showIcon="showIcon"

            :themeOptions="headerThemeOptions"

            @toggle="handleToggle(accordionItemId)"
        >
            <slot name="title"/>
        </PAccordionHeader>
        <PAccordionContent
            :id="accordionItemId"
            :content="content"
            :animation="animation"
            :open="this.getVisibility[accordionItemId]"

            :themeOptions="contentThemeOptions"
        >
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
                    properties: {
                        source: String,
                        color: String,
                    },
                },
                close: {
                    type: [String, Object],
                    properties: {
                        source: String,
                        color: String,
                    },
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
            id: {
                type: [String, Number],
            },
            title: {
                type: [String, Number],
            },
            animation: {
                type: Object,
            },
            content: {
                type: String,
            },
            icon: {
                type: [Object, String],
                ...ObjectValidator('icon', Icon),
            },
            showIcon: {
                type: Boolean,
            },
            themeOptions: {
                type: Object,
                ...ObjectValidator('themeOptions', ThemeOptions),
            },
        },
        data() {
            return {
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
            };
        },
        computed: {
            accordionItemId() {
                return `${this.getAccordionId}-${this.id}`;
            },
            iconSource() {
                let source = '';
                let color = '';
                if (typeof this.icon === 'object') {
                    source = this.icon.source;
                    color = this.icon.color;
                } else if (typeof this.icon === 'string') {
                    source = this.icon;
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
        },
        methods: {
            handleToggle(index) {
                this.$root.$emit(`accordion-${this.getAccordionId}-toggle`, index);
            },
        },
        mounted() {
            let id = (this.id || this.id === 0) ? this.id : this['_uid'];
            this.$root.$emit(`accordion-${this.getAccordionId}-item`, id);
        }
    }
</script>

<style scoped>

</style>

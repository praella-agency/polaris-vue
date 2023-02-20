<template>
    <div
        class="Polaris-Accordion-Item"
        aria-controls="basic-accordion"
    >
        <PAccordionHeader
            :id="accordionItemId"
            :title="title"
            :open="getVisibility[accordionItemId]"
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
            :open="getVisibility[accordionItemId]"
            :themeOptions="contentThemeOptions"
        >
            <!-- @slot Customize body part -->
            <slot name="content"/>
        </PAccordionContent>
    </div>
</template>

<script>
    import { defineComponent, inject, ref, onMounted, computed } from 'vue';
    import { uuid } from '../../../../ComponentHelpers';
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
    export default defineComponent({
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
        setup(props, context) {
            const accordion = inject('accordion');
            const getVisibility = accordion.getVisibility;
            const getAccordionId = accordion.getAccordionId;
            const ID = ref((props.id || props.id === 0) ? props.id : uuid());
            const themeOptionsData = ref({
                header: {
                    color: '',
                    background: '',
                    backgroundCollapsed: ''
                },
                content: {
                    color: '',
                    background: '',
                }
            });
            let disableIconRotation = ref(props.disableIconRotate);

            onMounted(() => {
                if (inject('handleItemToggleDefault')) {
                    const handleItemToggleDefault = inject('handleItemToggleDefault');
                    handleItemToggleDefault(ID);
                }
            });

            const accordionItemId = computed(() => {
                return `${getAccordionId}-${ID}`;
            });

            const iconSource = computed(() => {
                let source = '';
                let color = '';
                if (typeof setIcon === 'object') {
                    disableIconRotation = true;
                    source = setIcon.source;
                    color = setIcon.color;
                } else if (typeof setIcon === 'string') {
                    source = setIcon;
                    color = '';
                }

                return {
                    source: source,
                    color: color,
                }
            });

            const headerThemeOptions = computed(() => {
                let styleOptions = {
                    color: '',
                    background: '',
                    backgroundCollapsed: '',
                };
                if (props.themeOptions && Object.keys(props.themeOptions).length) {
                    if (props.themeOptions.header) {
                        styleOptions = {
                            color: '',
                            background: '',
                            backgroundCollapsed: '',
                        };
                        let header = props.themeOptions.header;
                        if (header.color) {
                            styleOptions.color = header.color;
                        }
                        if (header.background) {
                            styleOptions.background = header.background;
                        }
                        if (header.backgroundCollapsed) {
                            styleOptions.backgroundCollapsed = header.backgroundCollapsed;
                        }
                    }
                }

                return styleOptions;
            });

            const contentThemeOptions = computed(() => {
                let styleOptions = {
                    color: '',
                    background: '',
                };
                if (props.themeOptions && Object.keys(props.themeOptions).length) {
                    if (props.themeOptions.content) {
                        styleOptions = {
                            color: '',
                            background: '',
                        };
                        let content = props.themeOptions.content;
                        if (content.color) {
                            styleOptions.color = content.color;
                        }
                        if (content.background) {
                            styleOptions.background = content.background;
                        }
                    }
                }

                return styleOptions;
            })

            const setIcon = computed(() => {
                if (props.icon) {
                    if (typeof props.icon === 'object') {
                        disableIconRotation = true;
                        if (getVisibility[accordionItemId]) {
                            return setOpenCloseIcon(props.icon, 'open', 'CaretUpMinor');
                        } else {
                            return setOpenCloseIcon(props.icon, 'close', 'CaretDownMinor');
                        }
                    } else if (typeof props.icon === 'string') {
                        return props.icon;
                    }
                }

                if (props.icon === null || props.icon === '') {
                    let showIcon = inject('showIcon');
                    showIcon.value = false;
                }
                return 'CaretUpMinor';
            });

            function handleToggle(index) {
                const handleToggle = inject('handleToggle');
                handleToggle(index);
            }

            function setOpenCloseIcon(object, type, source) {
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
            }

            return { getVisibility, getAccordionId, themeOptionsData, disableIconRotation, accordionItemId, iconSource, headerThemeOptions, contentThemeOptions, setIcon, handleToggle, setOpenCloseIcon };
        }
    })
</script>


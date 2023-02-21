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

<script setup>
    import { ref, provide } from 'vue';
    import mitt from 'mitt';
    import { PAccordionItem } from '../../components/PAccordion/components/PAccordionItem';

    const emitter = mitt();
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The component is useful for reducing vertical space with large amounts of
     *  information.
     * </h4>
     */
    let props = defineProps({
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
    })

    let visibility = ref({});
    let showIcon = ref(true);
    let accordionItemIds = ref([]);

    provide('showIcon', showIcon);
    provide('accordion', {
        getVisibility: visibility.value,
        getAccordionId: props.id,
    });

    function handleAccordionItemExpansion() {
        if (props.open || props.open === 0) {
            if (Array.isArray(props.open)) {
                props.open.forEach((index) => {
                    if (accordionItemIds.value[index] || accordionItemIds.value[index] === 0) {
                        visibility.value[`${props.id}-${accordionItemIds.value[index]}`] = true;
                    }
                });
            } else {
                visibility.value[`${props.id}-${accordionItemIds.value[props.open]}`] = true;
            }
        }
    }

    const handleToggle = (index) => {
        if (!props.allowMultiple) {
            Object.keys(visibility.value).forEach((key) => {
                if (key.toString() !== index.toString()) {
                    visibility.value[key] = false;
                }
            });
        }
        visibility.value[index] = !visibility.value[index];
    }
    provide('handleToggle', handleToggle);

    function handleItemToggleDefault(id) {
        accordionItemIds.value.push(id);
        handleAccordionItemExpansion();
    }
    provide('handleItemToggleDefault', handleItemToggleDefault)

    function setIcon(index, key) {
        if (props.icon) {
            if (typeof props.icon === 'object') {
                props.disableIconRotate = true;
                if (visibility.value[index]) {
                    return setOpenCloseIcon(props.icon, 'open', 'CaretUpMinor');
                } else {
                    return setOpenCloseIcon(props.icon, 'close', 'CaretDownMinor');
                }
            } else if (typeof props.icon === 'string') {
                return props.icon;
            }
        } else if (props.accordions[key].hasOwnProperty('icon')) {
            if (typeof props.accordions[key].icon === 'object') {
                props.disableIconRotate = true;
                if (visibility.value[index]) {
                    return setOpenCloseIcon(props.accordions[key].icon, 'open', 'CaretUpMinor');
                } else {
                    return setOpenCloseIcon(props.accordions[key].icon, 'close', 'CaretDownMinor');
                }
            } else if (typeof props.accordions[key].icon === 'string') {
                return props.accordions[key].icon;
            }
        }

        if (props.icon === null || props.icon === '') {
            showIcon = false;
        }
        return 'CaretUpMinor';
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
</script>

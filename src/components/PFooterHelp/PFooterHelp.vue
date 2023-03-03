<template>
    <div :class="className">
        <div class="Polaris-FooterHelp__Content">
            <!-- @slot Icon content -->
            <slot name="icon">
                <div class="Polaris-FooterHelp__Icon">
                    <PIcon color="highlight" source="CircleInformationMajor"/>
                </div>
            </slot>
            <div class="Polaris-FooterHelp__Text">
                <!-- @slot Display the content inside the layout -->
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Footer help is used to refer merchants to more information related to the product or feature they’re
     *  using.</h4>
     */

    let props = defineProps({
        /**
         * Id for the element
         */
        id: {
            type: [String, Number],
            default: null,
        },
        /**
         * Url for the footer
         */
        url: {
            type: String,
            default: null,
        },
        /**
         * Set to for router link
         */
        to: {
            type: [String, Object],
        },
        /**
         * Makes the link open in a new tab.
         */
        external: {
            type: Boolean,
            default: false,
        },
        /**
         * Makes the link color the same as the current text color and adds an underline.
         */
        monochrome: {
            type: Boolean,
            default: false,
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-FooterHelp',
        );
    });
</script>

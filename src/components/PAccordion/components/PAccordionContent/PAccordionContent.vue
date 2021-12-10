<template>
    <PCollapsible
        id="basic-collapsible"
        :expandOnPrint="true"
        :open="open"
        :transition="animation"
    >
        <div :id="`content${id}`">
            <div class="Polaris-Accordion-Body" :style="style">
                <slot>
                    {{ content }}
                </slot>
            </div>
        </div>
    </PCollapsible>
</template>

<script>
    import { PCollapsible } from '../../../../components/PCollapsible';

    export default {
        name: 'PAccordionContent',
        components: {
            PCollapsible,
        },
        props: {
            id: {
                type: [String, Number],
            },
            animation: {
                type: Object,
                default: () => ({
                    duration: "350ms",
                    timingFunction: "ease-in-out",
                }),
            },
            open: {
                type: Boolean,
            },
            content: {
                type: [String, Number],
            },
            themeOptions: {
                type: Object,
            },
        },
        computed: {
            style() {
                let styles = {};
                if (this.themeOptions.color) {
                    styles.color = this.themeOptions.color;
                }
                if (this.themeOptions.background) {
                    styles.backgroundColor = this.themeOptions.background;
                }

                return styles;
            },
        }
    }
</script>

<style scoped>

</style>

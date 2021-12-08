<template>
    <PCollapsible
        id="basic-collapsible"
        :expandOnPrint="true"
        :open="open"
        :transition="animation"
    >
        <div :id="`accordion${id}`">
            <div class="Polaris-Accordion-Body">
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
                type: String,
            },
        },
    }
</script>

<style scoped>

</style>

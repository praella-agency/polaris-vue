<template>
    <div
        class="Polaris-Accordion-Item"
        aria-controls="basic-accordion"
    >
        <PAccordionHeader
            :id="id"
            :title="title"
            :open="this.getVisibility[id]"
            :iconSource="iconSource"
            :showIcon="showIcon"
            @toggle="handleToggle(id)"
        >
            <slot name="title"/>
        </PAccordionHeader>
        <PAccordionContent
            :id="id"
            :content="content"
            :animation="animation"
            :open="this.getVisibility[id]"
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
        },
        computed: {
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
        },
        methods: {
            handleToggle(index) {
                this.$root.$emit(`accordion-${this.getAccordionId}-toggle`, index);
            },
        },
    }
</script>

<style scoped>

</style>

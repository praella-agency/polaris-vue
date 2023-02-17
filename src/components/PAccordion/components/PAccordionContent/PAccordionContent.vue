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
    import { defineComponent, computed } from 'vue';
    import { PCollapsible } from '../../../../components/PCollapsible';

    export default defineComponent({
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
        setup(props) {
            const style = computed(() => {
              let styles = {};
              if (props.themeOptions.color) {
                styles.color = props.themeOptions.color;
              }
              if (props.themeOptions.background) {
                styles.backgroundColor = props.themeOptions.background;
              }

              return styles;
            })

            return { style };
        }
    });
</script>

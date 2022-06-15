<template>
    <div class="Polaris-Layout__AnnotatedSection">
        <div class="Polaris-Layout__AnnotationWrapper">
            <div class="Polaris-Layout__Annotation">
                <PTextContainer>
                    <!-- @slot Title for the section  -->
                    <slot name="title">
                        <PHeading v-if="title">{{ title }}</PHeading>
                    </slot>
                    <div v-if="description || hasSlot($slots.description)"
                         class="Polaris-Layout__AnnotationDescription">
                        <!-- @slot Short Description content for the layout  -->
                        <slot name="description">
                            <p>{{ description }}</p>
                        </slot>
                    </div>
                </PTextContainer>
            </div>

            <div class="Polaris-Layout__AnnotationContent">
                <!-- @slot The content to display inside the annotated section layout -->
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
    import { hasSlot } from '../../../../ComponentHelpers';
    import { PHeading } from '../../../../components/PHeading';
    import { PTextContainer } from '../../../../components/PTextContainer';

    export default {
        name: 'PLayoutAnnotatedSection',
        components: {
            PHeading, PTextContainer,
        },
        props: {
            /**
             * Title of layout
             */
            title: {
                type: String,
                default: null,
            },
            /**
             * Description of layout
             */
            description: {
                type: String,
                default: null,
            },
        },
        computed: {
            hasSlot() {
                return hasSlot;
            },
        },
    }
</script>

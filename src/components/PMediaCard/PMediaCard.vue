<template>
    <PCard>
        <div :class="className">
            <div class="Polaris-MediaCard__MediaContainer Polaris-MediaCard--sizeSmall">
                <PImage v-if="imageSrc" width="100%" height="100%"
                        style="object-fit: cover; object-position: center center;"
                        :src="imageSrc"/>
                <vue-plyr>
                    <video
                        controls
                        crossorigin
                        playsinline
                        :data-poster="videoThumbSrc"
                    >
                        <source
                            v-for="(video, key) in videoSrc" :key="key"
                            controls
                            crossorigin
                            playsinline
                            :size="video.size"
                            :src="video.src"
                            :type="video.type"
                        />
                    </video>
                </vue-plyr>
            </div>
            <div class="Polaris-MediaCard__InfoContainer">
                <div class="Polaris-Card__Section">
                    <!--          <div class="Polaris-MediaCard__Popover">
                                <div>
                                 <PButton plain icon="HorizontalDotsMinor"/>
                                </div>
                              </div>-->
                    <PStack vertical>
                        <PStackItem>
                            <div class="Polaris-MediaCard__Heading">
                                <PHeading element="h2">{{ title }}</PHeading>
                            </div>
                        </PStackItem>
                        <PStackItem>
                            <!-- @slot The visual media to display in the card -->
                            <slot/>
                        </PStackItem>
                        <PStackItem v-if="hasAction">
                            <PButtonGroup>
                                <div class="Polaris-MediaCard__PrimaryAction">
                                    <PButton v-if="Object.keys(primaryAction).length" v-bind="primaryAction" @click="primaryAction.onAction ? primaryAction.onAction : () => {}">
                                        {{ primaryAction.content }}
                                    </PButton>
                                </div>
                                <div class="Polaris-MediaCard__SecondaryAction" v-if="Object.keys(secondaryAction).length">
                                    <PButton v-bind="secondaryAction" plain @click="secondaryAction.onAction ? secondaryAction.onAction : () => {}">
                                        {{ secondaryAction.content }}
                                    </PButton>
                                </div>
                            </PButtonGroup>
                        </PStackItem>
                    </PStack>
                </div>
            </div>
        </div>
    </PCard>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { DestructableAction, DisableableAction, IconableAction, LoadableAction, Video } from '../../types';
    import VuePlyr from '@hulkapps/vue-plyr';
    import { PCard } from '../../components/PCard';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PHeading } from '../../components/PHeading';
    import { PImage } from '../../components/PImage';
    import { PButtonGroup } from '../../components/PButtonGroup';
    import { PButton } from '../../components/PButton';
    import StringValidator from '../../utilities/validators/StringValidator';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';

    const Size = ['small', 'medium'];

    const PrimaryAction = {
        ...DestructableAction,
        ...DisableableAction,
        ...LoadableAction,
        ...IconableAction,
        primary: Boolean,
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Media cards provide a consistent layout to present visual information to merchants. Visual media is
     *  used to provide additional context to the written information it's paired with.</h4>
     */
    export default {
        name: 'PMediaCard',
        components: {
            PCard, VuePlyr, PStack, PStackItem, PHeading, PImage, PButtonGroup, PButton,
        },
        props: {
            /**
             * Heading content.
             */
            title: {
                type: String,
                default: null,
            },
            /**
             * Body content
             */
            description: {
                type: String,
                default: null,
            },
            /**
             * Whether or not card content should be laid out vertically.
             */
            portrait: {
                type: Boolean,
                default: false,
            },
            /**
             * Size of the visual media in the card.
             * @values small | medium
             */
            size: {
                type: String,
                default: 'small',
                ...StringValidator('size', Size),
            },
            /**
             * Main call action, rendered as basic button.
             */
            primaryAction: {
                type: Object,
                default: () => ({}),
            },
            /**
             * Secondary call action, rendered as plain button.
             */
            secondaryAction: {
                type: Object,
                default: () => ({}),
            },
            /**
             * Source of image.
             */
            imageSrc: {
                type: String,
                default: null,
            },
            /**
             * Source of thumbnail video.
             */
            videoThumbSrc: {
                type: String,
                default: null,
            },
            /**
             * Source of video.
             */
            videoSrc: {
                type: Array,
                default: () => ([]),
                ...ArrayValidator('videoSrc', Video),
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-MediaCard',
                    this.portrait && `Polaris-MediaCard--portrait`,
                );
            },
            hasAction() {
                return this.primaryAction || this.secondaryAction;
            },
        },
    }
</script>

<style scoped lang="scss">

</style>

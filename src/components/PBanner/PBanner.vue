<template>
    <div :class="className">
        <div v-if="hasDismissible" class="Polaris-Banner__Dismiss">
            <!--
              Triggered to dismiss the banner
              @event dismiss
            -->
            <PButton
                monochrome
                plain
                icon="CancelSmallMinor"
                @click="$emit('dismiss', $event)"
            >
            </PButton>
        </div>
        <div class="Polaris-Banner__Ribbon">
            <PIcon
                :source="colorAndIcon.icon"
                :color="colorAndIcon.color"/>
        </div>
        <div class="Polaris-Banner__ContentWrapper">
            <div v-if="title" class="Polaris-Banner__Heading">
                <PHeading element="p">{{ title }}</PHeading>
            </div>
            <div class="Polaris-Banner__Content">
                <!-- @slot The content to display inside the badge -->
                <slot/>
                <div v-if="Object.keys(action).length > 0" class="Polaris-Banner__Actions">
                    <PButtonGroup>
                        <div class="Polaris-Banner__PrimaryAction">
                            <PButtonsFrom :actions="action" :overrides="{ outline: true }"/>
                        </div>
                    </PButtonGroup>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { BannerStatus } from '../variables';
    import { classNames, variationName } from '../../utilities/css';

    import { PIcon } from '../../components/PIcon';
    import { PButton } from '../../components/PButton';
    import { PHeading } from '../../components/PHeading';
    import { PButtonGroup } from '../../components/PButtonGroup';
    import { PButtonsFrom } from '../../components/PButton/components/PButtonsFrom';

    import StringValidator from '../../utilities/validators/StringValidator';

    let props = defineProps({
        /**
         * Title content for the banner.
         */
        title: {
            type: String,
            default: null
        },

        /**
         * Set the status of the banner
         */
        status: {
            type: String,
            default: null,
            ...StringValidator('status', BannerStatus)
        },

        /**
         * Action of the banner
         */
        action: {
            type: Object,
            default: () => ({}),
        },

        /**
         * For vue3:- Toggle this attribute to visible/hide cancel button
         */
        isDismissible: {
            type: Boolean,
            default: true,
        }
    });
    let emit = defineEmits(['dismiss']);

    let hasDismissible = computed(() => {
        return props.isDismissible;
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Banner',
            'Polaris-Banner--withinPage',
            hasDismissible.value && 'Polaris-Banner--hasDismiss',
            props.status && `Polaris-Banner--${variationName('status', props.status)}`,
        );
    });

    let colorAndIcon = computed(() => {
        let color;
        let icon;

        switch (props.status) {
            case 'success':
                color = 'success';
                icon = 'CircleTickMajor';
                break;
            case 'info':
                color = 'highlight';
                icon = 'CircleInformationMajor';
                break;
            case 'warning':
                color = 'warning';
                icon = 'CircleAlertMajor';
                break;
            case 'critical':
                color = 'critical';
                icon = 'DiamondAlertMajor';
                break;
            default:
                color = 'base';
                icon = 'CircleInformationMajor';
        }

        return {color, icon};
    });
</script>

<template>
    <div :class="className">
        <div class="Polaris-Frame-Loading" role="progressbar" aria-label="Page loading bar">
            <div class="Polaris-Frame-Loading__Level" :style="style"></div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
    import {classNames} from "../../utilities/css";

    let props = defineProps(['RADON_LOADING_BAR', 'eventBus']);
    let loadingStyles = ref({...props.RADON_LOADING_BAR});

    let className = computed(() => {
        const progress = loadingStyles.value;
        const options = progress.options;
        return classNames(
            'Polaris-Frame__LoadingBar',
            !options.show && 'Polaris-Frame__Hidden',
        );
    });

    let style = computed(() => {
        const progress = loadingStyles.value;
        const options = progress.options;
        const isShow = !!options.show;
        const location = options.location;
        const style = {
            'background-color': options.canSuccess ? options.color : options.failedColor,
            'opacity': options.show ? 1 : 0,
            'position': options.position,
        };
        if (location === 'top' || location === 'bottom') {
            location === 'top' ? style.top = '0px' : style.bottom = '0px';
            if (!options.inverse) {
                style.left = '0px';
            } else {
                style.right = '0px';
            }
            style.width = progress.percent + '%';
            style.height = '3px';
            style.transition = isShow ? 'width ' + options.transition.speed + ' linear ' : '';
        } else if (location === 'left' || location === 'right') {
            location === 'left' ? style.left = '0px' : style.right = '0px';
            if (!options.inverse) {
                style.bottom = '0px';
            } else {
                style.top = '0px';
            }
            style.height = progress.percent + '%';
            style.width = options.thickness;
            style.transition = (isShow ? 'height ' + options.transition.speed + ', ' : '') + 'opacity ' +
                options.transition.opacity;
        }
        return style;
    });

    onBeforeUnmount(() => {
        props.eventBus.off('PLoading-update-data', handleStyle);
    });

    onMounted(() => {
        props.eventBus.on('PLoading-update-data', handleStyle);
    });

    function handleStyle(data) {
        loadingStyles.value = {...data};
    }
</script>

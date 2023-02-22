<template>
    <div class="vc-alpha">
        <div class="vc-alpha-checkboard-wrap">
            <checkboard></checkboard>
        </div>
        <div class="vc-alpha-gradient" :style="{background: gradientColor}"></div>
        <div class="vc-alpha-container" ref="container"
             @mousedown="handleMouseDown"
             @touchmove="handleChange"
             @touchstart="handleChange">
            <div class="vc-alpha-pointer" :style="{left: colors.a * 100 + '%'}">
                <div class="vc-alpha-picker"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import Checkboard from './Checkboard.vue';

    let props = defineProps({
        value: Object,
        onChange: Function
    });

    const emit = defineEmits(['change']);

    const alphaContainer = ref(null);

    const colors = computed(() => {
        return props.value;
    });

    const gradientColor = computed(() => {
        const rgba = colors.rgba;
        const rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
        return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
    });

    function handleChange(e, skip) {
        !skip && e.preventDefault()
        const container = alphaContainer.value;
        if (!container) {
            // for some edge cases, container may not exist. see #220
            return
        }
        const containerWidth = container.clientWidth

        const xOffset = container.getBoundingClientRect().left + window.pageXOffset
        const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        const left = pageX - xOffset

        let a
        if (left < 0) {
            a = 0
        } else if (left > containerWidth) {
            a = 1
        } else {
            a = Math.round(left * 100 / containerWidth) / 100
        }

        if (colors.a !== a) {
            emit('change', {
                h: colors.hsl.h,
                s: colors.hsl.s,
                l: colors.hsl.l,
                a: a,
                source: 'rgba'
            })
        }
    }

    function handleMouseDown (e) {
        handleChange(e, true);
        window.addEventListener('mousemove', handleChange);
        window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseUp () {
        unbindEventListeners();
    }

    function unbindEventListeners () {
        window.removeEventListener('mousemove', handleChange);
        window.removeEventListener('mouseup', handleMouseUp);
    }
</script>

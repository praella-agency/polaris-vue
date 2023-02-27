<template>
    <div :class="['vc-hue', directionClass]">
        <div class="vc-hue-container"
             role="slider"
             :aria-valuenow="colors.hsl.h"
             aria-valuemin="0"
             aria-valuemax="360"
             ref="hueContainer"
             @mousedown="handleMouseDown"
             @touchmove="handleChange"
             @touchstart="handleChange">
            <div class="vc-hue-pointer" :style="{top: pointerTop, left: pointerLeft}" role="presentation">
                <div class="vc-hue-picker"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';

    let props = defineProps({
        value: Object,
        direction: {
            type: String,
            default: 'horizontal' /* [horizontal | vertical] */
        }
    });

    const emit = defineEmits(['change']);

    let oldHue = ref(0);
    let pullDirection = ref('');
    let hueContainer = ref(null);

    let colors = computed(() => {
        const h = props.value.hsl.h;
        // vue/no-side-effects-in-computed-properties
        /* eslint-disable */
        if (h !== 0 && h - oldHue > 0) pullDirection = 'right';
        if (h !== 0 && h - oldHue < 0) pullDirection = 'left';
        oldHue = h;
        /* eslint-enable */

        return props.value;
    });

    let directionClass = computed(() => {
        return {
            'vc-hue--horizontal': props.direction === 'horizontal',
            'vc-hue--vertical': props.direction === 'vertical'
        }
    });

    let pointerTop = computed(() => {
        if (props.direction === 'vertical') {
            if (colors.value.hsl.h === 0 && pullDirection === 'right') return 0
            return -((colors.value.hsl.h * 100) / 360) + 100 + '%'
        } else {
            return 0
        }
    });

    let pointerLeft = computed(() => {
        if (props.direction === 'vertical') {
            return 0
        } else {
            if (colors.value.hsl.h === 0 && pullDirection === 'right') return '100%'
            return (colors.value.hsl.h * 100) / 360 + '%'
        }
    });

    function handleChange (e, skip) {
        !skip && e.preventDefault()

        let container = hueContainer;
        if (!container) {
            // for some edge cases, container may not exist. see #220
            return
        }
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight

        const xOffset = container.getBoundingClientRect().left + window.pageXOffset
        const yOffset = container.getBoundingClientRect().top + window.pageYOffset
        const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
        const left = pageX - xOffset
        const top = pageY - yOffset

        let h
        let percent

        if (props.direction === 'vertical') {
            if (top < 0) {
                h = 360
            } else if (top > containerHeight) {
                h = 0
            } else {
                percent = -(top * 100 / containerHeight) + 100
                h = (360 * percent / 100)
            }

            if (colors.value.hsl.h !== h) {
                emit('change', {
                    h: h,
                    s: colors.value.hsl.s,
                    l: colors.value.hsl.l,
                    a: colors.value.hsl.a,
                    source: 'hsl'
                })
            }
        } else {
            if (left < 0) {
                h = 0
            } else if (left > containerWidth) {
                h = 360
            } else {
                percent = left * 100 / containerWidth
                h = (360 * percent / 100)
            }

            if (colors.value.hsl.h !== h) {
                emit('change', {
                    h: h,
                    s: colors.value.hsl.s,
                    l: colors.value.hsl.l,
                    a: colors.value.hsl.a,
                    source: 'hsl'
                })
            }
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

    onMounted(() => {
        hueContainer = hueContainer.value;
    })
</script>

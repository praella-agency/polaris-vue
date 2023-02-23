<template>
    <div class="vc-saturation"
         :style="{background: bgColor}"
         ref="container"
         @mousedown="handleMouseDown"
         @touchmove="handleChange"
         @touchstart="handleChange">
        <div class="vc-saturation--white"></div>
        <div class="vc-saturation--black"></div>
        <div class="vc-saturation-pointer" :style="{top: pointerTop, left: pointerLeft}">
            <div class="vc-saturation-circle"></div>
        </div>
    </div>
</template>

<script setup>
    import throttle from 'lodash.throttle';
    import { computed, ref } from 'vue';

    let props = defineProps({
      value: Object,
    });
    const emit = defineEmits(['change']);

    const container = ref(null);
    const colors = computed(() => {
        return props.value;
    });
    const bgColor = computed(() => {
        return `hsl(${colors.value ? colors.value.hsv.h : 0}, 100%, 50%)`
    });
    const pointerTop = computed(() => {
        return (-((colors.value ? colors.value.hsv.v : 0) * 100) + 1) + 100 + '%'
    });
    const pointerLeft = computed(() => {
        return (colors.value ? colors.value.hsv.s : 0) * 100 + '%'
    });
    function clamp(value, min, max) {
        return min < max
            ? (value < min ? min : value > max ? max : value)
            : (value < max ? max : value > min ? min : value)
    }
    throttle: throttle(function(fn, data) {
            if (fn) {
                fn(data)
            }
        }, 20,
        {
            'leading': true,
            'trailing': false
        })
    function handleChange(e, skip) {
      console.log('Satu handle change')
        !skip && e.preventDefault()
        let container = this.$refs.container
        if (!container) {
            // for some edge cases, container may not exist. see #220
            return
        }
        let containerWidth = container.clientWidth
        let containerHeight = container.clientHeight
        let xOffset = container.getBoundingClientRect().left + window.pageXOffset
        let yOffset = container.getBoundingClientRect().top + window.pageYOffset
        let pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        let pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
        let left = clamp(pageX - xOffset, 0, containerWidth)
        let top = clamp(pageY - yOffset, 0, containerHeight)
        let saturation = left / containerWidth
        let bright = clamp(-(top / containerHeight) + 1, 0, 1)
        throttle(onChange({
            h: colors.value ? colors.value.hsv.h : 0,
            s: saturation,
            v: bright,
            a: colors.value ? colors.value.hsv.a : 0,
            source: 'hsva'
        }))
    }
    function onChange(param) {
        this.$emit('change', param)
    }
    function handleMouseDown() {
        // this.handleChange(e, true)
        window.addEventListener('mousemove', handleChange)
        window.addEventListener('mouseup', handleChange)
        window.addEventListener('mouseup', handleMouseUp)
    }
    function handleMouseUp() {
        this.unbindEventListeners()
    }
    function unbindEventListeners() {
        window.removeEventListener('mousemove', handleChange)
        window.removeEventListener('mouseup', handleChange)
        window.removeEventListener('mouseup', handleMouseUp)
    }
</script>

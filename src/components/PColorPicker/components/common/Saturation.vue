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

<script>
    import throttle from 'lodash.throttle';

    export default {
        name: 'Saturation',
        props: {
            value: Object,
        },
        emits: ['change'],
        computed: {
            colors() {
                return this.value;
            },
            bgColor() {
                return `hsl(${this.colors ? this.colors.hsv.h : 0}, 100%, 50%)`
            },
            pointerTop() {
                return (-((this.colors ? this.colors.hsv.v : 0) * 100) + 1) + 100 + '%'
            },
            pointerLeft() {
                return (this.colors ? this.colors.hsv.s : 0) * 100 + '%'
            }
        },
        methods: {
            clamp(value, min, max) {
                return min < max
                    ? (value < min ? min : value > max ? max : value)
                    : (value < max ? max : value > min ? min : value)
            },
            throttle: throttle(function(fn, data) {
                    if (fn) {
                        fn(data)
                    }
                }, 20,
                {
                    'leading': true,
                    'trailing': false
                }),
            handleChange(e, skip) {
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
                let left = this.clamp(pageX - xOffset, 0, containerWidth)
                let top = this.clamp(pageY - yOffset, 0, containerHeight)
                let saturation = left / containerWidth
                let bright = this.clamp(-(top / containerHeight) + 1, 0, 1)
                this.throttle(this.onChange({
                    h: this.colors ? this.colors.hsv.h : 0,
                    s: saturation,
                    v: bright,
                    a: this.colors ? this.colors.hsv.a : 0,
                    source: 'hsva'
                }))
            },
            onChange(param) {
                this.$emit('change', param)
            },
            handleMouseDown() {
                // this.handleChange(e, true)
                window.addEventListener('mousemove', this.handleChange)
                window.addEventListener('mouseup', this.handleChange)
                window.addEventListener('mouseup', this.handleMouseUp)
            },
            handleMouseUp() {
                this.unbindEventListeners()
            },
            unbindEventListeners() {
                window.removeEventListener('mousemove', this.handleChange)
                window.removeEventListener('mouseup', this.handleChange)
                window.removeEventListener('mouseup', this.handleMouseUp)
            }
        }
    }
</script>

<style>
    .vc-saturation,
    .vc-saturation--white,
    .vc-saturation--black {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .vc-saturation--white {
        background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    }

    .vc-saturation--black {
        background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
    }

    .vc-saturation-pointer {
        cursor: pointer;
        position: absolute;
    }

    .vc-saturation-circle {
        cursor: head;
        width: 4px;
        height: 4px;
        box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 1px 2px rgba(0, 0, 0, .4);
        border-radius: 50%;
        transform: translate(-2px, -2px);
    }
</style>
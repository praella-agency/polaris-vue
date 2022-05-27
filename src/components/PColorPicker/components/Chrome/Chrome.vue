<template>
    <div role="application" aria-label="Chrome color picker"
         :class="['vc-chrome', disableAlpha ? 'vc-chrome__disable-alpha' : '']">
        <div class="vc-chrome-saturation-wrap">
            <saturation :value="colors" @change="childChange"></saturation>
        </div>
        <div class="vc-chrome-body">
            <div class="vc-chrome-controls">
                <div class="vc-chrome-color-wrap">
                    <div :aria-label="`current color is ${colors.hex}`" class="vc-chrome-active-color"
                         :style="{background: activeColor}"></div>
                    <checkboard v-if="!disableAlpha"></checkboard>
                </div>

                <div class="vc-chrome-sliders">
                    <div class="vc-chrome-hue-wrap">
                        <hue :value="colors" @change="childChange"></hue>
                    </div>
                    <div class="vc-chrome-alpha-wrap" v-if="!disableAlpha">
                        <alpha :value="colors" @change="childChange"></alpha>
                    </div>
                </div>
            </div>

            <div class="vc-chrome-fields-wrap" v-if="!disableFields">
                <div class="vc-chrome-fields" v-show="fieldsIndex === 0">
                    <!-- hex -->
                    <div class="vc-chrome-field">
                        <ed-in v-if="!hasAlpha" label="hex" :value="colors.hex" @change="inputChange"></ed-in>
                        <ed-in v-if="hasAlpha" label="hex" :value="colors.hex8" @change="inputChange"></ed-in>
                    </div>
                </div>
                <div class="vc-chrome-fields" v-show="fieldsIndex === 1">
                    <!-- rgba -->
                    <div class="vc-chrome-field">
                        <ed-in label="r" :value="((colors && colors.rgba) ? colors.rgba.r : 0)" @change="inputChange"></ed-in>
                    </div>
                    <div class="vc-chrome-field">
                        <ed-in label="g" :value="((colors && colors.rgba) ? colors.rgba.g : 0)" @change="inputChange"></ed-in>
                    </div>
                    <div class="vc-chrome-field">
                        <ed-in label="b" :value="((colors && colors.rgba) ? colors.rgba.b : 0)" @change="inputChange"></ed-in>
                    </div>
                    <div class="vc-chrome-field" v-if="!disableAlpha">
                        <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
                    </div>
                </div>
                <div class="vc-chrome-fields" v-show="fieldsIndex === 2">
                    <!-- hsla -->
                    <div class="vc-chrome-field">
                        <ed-in label="h" :value="hsl.h" @change="inputChange"></ed-in>
                    </div>
                    <div class="vc-chrome-field">
                        <ed-in label="s" :value="hsl.s" @change="inputChange"></ed-in>
                    </div>
                    <div class="vc-chrome-field">
                        <ed-in label="l" :value="hsl.l" @change="inputChange"></ed-in>
                    </div>
                    <div class="vc-chrome-field" v-if="!disableAlpha">
                        <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
                    </div>
                </div>
                <!-- btn -->
                <div class="vc-chrome-toggle-btn" role="button" aria-label="Change another color definition"
                     @click="toggleViews">
                    <div class="vc-chrome-toggle-icon">
                        <svg style="width:24px; height:24px" viewBox="0 0 24 24"
                             @mouseover="showHighlight"
                             @mouseenter="showHighlight"
                             @mouseout="hideHighlight">
                            <path fill="#333"
                                  d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"/>
                        </svg>
                    </div>
                    <div class="vc-chrome-toggle-icon-highlight" v-show="highlight"></div>
                </div>
                <!-- btn -->
            </div>
        </div>
    </div>
</template>

<script>
    import colorMixin from '../mixins/color'
    import editableInput from '../common/EditableInput.vue'
    import saturation from '../common/Saturation.vue'
    import hue from '../common/Hue.vue'
    import alpha from '../common/Alpha.vue'
    import checkboard from '../common/Checkboard.vue'

    export default {
        name: 'Chrome',
        mixins: [colorMixin],
        props: {
            disableAlpha: {
                type: Boolean,
                default: false
            },
            disableFields: {
                type: Boolean,
                default: false
            }
        },
        components: {
            saturation,
            hue,
            alpha,
            'ed-in': editableInput,
            checkboard
        },
        data() {
            return {
                fieldsIndex: 0,
                highlight: false
            }
        },
        computed: {
            hsl() {
                const {h, s, l} = this.colors.hsl ? this.colors.hsl : {h:0, s:0, l:0}
                return {
                    h: h.toFixed(),
                    s: `${(s * 100).toFixed()}%`,
                    l: `${(l * 100).toFixed()}%`
                }
            },
            activeColor() {
                const rgba = this.colors.rgba;
                return 'rgba(' + (rgba ? [rgba.r, rgba.g, rgba.b, rgba.a].join(',') : []) + ')';
            },
            hasAlpha() {
                return this.colors.a < 1
            }
        },
        methods: {
            childChange(data) {
                this.colorChange(data)
            },
            inputChange(data) {
                if (!data) {
                    return
                }
                if (data.hex) {
                    this.isValidHex(data.hex) && this.colorChange({
                        hex: data.hex,
                        source: 'hex'
                    })
                } else if (data.r || data.g || data.b || data.a) {
                    this.colorChange({
                        r: data.r || this.colors.rgba.r,
                        g: data.g || this.colors.rgba.g,
                        b: data.b || this.colors.rgba.b,
                        a: data.a || this.colors.rgba.a,
                        source: 'rgba'
                    })
                } else if (data.h || data.s || data.l) {
                    const s = data.s ? (data.s.replace('%', '') / 100) : this.colors.hsl.s
                    const l = data.l ? (data.l.replace('%', '') / 100) : this.colors.hsl.l
                    this.colorChange({
                        h: data.h || this.colors.hsl.h,
                        s,
                        l,
                        source: 'hsl'
                    })
                }
            },
            toggleViews() {
                if (this.fieldsIndex >= 2) {
                    this.fieldsIndex = 0
                    return
                }
                this.fieldsIndex++
            },
            showHighlight() {
                this.highlight = true
            },
            hideHighlight() {
                this.highlight = false
            }
        }
    }
</script>

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
                        <editable-input v-if="!hasAlpha" label="hex" :value="colors.hex" @change="inputChange"></editable-input>
                        <editable-input v-if="hasAlpha" label="hex" :value="colors.hex8" @change="inputChange"></editable-input>
                    </div>
                </div>
                <div class="vc-chrome-fields" v-show="fieldsIndex === 1">
                    <!-- rgba -->
                    <div class="vc-chrome-field">
                        <editable-input label="r" :value="((colors && colors.rgba) ? colors.rgba.r : 0)" @change="inputChange"></editable-input>
                    </div>
                    <div class="vc-chrome-field">
                        <editable-input label="g" :value="((colors && colors.rgba) ? colors.rgba.g : 0)" @change="inputChange"></editable-input>
                    </div>
                    <div class="vc-chrome-field">
                        <editable-input label="b" :value="((colors && colors.rgba) ? colors.rgba.b : 0)" @change="inputChange"></editable-input>
                    </div>
                    <div class="vc-chrome-field" v-if="!disableAlpha">
                        <editable-input label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></editable-input>
                    </div>
                </div>
                <div class="vc-chrome-fields" v-show="fieldsIndex === 2">
                    <!-- hsla -->
                    <div class="vc-chrome-field">
                        <editable-input label="h" :value="hsl.h" @change="inputChange"></editable-input>
                    </div>
                    <div class="vc-chrome-field">
                        <editable-input label="s" :value="hsl.s" @change="inputChange"></editable-input>
                    </div>
                    <div class="vc-chrome-field">
                        <editable-input label="l" :value="hsl.l" @change="inputChange"></editable-input>
                    </div>
                    <div class="vc-chrome-field" v-if="!disableAlpha">
                        <editable-input label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></editable-input>
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

<script setup>
    import { ref, computed, defineEmits } from 'vue';
    import { useColors } from '../mixins/color';
    import Saturation from '../common/Saturation.vue';
    import Checkboard from '../common/Checkboard.vue';
    import Hue from '../common/Hue.vue';
    import Alpha from '../common/Alpha.vue';
    import EditableInput from '../common/EditableInput.vue';

    let props = defineProps({
        value: {
          type: String,
          default: '#FFFF'
        },
        disableAlpha: {
            type: Boolean,
            default: false
        },
        disableFields: {
            type: Boolean,
            default: false
        }
    })
    const emit = defineEmits(['input']);
    let { colors, colorChange, isValidHex } = useColors(props.value);

    let fieldsIndex = ref(0);
    let highlight = ref(false);

    let hsl = computed(() => {
        const {h, s, l} = colors.value.hsl ? colors.value.hsl : {h: 0, s: 0, l: 0}
        return {
            h: h.toFixed(),
            s: `${(s * 100).toFixed()}%`,
            l: `${(l * 100).toFixed()}%`
        }
    });

    let activeColor = computed(() => {
        const rgba = colors.value.rgba;
        return 'rgba(' + (rgba ? [rgba.r, rgba.g, rgba.b, rgba.a].join(',') : []) + ')';
    });

    let hasAlpha = computed(() => {
        return colors.value.a < 1;
    });

    function childChange(data) {
        console.log('childChange', data)
        colorChange(data);
        emit('input', colors.value);
    }

    function inputChange(data) {
        console.log('in crom input change')
        if (!data) {
            return
        }
        if (data.hex) {
            isValidHex(data.hex) && colorChange({
                hex: data.hex,
                source: 'hex'
            })
        } else if (data.r || data.g || data.b || data.a) {
            colorChange({
                r: data.r || colors.value.rgba.r,
                g: data.g || colors.value.rgba.g,
                b: data.b || colors.value.rgba.b,
                a: data.a || colors.value.rgba.a,
                source: 'rgba'
            })
        } else if (data.h || data.s || data.l) {
            const s = data.s ? (data.s.replace('%', '') / 100) : colors.value.hsl.s
            const l = data.l ? (data.l.replace('%', '') / 100) : colors.value.hsl.l
            colorChange({
                h: data.h || colors.value.hsl.h,
                s,
                l,
                source: 'hsl'
            })
        }
    }

    function toggleViews() {
        if (fieldsIndex.value >= 2) {
            fieldsIndex.value = 0;
            return;
        }
        fieldsIndex.value++;
    }

    function showHighlight() {
        highlight.value = true;
    }

    function hideHighlight() {
        highlight.value = false;
    }
</script>

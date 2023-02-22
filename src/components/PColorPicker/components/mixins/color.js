import { defineComponent, computed, watch, provide } from 'vue';
import tinycolor from 'tinycolor2'

function _colorChange(data, oldHue) {
    let alpha = data && data.a
    let color

    // hsl is better than hex between conversions
    if (data && data.hsl) {
        color = tinycolor(data.hsl)
    } else if (data && data.hex && data.hex.length > 0) {
        color = tinycolor(data.hex)
    } else if (data && data.hsv) {
        color = tinycolor(data.hsv)
    } else if (data && data.rgba) {
        color = tinycolor(data.rgba)
    } else if (data && data.rgb) {
        color = tinycolor(data.rgb)
    } else {
        color = tinycolor(data)
    }

    if (color && (color._a === undefined || color._a === null)) {
        color.setAlpha(alpha || 1)
    }

    let hsl = color.toHsl()
    let hsv = color.toHsv()

    if (hsl.s === 0) {
        hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0
    }

    /* --- comment this block to fix #109, may cause #25 again --- */
    // when the hsv.v is less than 0.0164 (base on test)
    // because of possible loss of precision
    // the result of hue and saturation would be miscalculated
    // if (hsv.v < 0.0164) {
    //   hsv.h = data.h || (data.hsv && data.hsv.h) || 0
    //   hsv.s = data.s || (data.hsv && data.hsv.s) || 0
    // }

    // if (hsl.l < 0.01) {
    //   hsl.h = data.h || (data.hsl && data.hsl.h) || 0
    //   hsl.s = data.s || (data.hsl && data.hsl.s) || 0
    // }
    /* ------ */

    return {
        hsl: hsl,
        hex: color.toHexString().toUpperCase(),
        hex8: color.toHex8String().toUpperCase(),
        rgba: color.toRgb(),
        hsv: hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
        a: data.a || color.getAlpha()
    }
}

export default defineComponent({
    props: ['value'],
    setup(props, context) {
        let val = _colorChange(props.value);
        console.log('val',val)

        let colors = computed({
            get() {
                return val;
            },
            set(newVal) {
                val = newVal;
                context.emit('input', newVal);
            }
        });
        provide('colorValue', colors);

        function colorChange(data, oldHue) {
            this.oldHue = (colors && colors.hsl) ? colors.hsl.h : 0;
            colors = _colorChange(data, oldHue || this.oldHue);
        }
        provide('colorChange', colorChange);

        function isValidHex(hex) {
            return tinycolor(hex).isValid();
        }
        provide('isValidHex', isValidHex);

        watch(() => props.value, (newVal) => {
            val = _colorChange(newVal);
        });

        return { val, colors, colorChange, isValidHex };
    }
})
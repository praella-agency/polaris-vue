<template>
    <div class="vc-editable-input">
        <input
            :aria-labelledby="labelId"
            class="vc-input__input"
            v-model="val"
            @keydown="handleKeyDown"
            @input="update"
            ref="input"
        >
        <span :for="label" class="vc-input__label" :id="labelId">{{labelSpanText}}</span>
        <span class="vc-input__desc">{{desc}}</span>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';

    let props = defineProps({
        label: String,
        labelText: String,
        desc: String,
        value: [String, Number],
        max: Number,
        min: Number,
        arrowOffset: {
            type: Number,
            default: 1
        }
    });

    const emit = defineEmits(['change']);

    const input = ref(null);

    let val = computed({
        get() {
            return props.value;
        },
        set(v) {
            if (!(props.max === undefined) && +v > props.max) {
                input.value = props.max;
            } else {
                return v;
            }
        }
    });

    const labelId = computed(() => {
        return `input__label__${props.label}__${Math.random().toString().slice(2, 5)}`;
    });

    const labelSpanText = computed(() => {
        return props.labelText || props.label;
    });

    function update(e) {
        handleChange(e.target.value);
    }

    function handleChange(newVal) {
        let data = {}
        data[props.label] = newVal;
        if (data.hex === undefined && data['#'] === undefined) {
            emit('change', data);
        } else if (newVal.length > 5) {
            emit('change', data);
        }
    }

    function handleKeyDown(e) {
        let number = Number(val)
        if (number) {
            let amount = props.arrowOffset || 1
            // Up
            if (e.keyCode === 38) {
                val = number + amount
                handleChange(val)
                e.preventDefault()
            }
            // Down
            if (e.keyCode === 40) {
                val = number - amount
                handleChange(val)
                e.preventDefault()
            }
        }
    }
</script>

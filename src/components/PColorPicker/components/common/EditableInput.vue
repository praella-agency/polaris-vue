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

<script>
    export default {
        name: 'editableInput',
        props: {
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
        },
        emits: ['change'],
        computed: {
            val: {
                get() {
                    return this.value;
                },
                set(v) {
                    if (!(this.max === undefined) && +v > this.max) {
                        this.$refs.input.value = this.max
                    } else {
                        return v
                    }
                }
            },
            labelId() {
                return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`
            },
            labelSpanText() {
                return this.labelText || this.label
            }
        },
        methods: {
            update(e) {
                this.handleChange(e.target.value)
            },
            handleChange(newVal) {
                let data = {}
                data[this.label] = newVal
                if (data.hex === undefined && data['#'] === undefined) {
                    this.$emit('change', data)
                } else if (newVal.length > 5) {
                    this.$emit('change', data)
                }
            },
            handleKeyDown(e) {
                let val = this.val
                let number = Number(val)
                if (number) {
                    let amount = this.arrowOffset || 1
                    // Up
                    if (e.keyCode === 38) {
                        val = number + amount
                        this.handleChange(val)
                        e.preventDefault()
                    }
                    // Down
                    if (e.keyCode === 40) {
                        val = number - amount
                        this.handleChange(val)
                        e.preventDefault()
                    }
                }
            }
        }
    }
</script>

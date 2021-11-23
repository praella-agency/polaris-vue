<template>
    <div
        :class="className"
        @click="$emit('toggleAll')"
    >
        <div
            class="Polaris-CheckableButton__Checkbox"
        >
            <PCheckbox
                :id="this['_uid']"
                :label="accessibilityLabel"
                labelHidden
                :checked="selected"
                :disabled="disabled"
                :indeterminate="indeterminate"
                @change="$emit('toggleAll')"
                ref="checkBoxRef"
            />
        </div>
        <span class="Polaris-CheckableButton__Label">
            {{ label }}
        </span>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PCheckbox } from '../../components/PCheckbox/index.js';

    export default {
        name: 'PCheckableButton',
        components: {
            PCheckbox,
        },
        props: {
            accessibilityLabel: {
                type: String,
                default: null,
            },
            label: {
                type: String,
                default: null,
            },
            selected: {
                type: [Boolean, String, 'indeterminate'],
                default: false,
            },
            selectMode: {
                type: Boolean,
                default: false,
            },
            smallScreen: {
                type: Boolean,
                default: false,
            },
            plain: {
                type: Boolean,
                default: false,
            },
            measuring: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            indeterminate: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                currentKey: 'bulkLg',
            };
        },
        computed: {
            className() {
                if (this.plain) {
                    return classNames(
                        'Polaris-CheckableButton',
                        'Polaris-CheckableButton__CheckableButton--plain',
                    );
                } else {
                    return classNames(
                        'Polaris-CheckableButton',
                        this.selectMode && 'Polaris-CheckableButton__CheckableButton--selectMode',
                        this.selected && 'Polaris-CheckableButton__CheckableButton--selected',
                        this.measuring && 'Polaris-CheckableButton__CheckableButton--measuring',
                    );
                }
            },
        },
        watch: {
            plain(value, oldValue) {
                if (value) {
                    this.currentKey = 'plain';
                }
            },
            smallScreen(value, oldValue) {
                if (value === true) {
                    this.currentKey = 'bulkSm';
                }
            },
        },
    }
</script>

<style scoped>

</style>
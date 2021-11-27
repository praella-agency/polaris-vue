<template>
    <component
        :is="condensed ? 'transition' : 'td'"
        :class="!condensed ? checkboxClassName : ''"
        :ref="!condensed ? 'checkboxNode' : ''">
        <div
            class="Polaris-IndexTable-Checkbox__TableCellContentContainer"
        >
            <div
                :class="wrapperClassName"
                @click="handleClick"
                @change="stopPropagation"
            >
                <PCheckbox
                    :id="itemId"
                    :label="`Select ${resourceName.singular}`"
                    labelHidden
                    :checked="selected"
                />
            </div>
        </div>
    </component>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PCheckbox } from '../../../../components/PCheckbox';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    export default {
        name: 'PIndexTableCheckbox',
        components: {
            PCheckbox,
        },
        props: {
            condensed: {
                type: Boolean,
                default: false,
            },
            itemId: {
                type: [String, Number],
                default: null,
            },
            resourceName: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('resourceName', {
                    plural: {
                        type: String,
                        required: true,
                    },
                    singular: {
                        type: String,
                        required: true,
                    },
                }),
            },
            selected: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            checkboxClassName() {
                return classNames(
                    'Polaris-IndexTable__TableCell',
                    'Polaris-IndexTable__TableCell--first',
                );
            },
            wrapperClassName() {
                return classNames(
                    'Polaris-IndexTable-Checkbox__Wrapper',
                    this.condensed ? 'Polaris-IndexTable-Checkbox--condensed' : 'Polaris-IndexTable-Checkbox--expanded',
                );
            },
        },
        methods: {
            handleResize() {
                if (!this.$refs.checkboxNode) {
                    return;
                }

                const {width} = this.$refs.checkboxNode.getBoundingClientRect();
                this.$refs.checkboxNode.style.setProperty('--p-checkbox-offset', width + 'px');
            },
            stopPropagation(event) {
                event.stopPropagation();
                event.preventDefault();
            },
            handleClick(event) {
                if (event.target.tagName === 'INPUT') {
                    this.$emit('interaction', event);
                }
            },
        },
        watch: {
            checkboxNode(value, oldValue) {
                if (!value) {
                    return;
                }

                window.addEventListener('resize', this.handleResize);

                return window.removeEventListener('resize', this.handleResize);
            },
            handleResize(value, oldValue) {
                this.handleResize();
            },
        },
    }
</script>

<style scoped>

</style>
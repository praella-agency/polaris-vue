<template>
    <div :class="className">
        <input
            :id="`SearchField${isUuid}`"
            class="Polaris-TopBar-SearchField__Input"
            :placeholder="placeholder"
            type="search"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            ref="input"
            v-model="computedValue"
            @input="handleChange"
            @keydown="preventDefault"
        />
        <span class="Polaris-TopBar-SearchField__Icon">
            <PIcon source="SearchMinor"/>
        </span>
        <button
            v-if="inputValue !== ''"
            type="button"
            aria-label="Clear"
            class="Polaris-TopBar-SearchField__Clear"
            @click="handleClear"
            @blur="handleBlur"
            @focus="handleFocus"
        >
            <PIcon source="CircleCancelMinor"/>
        </button>
        <div
            :class="divClassName"
        />
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';

    let props = defineProps({
        /**
         * Initial value for the input
         */
        value: {
            type: String,
            required: false,
        },
        /**
         * Initial value for the input
         */
        modelValue: {
            type: String,
            required: false,
        },
        /**
         * Hint text to display
         */
        placeholder: {
            type: String,
            default: null,
        },
        /**
         * Force the focus state on the input
         */
        focused: {
            type: Boolean,
            default: false,
        },
        /**
         * Force a state where search is active but the text field component is not focused
         */
        active: {
            type: Boolean,
            default: false,
        },
        /**
         * Show a border when the search field is focused
         */
        showFocusBorder: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['input', 'change', 'cancel', 'focus', 'update:value', 'update:modelValue']);

    let forceActive = ref(false);
    let input = ref(null);

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    let inputValue = ref(computedVModel.value);

    let className = computed(() => {
        return classNames(
            'Polaris-TopBar-SearchField',
            (props.focused || props.active || forceActive.value) && 'Polaris-TopBar-SearchField--focused',
        );
    });

    let divClassName = computed(() => {
        return classNames(
            'Polaris-TopBar-SearchField__Backdrop',
            props.showFocusBorder && 'Polaris-TopBar-SearchField__BackdropShowFocusBorder',
        );
    });

    let computedValue = computed({
        get() {
            return inputValue.value;
        },
        set(value) {
            inputValue.value = value;
            /**
             * Handle input of search field
             */
            emit('input', value);
            /**
             * For Vue 3
             * Handle input of search field
             * @ignore
             */
            emit('update:value', value);
            /**
             * For Vue 3
             * Handle input of search field
             * @ignore
             */
            emit('update:modelValue', value);
        },
    });

    let isUuid = computed(() => {
        return uuid();
    });

    function preventDefault(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    function handleChange(event) {
        emit('change', event.target.value);
    }

    function handleBlur() {
        forceActive.value = true;
        emit('cancel');

        if (!(input)) {
            return;
        }

        (input).value = '';
        emit('change');
        (input).focus();
    }

    function handleFocus() {
        emit('focus');
        forceActive.value = true;
    }

    function handleClear() {
        inputValue.value = '';
        emit('input', inputValue.value);
        /**
         * @ignore
         */
        emit('update:value', inputValue.value);
        /**
         * For Vue 3
         * @ignore
         */
        emit('update:modelValue', inputValue.value);
    }

    watch(() => props.focused, () => {
        if (!(input)) {
            return;
        }

        if (props.focused) {
            (input).focus();
        } else {
            (input).blur();
        }
    });

    onMounted(() => {
        input = input.value;
        inputValue.value = computedVModel.value;
    });
</script>

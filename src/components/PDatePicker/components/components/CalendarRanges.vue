<template>
    <div class="ranges">
        <ul v-if="ranges">
            <li
                v-for="range in listedRanges"
                @click="clickRange(range.value)"
                :data-range-key="range.label"
                :key="range.label"
                :class="range_class(range)"
                tabindex="0"
            >{{range.label}}
            </li>
            <li
                v-if="showCustomRangeLabel"
                :class="{ active: customRangeActive || !selectedRange }"
                @click="clickCustomRange"
                tabindex="0"
            >
                {{localeData.customRangeLabel}}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import useDateUtil from './dateUtilMixin';

    let props = defineProps({
        ranges: Object,
        selected: Object,
        localeData: Object,
        alwaysShowCalendars: Boolean,
    });
    const { $dateUtil } = useDateUtil();
    const emit = defineEmits(['click-range', 'show-custom-range']);
    let customRangeActive = ref(false);

    let listedRanges = computed(() => {
        if (!props.ranges) return false;
        return Object.keys(props.ranges).map(value => {
            return {
                label: value,
                value: props.ranges[value],
                selected: $dateUtil.value.isSame(props.selected.startDate, props.ranges[value][0]) && $dateUtil.value.isSame(props.selected.endDate, props.ranges[value][1])
            };
        })
    });

    let selectedRange = computed(() => {
        return listedRanges.value.find(r => r.selected === true);
    });

    let showCustomRangeLabel = computed(() => {
        return !props.alwaysShowCalendars;
    });

    function clickRange(range) {
        customRangeActive.value = false;
        emit('click-range', range);
    }

    function clickCustomRange() {
        customRangeActive.value = true;
        emit('show-custom-range');
    }

    function range_class(range) {
        return {active: range.selected === true};
    }
</script>

<template>
    <div class="calendar-time">
        <select v-model="hour" class="hourselect form-control mr-1" :disabled="readonly">
            <option v-for="h in hours"
                    :key="h" :value="h"
            >
                {{formatNumber(h)}}
            </option>
        </select>
        :<select v-model="minute" class="minuteselect form-control ml-1" :disabled="readonly">
        <option v-for="m in minutes"
                :key="m" :value="m">
            {{formatNumber(m)}}
        </option>
    </select>
        <template v-if="secondPicker">
            :<select v-model="second" class="secondselect form-control ml-1" :disabled="readonly">
            <option v-for="s in 60"
                    :key="s-1" :value="s-1">
                {{formatNumber(s-1)}}
            </option>
        </select>
        </template>
        <select v-if="!hour24" v-model="ampm" class="ampmselect" :disabled="readonly">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';

    let props = defineProps({
        minuteIncrement: {
            type: Number,
            default: 5,
        },
        hour24: {
            type: Boolean,
            default: true,
        },
        secondPicker: {
            type: Boolean,
            default: false,
        },
        currentTime: {
            default() {
                return new Date()
            }
        },
        readonly: {
            type: Boolean,
            default: false
        }
    });
    const emit = defineEmits(['update']);
    let data = ref(null);

    let current = props.currentTime ? props.currentTime : new Date();
    let currentHours = current.getHours();
    let hour = ref(props.hour24 ? currentHours : currentHours % 12 || 12);
    let minute = ref(current.getMinutes() - (current.getMinutes() % props.minuteIncrement));
    let second = ref(current.getSeconds());
    let ampm = ref(currentHours < 12 ? 'AM' : 'PM');

    let hours = computed(() => {
        let values = [];
        let max = props.hour24 ? 24 : 12;
        for (let i = 0; i < max; i++) {
            values.push(props.hour24 ? i : i + 1);
        }
        return values;
    });

    let minutes = computed(() => {
        let values = [];
        let max = 60;
        for (let i = 0; i < max; i = i + props.minuteIncrement) {
            values.push(i);
        }
        return values;
    });

    function getHour() {
        if (props.hour24) {
            return hour.value;
        } else {
            if (hour.value === 12) {
                return ampm.value === 'AM' ? 0 : 12;
            } else {
                return hour.value + (ampm.value === 'PM' ? 12 : 0);
            }
        }
    }

    function onChange() {
        emit('update', {
            hours: getHour(),
            minutes: minute.value,
            seconds: second.value,
        });
    }

    function formatNumber(value) {
        if (value < 10) {
            return '0' + value.toString();
        }
        return value.toString();
    }

    watch(hour, () => {
        onChange();
    });

    watch(minute, () => {
        onChange();
    });

    watch(second, () => {
        onChange();
    });

    watch(ampm, () => {
        onChange();
    });
</script>

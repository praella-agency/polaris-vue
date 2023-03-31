<template>
    <div></div>
</template>

<script setup>
    import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue';
    import ApexCharts from 'apexcharts/dist/apexcharts.min';

    let props = defineProps({
        options: {
            type: Object
        },
        type: {
            type: String
        },
        series: {
            type: Array,
            required: true,
            default: () => []
        },
        width: {
            default: "100%"
        },
        height: {
            default: "auto"
        }
    });
    let attrs = useAttrs();
    let chart = ref(null);
    let instance = ref(null);

    onBeforeMount(() => {
        window.ApexCharts = ApexCharts;
    });

    onMounted(() => {
        instance.value = getCurrentInstance();
        init();

        watch(() => props.options, (options) => {
            if (!chart.value && options) {
                init();
            } else {
                chart.value.updateOptions(props.options);
            }
        });

        watch(() => props.series, (series) => {
            if (!chart.value && series) {
                init();
            } else {
                chart.value.updateSeries(props.series);
            }
        });
        let watched = ["type", "width", "height"];
        watched.forEach(prop => {
            watch(() => prop, () => {
                refresh();
            })
        });
    });

    onBeforeUnmount(() => {
        if (!chart.value) {
            return;
        }
        destroy();
    });

    function init() {
        const newOptions = {
            chart: {
                type: props.type || props.options.chart.type || "line",
                height: props.height,
                width: props.width,
                events: {}
            },
            series: props.series
        };

        Object.keys(attrs).forEach(evt => {
            newOptions.chart.events[evt] = attrs[evt];
        });

        const config = extend(props.options, newOptions);
        chart.value = new ApexCharts(instance.value.vnode.el, config);
        return chart.value.render();
    }

    function isObject(item) {
        return (item && typeof item === "object" && !Array.isArray(item) && true);
    }

    function extend(target, source) {
        if (typeof Object.assign !== "function") {
            (function () {
                Object.assign = function (target) {
                    // We must check against these specific cases.
                    if (target === undefined || target === null) {
                        throw new TypeError("Cannot convert undefined or null to object");
                    }

                    let output = Object(target);
                    for (let index = 1; index < arguments.length; index++) {
                        let source = arguments[index];
                        if (source !== undefined && source !== null) {
                            for (let nextKey in source) {
                                if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                                    output[nextKey] = source[nextKey];
                                }
                            }
                        }
                    }
                    return output;
                };
            })();
        }

        let output = Object.assign({}, target);
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach(key => {
                if (isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, {
                            [key]: source[key]
                        });
                    } else {
                        output[key] = extend(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, {
                        [key]: source[key]
                    });
                }
            });
        }
        return output;
    }

    function refresh() {
        destroy();
        return init();
    }

    function destroy() {
        chart.value.destroy();
    }

    function updateSeries(newSeries, animate) {
        return chart.value.updateSeries(newSeries, animate);
    }

    function updateOptions(newOptions, redrawPaths, animate, updateSyncedCharts) {
        return chart.value.updateOptions(
            newOptions,
            redrawPaths,
            animate,
            updateSyncedCharts
        );
    }

    function toggleSeries(seriesName) {
        return chart.value.toggleSeries(seriesName);
    }

    function showSeries(seriesName) {
        chart.value.showSeries(seriesName);
    }

    function hideSeries(seriesName) {
        chart.value.hideSeries(seriesName);
    }

    function appendSeries(newSeries, animate) {
        return chart.value.appendSeries(newSeries, animate);
    }

    function resetSeries() {
        chart.value.resetSeries();
    }

    function zoomX(min, max) {
        chart.value.zoomX(min, max)
    }

    function toggleDataPointSelection(seriesIndex, dataPointIndex) {
        chart.value.toggleDataPointSelection(seriesIndex, dataPointIndex);
    }

    function appendData(newData) {
        return chart.value.appendData(newData);
    }

    function addText(options) {
        chart.value.addText(options);
    }

    function addImage(options) {
        chart.value.addImage(options);
    }

    function addShape(options) {
        chart.value.addShape(options);
    }

    function dataURI() {
        return chart.value.dataURI();
    }

    function setLocale(localeName) {
        return chart.value.setLocale(localeName);
    }

    function addXaxisAnnotation(options, pushToMemory) {
        chart.value.addXaxisAnnotation(options, pushToMemory);
    }

    function addYaxisAnnotation(options, pushToMemory) {
        chart.value.addYaxisAnnotation(options, pushToMemory);
    }

    function addPointAnnotation(options, pushToMemory) {
        chart.value.addPointAnnotation(options, pushToMemory);
    }

    function removeAnnotation(id, options) {
        chart.value.removeAnnotation(id, options);
    }

    function clearAnnotations() {
        chart.value.clearAnnotations();
    }
</script>

<template>
    <PFrame>
        <template #topBar>
            <PTopBar
                :searchField="{
                value: search,
                placeholder: 'Search',
                showFocusBorder: true,
            }"
                :searchResultsVisible="false"
                @searchFieldChange="searchIcon"
                @searchResultsDismiss="handleSearchResultsDismiss"
            />
        </template>
        <template #default>
            <div class="shopify-div">
                <PStack v-if="icons.major.length > 0" vertical spacing="tight">
                    <PStackItem>
                        <PHeading class="icon-heading">Major Icons</PHeading>
                    </PStackItem>
                    <PStackItem>
                        <div class="container-div">
                            <div
                                v-for="(icon, key) in icons.major"
                                :key="key"
                                class="icon-div"
                                v-p-tooltip.mostSpace='"<PIcon source=\"" + icon + "\" />"'
                                @mouseover="changeCode(icon)"
                                @click="copyCode(icon)"
                            >
                                <div>
                                    <PIcon v-if="source" :source="source"/>
                                    <PIcon v-else :source="icon" :color="color" :backdrop="backdrop"/>
                                    <div class="icon-text-div">
                                        {{ icon.replace('Major', '').replace(/([A-Z])/g, ' $1').trim() }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PStackItem>
                </PStack>
                <PStack v-if="icons.minor.length > 0" vertical spacing="tight">
                    <PStackItem>
                        <PHeading class="icon-heading">Minor Icons</PHeading>
                    </PStackItem>
                    <PStackItem>
                        <div class="container-div">
                            <div
                                v-for="(icon, key) in icons.minor"
                                :key="key"
                                class="icon-div"
                                v-p-tooltip.mostSpace='"<PIcon source=\"" + icon + "\" />"'
                                @mouseover="changeCode(icon)"
                                @click="copyCode(icon)"
                            >
                                <div>
                                    <PIcon v-if="source" :source="source"/>
                                    <PIcon v-else :source="icon" :color="color" :backdrop="backdrop"/>
                                    <div class="icon-text-div">
                                        {{ icon.replace('Minor', '').replace(/([A-Z])/g, ' $1').trim() }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PStackItem>
                </PStack>
            </div>
        </template>
    </PFrame>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { PFrame } from '../PFrame';
    import { PTopBar } from '../PTopBar';
    import { PStack } from '../PStack';
    import { PStackItem } from '../PStack/components/PStackItem';
    import { PHeading } from '../PHeading';
    import { PIcon } from '../PIcon';
    import * as AllIcon from '../../assets/shopify-polaris-icons';

    let props = defineProps({
        color: {
            type: String,
            default: null,
        },
        backdrop: {
            type: Boolean,
        },
        source: {
            type: String,
        },
    });

    let id = ref('');
    let icons = ref({
        major: [],
        minor: [],
    });
    let iconCode = ref('');
    let copyText = ref('');
    let allIcons = ref({});
    let search = ref('');

    function searchIcon(value) {
        if (!value) {
            allIcons.value.forEach((icon) => {
                if (icon.includes('Major')) {
                    icons.value.major.push(icon);
                } else if (icon.includes('Minor')) {
                    icons.value.minor.push(icon);
                }
            });
            return icons.value;
        } else {
            icons.value = {
                major: [],
                minor: [],
            };
            allIcons.value.forEach((icon) => {
                if (icon.toLowerCase().includes(value.toLowerCase()) && icon.includes('Major')) {
                    icons.value.major.push(icon);
                } else if (icon.toLowerCase().includes(value.toLowerCase()) && icon.includes('Minor')) {
                    icons.value.minor.push(icon);
                }
            });
            return icons.value;
        }
    }

    function changeCode(icon) {
        iconCode.value = icon;
        iconCode.value = '<PIcon source="' + icon + '" />';
    }

    function copyCode(icon) {
        let copy = '';
        if (props.backdrop) {
            copy = navigator.clipboard.writeText(
                '<PIcon source="' + icon + '" color="' + props.color + '" backdrop="' + props.backdrop + '" />',
            );
        } else {
            if (props.color === null) {
                copy = navigator.clipboard.writeText(
                    '<PIcon source="' + icon + '" />',
                );
            } else {
                copy = navigator.clipboard.writeText(
                    '<PIcon source="' + icon + '" color="' + props.color + '" />',
                );
            }
        }
        copyText.value = copy ? 'Copied!' : '';
        this.$pToast.open({
            message: copyText.value,
            duration: 3000,
        });
    }

    function handleSearchResultsDismiss() {
        search.value = '';
    }

    onMounted(() => {
        allIcons.value = Object.keys(AllIcon);
        allIcons.value.sort();
        allIcons.value.forEach((icon) => {
            if (icon.includes('Major')) {
                icons.value.major.push(icon);
            } else if (icon.includes('Minor')) {
                icons.value.minor.push(icon);
            }
        });
    });
</script>

<style scoped>
    .shopify-div {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .container-div {
        display: flex;
        flex-wrap: wrap;
    }

    .icon-div {
        width: 150px;
        padding: 12px;
        margin: 10px;
        text-align: center;
        position: relative;
        height: 100px;
    }

    .icon-div:hover {
        border-radius: 10px;
        cursor: pointer;
        background-color: #FFFFFF;
        box-shadow: 0 0 11px rgba(33, 33, 33, .2);
    }

    .icon-text-div {
        color: #464c54;
        padding-top: 16px;
        word-break: break-all;
        font-size: 14px;
    }

    .icon-heading {
        margin: 15px 0 0 15px;
    }
</style>

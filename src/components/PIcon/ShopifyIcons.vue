<template>
    <div class="shopify-div">
        <PTextField class="shopify-polaris-text" placeholder="Search Icon" @input="searchIcon"/>
        <div class="container-div">
            <div v-for="(icon, key) in icons" :key="key" class="icon-div icon-tooltip" @mouseover="changeCode(icon)"
                 @click="copyCode()">
                <div>
                    <PIcon :source="icon" color="tealDark"/>
                    <div class="icon-text-div">
                        {{ icon }}
                    </div>
                </div>
                <span class="span-tooltip">{{ iconCode }}</span>
            </div>
            <PToast ref="iconToast" :message="copyText" position="bottom"></PToast>
        </div>
    </div>
</template>

<script>
    import {PTextField} from '../PTextField';
    import {PModal} from '../PModal';
    import {PFormLayout} from '../PFormLayout';
    import {PTextStyle} from '../PTextStyle';
    import {PButton} from '../PButton';
    import {PStack, PStackItem} from '../PStack';
    import {PToast} from '../PToast';
    import PIcon from './PIcon.vue';
    import * as AllIcon from '@/assets/shopify-polaris-icons';

    export default {
        name: "ShopifyIcons",
        components: {
            PTextField, PIcon, PModal, PFormLayout, PTextStyle, PStack, PStackItem, PButton, PToast,
        },
        data() {
            return {
                id: '',
                icons: [],
                iconCode: '',
                copyText: '',
            };
        },
        methods: {
            searchIcon(value) {
                if (value === null) {
                    for (let icon in AllIcon) {
                        this.icons.push(icon);
                    }
                    return this.icons;
                } else {
                    this.icons = [];
                    for (let icon in AllIcon) {
                        if (icon.toLowerCase().includes(value.toLowerCase())) {
                            this.icons.push(icon);
                        }
                    }
                    return this.icons;
                }
            },
            changeCode(icon) {
                this.iconCode = icon;
                this.iconCode = '<PIcon :source="' + icon + '" />';
            },
            copyCode() {
                let copy = navigator.clipboard.writeText(this.iconCode);
                this.copyText = copy ? 'Copied!' : '';
                this.$refs.iconToast.$el.click();
            },
        },
        created() {
            for (let icon in AllIcon) {
                this.icons.push(icon);
            }
            return this.icons;
        },
    }
</script>

<style scoped>
    .shopify-div {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .shopify-polaris-text {
        width: 300px;
        margin-bottom: 30px;
    }

    .container-div {
        display: flex;
        flex-wrap: wrap;
    }

    .icon-div {
        width: 150px;
        padding: 12px;
        margin: 12px;
        text-align: center;
        position: relative;
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

    .icon-tooltip .span-tooltip {
        background: none repeat scroll 0 0 #39a9a2;
        color: #ffffff;
        font-weight: normal;
        padding: 8px 10px;
        box-sizing: border-box;
        margin-left: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        position: absolute;
        text-align: center;
        white-space: nowrap;
        border-radius: 5px;
        box-shadow: 3px 3px 3px #e1e1e1;
        visibility: hidden;
        transition: all .3s linear;
        bottom: calc(100% + 10px);
        left: 50%;
        z-index: 99;
        transform: translate(-50%, 0);
    }


    .icon-tooltip:hover .span-tooltip {
        opacity: 1;
        filter: alpha(opacity=100);
        visibility: visible;
    }

    .icon-tooltip .span-tooltip:after {
        border-color: #39a9a2 rgba(0, 0, 0, 0);
        border-style: solid;
        border-width: 8px 8px 0;
        bottom: -8px;
        content: "";
        display: block;
        left: calc(50% - 4px);
        position: absolute;
        width: 0;
    }
</style>

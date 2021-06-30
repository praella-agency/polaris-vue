<template>
    <div class="shopify-div">
        <PTextField class="shopify-polaris-text" placeholder="Search Icon" @input="searchIcon"/>
        <div class="container-div">
            <div v-for="(icon, key) in icons" :key="key" class="icon-div icon-tooltip" @mouseover="changeCode(icon)"
                 @click="copyCode()">
                <div>
                    <PIcon :source="icon" color="tealDark" />
                    <div class="icon-text-div">
                        {{ icon }}
                    </div>
                </div>
                <span class="span-tooltip">{{ iconCode }}</span>
            </div>
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
    import PIcon from './PIcon.vue';
    import * as AllIcon from '@/assets/shopify-polaris-icons';

    export default {
        name: "ShopifyIcons",
        components: {
            PTextField, PIcon, PModal, PFormLayout, PTextStyle, PStack, PStackItem, PButton,
        },
        data() {
            return {
                id: '',
                icons: [],
                iconCode: '',
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

    .icon-tooltip:hover .span-tooltip {
        opacity: 1;
        filter: alpha(opacity=100);
        top: -6em;
        left: 2px;
        z-index: 99;
        display: inline-block;
    }

    .icon-tooltip .span-tooltip {
        background: none repeat scroll 0 0 #00848e; /*-- some basic styling */
        color: #ffffff;
        font-size: 0.8em;
        font-weight: normal;
        line-height: 1.5em;
        padding: 15px 0;

        box-sizing: border-box;
        width: 400px;

        top: -4em; /*-- this is the original position of the tooltip when it's hidden */
        left: 2px;
        margin-left: 0;
        display: none;
        /*-- set opacity to 0 otherwise our animations won't work */
        opacity: 0;
        filter: alpha(opacity=0);
        position: absolute;
        text-align: center;
        z-index: 2;
    }

    .icon-tooltip .span-tooltip:after {
        border-color: #00848e rgba(0, 0, 0, 0);
        border-style: solid;
        border-width: 15px 15px 0;
        bottom: -15px;
        content: "";
        display: block;
        left: 31px;
        position: absolute;
        width: 0;
    }
</style>

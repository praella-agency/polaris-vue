<template>
    <PFrame>
        <PPage
            title="Colors"
        >
            <PStack vertical>
                <PStackItem>
                    <PTextStyle variation="strong">
                        Each color from the spec gets converted to a background and text variant for styling within your
                        application through a class. Also support our component library.
                    </PTextStyle>
                </PStackItem>
                <PStackItem style="margin-bottom: 1.6rem;">
                    <PCard sectioned class="grey lighten-3">
                        <PTextContainer>
                            <PTextStyle>
                                Background color
                            </PTextStyle>
                            <PTextStyle variation="code" style="font-size: 1em;">
                                class="red"
                            </PTextStyle>
                            <PTextStyle>
                                with variation
                            </PTextStyle>
                            <PTextStyle variation="code" style="font-size: 1em;">
                                class="red lighten-5"
                            </PTextStyle>
                        </PTextContainer>
                        <PTextContainer>
                            <PTextStyle>
                                Text color
                            </PTextStyle>
                            <PTextStyle variation="code" style="font-size: 1em;">
                                class="red--text"
                            </PTextStyle>
                            <PTextStyle>
                                with variation
                            </PTextStyle>
                            <PTextStyle variation="code" style="font-size: 1em;">
                                class="red--text text--lighten-2"
                            </PTextStyle>
                        </PTextContainer>
                    </PCard>
                </PStackItem>
                <PStackItem style="margin-bottom: 1.6rem;">
                    <PCard sectioned class="grey lighten-5" title="Shopify colors">
                        <PStack>
                            <template
                                v-for="(color, key) in computedColors"
                            >
                                <PStackItem v-if="key === 'shopify-colors'" v-for="(subColor, key2) in color" :key="key2">
                                    <PStack alignment="center">
                                        <PStackItem>
                                            <div style="border-radius: 100%; width: 40px; height: 40px;" :class="`${key} ${convertToClass(key2)}`"/>
                                        </PStackItem>
                                        <PStackItem>
                                            <PTextStyle>{{ key2 }}</PTextStyle>
                                        </PStackItem>
                                    </PStack>
                                </PStackItem>
                            </template>
                        </PStack>
                    </PCard>
                </PStackItem>
            </PStack>
            <PStack>
                <PStackItem v-for="(color, key) in computedColors" :key="key" v-if="key !== 'shopify-colors'" width="300">
                    <PCard :class="`${key}`">
                        <PCardSection :class="key" :title="key"/>
                        <PCardSection
                            v-for="(subColor, key2) in color"
                            :key="key2"
                            :class="`${key} ${convertToClass(key2)}`"
                        >
                            <PLayout :class="getColorClass(key2)">
                                <PLayoutSection>
                                    <PTextStyle v-if="key !== 'shades'">{{ key }}</PTextStyle>
                                    <PTextStyle v-if="key2 !== 'base'">{{ key2.replace(/(.*)(\d)/, '$1-$2') }}</PTextStyle>
                                    <PTextStyle v-if="subColor !== 'transparent'">{{ subColor.toUpperCase() }}</PTextStyle>
                                </PLayoutSection>
                            </PLayout>
                        </PCardSection>
                    </PCard>
                </PStackItem>
            </PStack>
        </PPage>
    </PFrame>
</template>

<script>
    import colors from './colors';
    import { PFrame } from '../../components/PFrame';
    import { PPage } from '../../components/PPage';
    import { PCard } from '../../components/PCard';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PCardSection } from '../../components/PCard/components/PCardSection';
    import { PLayout } from '../../components/PLayout';
    import { PLayoutSection } from '../../components/PLayout/components/PLayoutSection';
    import { PTextStyle } from '../../components/PTextStyle';
    import { PHeading } from '../../components/PHeading';
    import { PTextContainer } from '../../components/PTextContainer';

    const kebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase();

    export default {
        name: 'ColorPalette',
        components: {
            PCardSection, PStackItem, PStack, PFrame, PCard, PLayout, PLayoutSection, PTextStyle, PPage, PHeading,
            PTextContainer,
        },
        data() {
            return {
                colors,
            };
        },
        computed: {
            computedColors() {
                const colors = {};
                // const search = this.search.toLowerCase()
                Object.keys(this.colors).forEach(key => {
                    const kebabKey = kebabCase(key).toLowerCase();
                    // if (kebabKey.indexOf(search) > -1) {
                    colors[kebabKey] = this.colors[key];
                    // }
                })
                return colors;
            },
        },
        methods: {
            endStr(str) {
                return str[str.length - 1]
            },
            convertToClass(str) {
                const end = this.endStr(str)
                const sub = str.substr(0, str.length - 1)
                if (isNaN(parseInt(end))) return str
                return `${sub}-${end}`
            },
            getColorClass(key) {
                if (['white', 'transparent'].includes(key) ||
                    key.indexOf('light') > -1 ||
                    key.indexOf('accent') > -1
                ) {
                    return 'black--text';
                }
                return 'white--text';
            },
        },
    }
</script>

<style scoped>

</style>
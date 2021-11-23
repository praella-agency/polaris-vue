<template>
    <li role="presentation" :class="className">
        <button
            v-if="!to && !url"
            role="tab"
            :id="id"
            type="button"
            :tabindex="tabIndex"
            :aria-selected="selected"
            :aria-control="`${id}-panel`"
            :class="elementClassName"
            @click="$emit('click', id, $event)"
        >
            <span v-if="Object.keys(icon).length > 0" class="Polaris-VerticalTabs__TabElement--icon">
                <PIcon v-bind="icon"/>
            </span>
            <span class="Polaris-VerticalTabs__Title">
                {{ content }}
            </span>
            <span v-if="Object.keys(badge).length > 0">
                <PBadge v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </button>

        <a
            v-else-if="url"
            :id="id"
            :href="url"
            :target="external ? '_blank' : ''"
            :tabindex="tabIndex"
            :class="elementClassName"
            :aria-selected="selected"
            :aria-control="`${id}-panel`"
            @click="$emit('click', id, $event)"
        >
            <span v-if="Object.keys(icon).length > 0" class="Polaris-VerticalTabs__TabElement--icon">
                <PIcon v-bind="icon"/>
            </span>
            <span class="Polaris-VerticalTabs__Title">
                {{ content }}
            </span>
            <span v-if="Object.keys(badge).length > 0">
                <PBadge v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </a>

        <router-link
            v-else
            :tabindex="tabIndex"
            :active-class="activeClass"
            :class="elementClassName"
            :to="to"
            :aria-selected="selected"
            :aria-control="`${id}-panel`"
            @click.native="$emit('click', id, $event)"
        >
            <span v-if="icon && Object.keys(icon).length > 0" class="Polaris-VerticalTabs__TabElement--icon">
                <PIcon v-bind="icon"/>
            </span>
            <span class="Polaris-VerticalTabs__Title">
                {{ content }}
            </span>
            <span v-if="badge && Object.keys(badge).length > 0">
                <PBadge v-bind="badge">
                    {{ badge.content }}
                </PBadge>
            </span>
        </router-link>
    </li>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';
    import { PIcon } from './../../../../components/PIcon/index.js';
    import { PBadge } from './../../../../components/PBadge/index.js';
    import { Color } from '@/types';

    interface Icon {
        source?: string | 'placeholder';
        color?: Color;
        backdrop?: boolean;
        accessibilityLabel?: string;
    }

    interface Badge {
        content?: string;
        status?: string;
        progress?: string;
        background?: string;
        color?: string;
        size?: string;
    }

    @Component({
        components: {
            PIcon, PBadge,
        },
    })
    export default class PVerticalTab extends Vue {

        @Prop([ String, Number ]) public id!: string | number;
        @Prop(Boolean) public focused!: boolean;
        @Prop(Boolean) public selected!: boolean;
        @Prop([ String, Object ]) public to!: string | object;
        @Prop(String) public url!: string;
        @Prop(String) public content!: string;
        @Prop(Boolean) public external!: boolean;
        @Prop({type: String, default: 'Polaris-VerticalTabs__TabElement--selected'}) public activeClass!: string;
        @Prop({type: Object, default: () => ({})}) public icon!: Icon;
        @Prop({type: Object, default: () => ({})}) public badge!: Badge;

        public get className() {
            return classNames(
                'Polaris-VerticalTabs__Tab',
                this.selected && 'Polaris-VerticalTabs__Tab--selected',
            );
        }

        public get elementClassName() {
            return classNames(
                'Polaris-VerticalTabs__TabElement',
                this.selected && 'Polaris-VerticalTabs__TabElement--selected',
            );
        }

        public get tabIndex() {
            return this.selected ? 0 : -1;
        }
    }
</script>

<style scoped>

</style>
<template>
    <PUnstyledLink v-if="url" :class="menuActionClassNames" :url="url" :external="external">
        <span v-if="icon || disclosure" class="Polaris-ActionMenu-MenuAction__ContentWrapper">
            <span v-if="icon" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon :source="icon" />
            </span>
            <span class="Polaris-ActionMenu-MenuAction__Content">{{content}}</span>
            <span v-if="disclosure" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon source="CaretDownMinor" />
            </span>
        </span>
        <template v-else>{{content}}</template>
    </PUnstyledLink>
    <button v-else type="button" :class="menuActionClassNames" :disabled="disabled" @click="onAction()">
        <span v-if="icon || disclosure" class="Polaris-ActionMenu-MenuAction__ContentWrapper">
            <span v-if="icon" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon :source="icon" />
            </span>
            <span class="Polaris-ActionMenu-MenuAction__Content">{{content}}</span>
            <span v-if="disclosure" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon source="CaretDownMinor" />
            </span>
        </span>
        <template v-else>{{content}}</template>
    </button>
</template>

<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {classNames} from '@/utilities/css';
    import {ComplexAction, MenuActionDescriptor} from '@/types';
    import {PIcon} from '@/components/PIcon';
    import {PUnstyledLink} from '@/components/PUnstyledLink';

    export interface MenuActionProps extends ComplexAction {
        disclosure?: boolean;
    }

    @Component({
        components: {
            PUnstyledLink,
            PIcon,
        },
    })
    export default class PActionMenuMenuAction extends Vue {

        @Prop(String) public content!: string;
        @Prop(String) public url!: string;
        @Prop(Boolean) public external!: boolean;
        @Prop(String) public icon!: string;
        @Prop(Boolean) public disclosure!: boolean;
        @Prop(Boolean) public disabled!: boolean;
        @Prop({type: Function, default: null}) public onAction!: void;

        public get menuActionClassNames() {

            return classNames(
                'Polaris-ActionMenu-MenuAction',
                this.disabled && 'Polaris-ActionMenu-MenuAction--disabled',
            );
        }
    }
</script>

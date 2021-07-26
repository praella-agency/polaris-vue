<template>
    <nav :class="className">
        <PUnstyledLink v-if="previousURL" :class="previousClassName" :url="previousURL">
            <PIcon source="ArrowLeftMinor" />
        </PUnstyledLink>
        <button v-else type="button" :class="previousClassName" :disabled="!hasPrevious" @click="onPrevious()">
            <PIcon source="ArrowLeftMinor" />
        </button>
        <div v-if="label" class="Polaris-Pagination__Label">
            <PTextStyle v-if="hasNext && hasPrevious">{{label}}</PTextStyle>
            <PTextStyle v-else variation="subdued">{{label}}</PTextStyle>
        </div>
        <PUnstyledLink v-if="nextURL" :class="nextClassName" :url="nextURL">
            <PIcon source="ArrowRightMinor" />
        </PUnstyledLink>
        <button v-else type="button" :class="nextClassName" :disabled="!hasNext" @click="onNext()">
            <PIcon source="ArrowRightMinor" />
        </button>
    </nav>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';
    import {PUnstyledLink} from '@/components/PUnstyledLink';
    import {PIcon} from '@/components/PIcon';
    import {PTextStyle} from '@/components/PTextStyle';

    export interface PPaginationDescriptor {
        nextTooltip?: string;
        previousTooltip?: string;
        nextURL?: string;
        previousURL?: string;
        hasNext?: boolean;
        hasPrevious?: boolean;
        accessibilityLabel?: string;
        onNext?(): void;
        onPrevious?(): void;
    }

    @Component({
        components: {
            PUnstyledLink,
            PIcon,
            PTextStyle,
        },
    })
    export default class PPagination extends Vue {

        @Prop(String) public nextURL!: string;
        @Prop(String) public previousURL!: string;
        @Prop(String) public label!: string;
        @Prop(Boolean) public hasNext!: boolean;
        @Prop(Boolean) public hasPrevious!: boolean;
        @Prop({type: Function, default: null}) public onPrevious!: void;
        @Prop({type: Function, default: null}) public onNext!: void;

        public get className() {
            return classNames(
                'Polaris-Pagination',
            );
        }

        public get previousClassName() {
            return classNames(
                'Polaris-Pagination__Button',
                !this.label && 'Polaris-Pagination__PreviousButton',
            );
        }

        public get nextClassName() {
            return classNames(
                'Polaris-Pagination__Button',
                !this.label && 'Polaris-Pagination__NextButton',
            );
        }
    }
</script>

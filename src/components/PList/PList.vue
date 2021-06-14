<template>
    <component :is="element" :class="className">
        <!-- @slot Default content -->
        <slot/>
    </component>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';

    type Type = 'bullet' | 'number';

    @Component
    export default class PList extends Vue {

        /**
         * Type of list
         * @values bullet | number
         */
        @Prop({ type: String, default: 'bullet' }) public type!: Type;

        public element = this.type === 'bullet' ? 'ul' : 'ol';

        public get className() {

            return classNames(
                'Polaris-List',
                this.type && this.type === 'number' && 'Polaris-List--typeNumber',
            );
        }
    }
</script>

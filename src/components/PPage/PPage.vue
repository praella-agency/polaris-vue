<template>
    <div :class="className">
        <PPageHeader v-if="hasHeaderContent" v-bind="$attrs" v-on="$listeners" />
        <div class="Polaris-Page__Content">
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';
    import {PPageHeader, PPageHeaderProps} from './components';

    export interface PPageProps extends PPageHeaderProps {
      fullWidth?: boolean;
      narrowWidth?: boolean;
    }

    @Component({
        components: {
          PPageHeader,
        },
    })
    export default class PPage extends Vue {
        @Prop(Boolean) public fullWidth!: boolean;
        @Prop(Boolean) public narrowWidth!: boolean;

        public get hasHeaderContent() {
          return (this.$props.title != null && this.$props.title !== '') ||
                  this.$props.primaryAction != null ||
                  (this.$props.secondaryActions != null && this.$props.secondaryActions.length > 0) ||
                  (this.$props.actionGroups != null && this.$props.actionGroups.length > 0) ||
                  (this.$props.breadcrumbs != null && this.$props.breadcrumbs.length > 0);
        }

      public get className() {
        return classNames(
                'Polaris-Page',
                this.fullWidth && 'Polaris-Page--fullWidth',
                this.narrowWidth && 'Polaris-Page--narrowWidth',
        );
      }
    }
</script>

<template>
  <li :class="tabContainerClassNames">
    <button
        v-if="!to && !url"
        :id="id"
        type="button"
        :tabIndex="tabIndex"
        :class="className"
        @click="$emit('click', id, $event)"
    >
      <span :class="tabTitleClassNames">
            {{ content }}
            <PBadge v-if="badge && Object.keys(badge).length > 0" v-bind="badge">
                {{ badge.content }}
            </PBadge>
      </span>
    </button>

    <a
      v-else-if="url"
      :id="id"
      :href="url"
      :target="external ? '_blank' : ''"
      :tabIndex="tabIndex"
      :class="className"
      @click="$emit('click', id, $event)"
    >
      <span :class="tabTitleClassNames">
            {{ content }}
            <PBadge v-if="badge && Object.keys(badge).length > 0" v-bind="badge">
                {{ badge.content }}
            </PBadge>
      </span>
    </a>

    <router-link
        v-else
        :id="id"
        :tabIndex="tabIndex"
        :active-class="activeClass"
        :class="className"
        :to="to"
        @click.native="$emit('click', id, $event)"
    >
      <span :class="tabTitleClassNames">
            {{ content }}
            <PBadge v-if="badge && Object.keys(badge).length > 0" v-bind="badge">
                {{ badge.content }}
            </PBadge>
      </span>
    </router-link>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PBadge } from './../../../../components/PBadge/index.js';

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
        PBadge,
    },
})
export default class PTab extends Vue {

  @Prop([String, Number]) public id!: string | number;
  @Prop(Boolean) public focused!: boolean;
  @Prop(Boolean) public selected!: boolean;
  @Prop([String, Object]) public to!: string | object;
  @Prop(String) public url!: string;
  @Prop(Boolean) public external!: boolean;
  @Prop({type: String, default: 'Polaris-Tabs__Tab--selected'}) public activeClass!: string;
  @Prop({type: Boolean, default: false}) public siblingTabHasFocus!: boolean;
  @Prop({type: String, default: null}) public content!: string;
  @Prop({type: Object, default: () => ({})}) public badge!: Badge;

  // public mounted() {
  //   this.tabIndex = this.focused ? 0 : -1;
  // }

  public get tabContainerClassNames() {
    return classNames(
        'Polaris-Tabs__TabContainer',
    );
  }

  public get tabTitleClassNames() {
    return classNames(
        'Polaris-Tabs__Title',
    );
  }

  public get className() {
    return classNames(
        'Polaris-Tabs__Tab',
        !this.to && this.selected && `Polaris-Tabs__Tab--selected`,
    );
  }

  public get tabIndex() {
      if (this.selected && !this.siblingTabHasFocus) {
          return 0;
      } else if (this.focused) {
          return 0;
      }
      return -1;
  }

  // protected handleClick(id: string) {
  //
  //   this.$emit('click', this.$event, id);
  // }
}
</script>

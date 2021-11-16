<template>
  <li :class="className">
    <div class="Polaris-Navigation__ItemWrapper">
      <PUnstyledLink
          :class="itemClassName"
          :url="url"
          :to="to"
          :external="external"
          :tabindex="tabIndex"
          :aria-disabled="disabled"
          :aria-label="accessibilityLabel"
          @click="getClickHandler"
          @keyup="handleKeyUp"
          @blur="handleBlur"
          :aria-expanded="normalizeAriaAttributesForExpanded"
          :aria-controls="normalizeAriaAttributesForControls"
      >
        <template>
          <div v-if="icon" class="Polaris-Navigation__Icon">
            <PIcon :source="icon"/>
          </div>
          <span class="Polaris-Navigation__Text">{{label}}<span v-if="hasNewChild" class="Polaris-Navigation__Indicator">
              <span class="Polaris-Indicator Polaris-Indicator--pulseIndicator"/>
            </span>
          </span>
          <div v-if="this.new || this.badge || $slots.hasOwnProperty('badge')" class="Polaris-Navigation__Badge">
            <PBadge v-if="this.new" status="new" size="small">
              New
            </PBadge>
            <PBadge v-else-if="badge" status="new" size="small">
              {{badge}}
            </PBadge>
            <slot v-else name="badge"/>
          </div>
        </template>
        <div v-if="external" class="Polaris-Navigation__ExternalIcon">
          <PIcon
              :accessibilityLabel="accessibilityLabel"
              source="ExternalMinor"
              color="base"
          />
        </div>
      </PUnstyledLink>
      <PUnstyledLink
          v-if="Object.keys(secondaryAction).length > 0"
          class="Polaris-Navigation__SecondaryAction"
          external
          :url="secondaryAction.url"
          :to="secondaryAction.to"
          :tabindex="tabIndex"
          :aria-disabled="disabled"
          :aria-label="secondaryAction.accessibilityLabel"
      >
        <PIcon :source="secondaryAction.icon"/>
      </PUnstyledLink>
    </div>
    <div v-if="subNavigationItems.length > 0" :class="secondaryNavigationClassName">
      <PSecondary
          :expanded="showExpanded"
          :id="secondaryNavigationId"
      >
        <PItem
            v-for="(subNavigationItem, key) in subNavigationItems"
            :key="key"
            v-bind="subNavigationItem"
            :label="subNavigationItem.label"
            :matches="subNavigationItem === longestMatch"
            @click="onNavigationDismiss ? onNavigationDismiss : {}"
        />
      </PSecondary>
    </div>
  </li>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PUnstyledLink } from '@/components/PUnstyledLink';
  import { PIcon } from '@/components/PIcon';
  import { PBadge } from '@/components/PBadge';
  import { PSecondary } from '@/components/PNavigation/components/PItem/components/PSecondary';

  interface ItemURLDetails {
    url?: string;
    to?: object | string;
    matches?: boolean;
    exactMatch?: boolean;
    matchPaths?: string[];
    excludePaths?: string[];
    external?: boolean;
  }

  export interface SubNavigationItem extends ItemURLDetails {
    url: string;
    to?: object | string;
    label: string;
    disabled?: boolean;
    new?: boolean;

    onClick?(): void;
  }

  interface SecondaryAction {
    url: string;
    to?: object | string;
    accessibilityLabel: string;
    icon: string | 'placeholder';
  }

  enum MatchState {
    MatchForced,
    MatchUrl,
    MatchPaths,
    Excluded,
    NoMatch,
  }

  @Component({
    components: {
      PUnstyledLink, PIcon, PBadge, PSecondary, PItem,
    },
  })
  export default class PItem extends Vue {
    @Prop({type: String, default: null}) public icon!: string | 'placeholder';
    @Prop({type: String, default: null}) public label!: string;
    @Prop({type: Boolean, default: false}) public disabled!: boolean;
    @Prop({type: String, default: null}) public accessibilityLabel!: string;
    @Prop({type: Boolean, default: false}) public selected!: boolean;
    @Prop({type: Boolean, default: false}) public exactMatch!: boolean;
    @Prop({type: Boolean, default: false}) public new!: boolean;
    @Prop({type: String, default: null}) public badge!: string;
    @Prop({type: Array, default: () => ([])}) public subNavigationItems!: SubNavigationItem[];
    @Prop({type: Object, default: () => ({})}) public secondaryAction!: SecondaryAction;

    /* Navigation Props */
    @Prop({type: String, default: null}) public location!: string;
    @Prop(Function) public onNavigationDismiss!: any;

    // ItemURLDetails Props
    @Prop({type: String, default: null}) public url!: string;
    @Prop({type: [String, Object], default: null}) public to!: object | string;
    @Prop({type: Boolean, default: false}) public matches!: boolean;
    @Prop({type: Array, default: null}) public matchPaths!: string[];
    @Prop({type: Array, default: null}) public excludePaths!: string[];
    @Prop({type: Boolean, default: false}) public external!: boolean;

    public expanded = false;
    public keyFocused = false;
    public tabIndex = this.disabled ? -1 : 0;
    public isNavigationCollapsed = false;
    public secondaryNavigationId = `SecondaryNavigation${new Date().getUTCMilliseconds()}`;

    public matchState = this.matchStateForItem({
      url: this.url,
      to: this.to,
      matches: this.matches,
      exactMatch: this.exactMatch,
      matchPaths: this.matchPaths,
      excludePaths: this.excludePaths,
    }, this.location);

    public selectedOverride = !this.selected
      ? this.matchState === MatchState.MatchForced ||
      this.matchState === MatchState.MatchUrl ||
      this.matchState === MatchState.MatchPaths
      : this.selected;

    public matchingSubNavigationItems = this.subNavigationItems.filter((item) => {
      const subMatchState = this.matchStateForItem(item, this.location);
      return (
        subMatchState === MatchState.MatchForced ||
        subMatchState === MatchState.MatchUrl ||
        subMatchState === MatchState.MatchPaths
      );
    });

    public created() {
      window.addEventListener('resize', this.useMediaQuery);
      this.useMediaQuery();
    }

    public destroyed() {
      window.removeEventListener('resize', this.useMediaQuery);
    }

    public useMediaQuery() {
      if (window.innerWidth <= 768) {
        this.isNavigationCollapsed = true;
      } else {
        this.isNavigationCollapsed = false;
      }
    }

    public get className() {
      return classNames(
        'Polaris-Navigation__ListItem',
        Object.keys(this.secondaryAction).length > 0 && 'Polaris-Navigation__ListItem--hasAction',
      );
    }

    public get childIsActive() {
      return this.matchingSubNavigationItems.length > 0;
    }

    public get showExpanded() {
      return this.selectedOverride || this.expanded || this.childIsActive;
    }

    public get itemClassName() {
      return classNames(
        'Polaris-Navigation__Item',
        this.disabled && 'Polaris-Navigation__Item--disabled',
        this.selected && this.subNavigationItems.length === 0 && 'Polaris-Navigation__Item--selected',
        this.showExpanded && 'Polaris-Navigation--subNavigationActive',
        this.keyFocused && 'Polaris-Navigation--keyFocused',
      );
    }

    public get secondaryNavigationClassName() {
      return classNames(
        'Polaris-Navigation__SecondaryNavigation',
        this.showExpanded && 'Polaris-Navigation--isExpanded',
        !this.icon && 'Polaris-Navigation__SecondaryNavigation--noIcon',
      );
    }

    public getClickHandler(event: MouseEvent) {
      const {currentTarget} = event;

      if ((currentTarget as HTMLElement).getAttribute('href') === this.location) {
        event.preventDefault();
      }

      if (
        this.subNavigationItems &&
        this.subNavigationItems.length > 0 &&
        this.isNavigationCollapsed
      ) {
        event.preventDefault();
        this.expanded = !this.expanded;
      } else if (this.onNavigationDismiss !== undefined) {
        this.$nextTick(this.onNavigationDismiss());
        if (this.$emit('click')) {
          this.$emit('click');
        }
        return;
      }

      this.$emit('click');
    }

    public get longestMatch() {
      if (this.subNavigationItems.length > 0) {
        return this.matchingSubNavigationItems.sort(
            /* tslint:disable-next-line */
          function({url: firstUrl}, {url: secondUrl}) {
            if (firstUrl !== undefined && secondUrl !== undefined) {
              return secondUrl.length - firstUrl.length;
            }
            return 0;
          },
        )[0];
      }
    }

    public get hasNewChild() {
      if (this.subNavigationItems.length > 0) {
        return this.subNavigationItems.filter((subNavigationItem) => subNavigationItem.new).length > 0;
      }
    }

    public handleKeyUp(event: KeyboardEvent) {
      if (event.keyCode === 9) {
        if (!this.keyFocused) {
          this.keyFocused = true;
        }
      }
    }

    public handleBlur() {
      if (this.keyFocused) {
        this.keyFocused = false;
      }
    }

    public normalizePathname(pathname: string) {
      if (pathname === undefined) {
        return '/';
      }
      const barePathname = pathname.split('?')[0].split('#')[0];
      return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
    }

    public safeEqual(location: string, path: string) {
      return this.normalizePathname(location) === this.normalizePathname(path);
    }

    public safeStartsWith(location: string, path: string) {
      return this.normalizePathname(location).startsWith(this.normalizePathname(path));
    }

    public matchStateForItem(
      {url, to, matches, exactMatch, matchPaths, excludePaths}: ItemURLDetails,
      location: string,
    ) {
      if (url === '') {
        return MatchState.NoMatch;
      }

      if (to === '') {
        return MatchState.NoMatch;
      }

      if (matches) {
        return MatchState.MatchForced;
      }

      if (matches === false || (excludePaths && excludePaths.some((path) => this.safeStartsWith(location, path)))) {
        return MatchState.Excluded;
      }

      if (matchPaths && matchPaths.some((path) => this.safeStartsWith(location, path))) {
        return MatchState.MatchPaths;
      }

      const matchesUrl = exactMatch
        ? this.safeEqual(location, url!)
        : this.safeStartsWith(location, url!);
      return matchesUrl ? MatchState.MatchUrl : MatchState.NoMatch;
    }

    public get normalizeAriaAttributesForExpanded() {
      if (this.subNavigationItems.length > 0) {
        return this.showExpanded;
      }
    }

    public get normalizeAriaAttributesForControls() {
      if (this.subNavigationItems.length > 0) {
        return this.secondaryNavigationId;
      }
    }
  }
</script>

<style scoped>

</style>